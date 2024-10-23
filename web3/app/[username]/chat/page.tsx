'use client'
import { MyContext } from "@/components/Context"
import Navbar from '../../components/Navbar'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react"
import { constSelector, useRecoilState } from "recoil";
import { profile } from "@/RecoilStore/store";
import { getConversationId, database } from "@/app/firebase";
import { ref, onValue, onChildAdded, DataSnapshot, push } from "firebase/database";
import { snapshot } from "viem/actions";
interface UserProfile {
    id: string; // Add this line
    name: string,
    description: string,
    resume: string,
    skills: string[],
    work: string[],
    image: "",
    isAvailable: boolean;
}
  
interface Message{
    id: string;
    text:String
    senderId: string;
    timestamp: string;
}
interface ChatProps{
    user: UserProfile;
    myUser: UserProfile;
    conversationId: string;
    messages: Message[];
}
export default function User({ params }: { params: { username: string } }) {
    const [user, setUser] = useState<UserProfile>({
        id: "",
        name: "",
        description: "",
        resume: "",
        skills: [],
        work: [],
        image : "",
        isAvailable: false
      })
    const router = useRouter()
    const {getProfileByUsername} = useContext(MyContext);
    const userName = params.username.split("_").join(" ");
    const [myUser, setMyUser] = useRecoilState(profile);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {findUser, getProfile} = useContext(MyContext);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const messagesEndRef= useRef<HTMLDivElement>(null);
    useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        const setupListener = async () => {
            const res = await getProfileByUsername(userName);
            setUser(res);
            const userRes = await findUser();
            if (userRes === null) {
                router.push('/');
            } else {
                const myProfile = await getProfile(userRes);
                setMyUser(myProfile);
                setIsAuthenticated(true);
                const conversationId = getConversationId(myProfile.id, res.id);
                const messagesRef = ref(database, `messages/${conversationId}`);
                
                // Clear messages and set up listener
                setMessages([]); // Clear messages before setting up the listener
                console.log("Setting up listener for conversationId:", conversationId);
                unsubscribe = onChildAdded(messagesRef, (snapshot: DataSnapshot) => {
                    const data = snapshot.val();
                    const newMessage: Message = {
                        id: snapshot.key as string,
                        text: data.text,
                        senderId: data.senderId,
                        timestamp: data.timestamp,
                    };
                    console.log("New message received:", newMessage);
                    setMessages((prevMessages) => {
                        // Filter out any existing message with the same ID
                        const filteredMessages = prevMessages.filter(msg => msg.id !== newMessage.id);
                        return [...filteredMessages, newMessage];
                    });
                });
            }
        };

        setupListener();

        // Cleanup function to ensure listener is removed
        return () => {
            if (unsubscribe) {
                console.log("Cleaning up listener");
                unsubscribe();
            }
        };
    }, [userName, findUser, getProfile, router]);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && user && myUser) {
            const conversationId = getConversationId(myUser.id, user.id);
            const messagesRef = ref(database, `messages/${conversationId}`);
            push(messagesRef, {
                text: message,
                senderId: myUser.id,
                timestamp: Date.now(),  
            });
            setMessage('');
        }
    };
    
    return (
        <div className="bg-[#1D2C40] h-screen w-screen overflow-hidden">
            <Navbar />
            <div className="px-40 mt-10">
                <div className="text-3xl text-[#8BADD9] font-semibold">Chat with {user?.name || 'User'}</div>
                <div className="chat-container flex flex-col gap-y-4">
                    <div className="messages flex flex-col gap-y-2 overflow-y-auto h-96">
                        {messages.map((msg, index) => (
                            <div 
                                key={`${msg.id}-${index}`} // Use a combination of id and index to ensure uniqueness
                                className={`message ${msg.senderId === myUser.id ? 'self-end' : 'self-start'} bg-[#3D5473] text-[#BDD9F2] p-2 rounded-md`}
                            >
                                <div className="text-sm">{msg.text}</div>
                                <div className="text-xs text-right">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSubmit} className="flex gap-x-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-grow p-2 rounded-md bg-[#BDD9F2] text-[#1D2C40]"
                            placeholder="Type your message..."
                        />
                        <button type="submit" className="px-4 py-2 bg-[#8BADD9] text-[#1D2C40] rounded-md">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
  }
