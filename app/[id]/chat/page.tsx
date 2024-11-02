'use client'
import { MyContext } from "@/components/Context"
import Navbar from '../../components/Navbar'
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react"
import React from "react";
import { getConversationId, database } from "@/app/firebase";
import { ref, onChildAdded, DataSnapshot, push } from "firebase/database";
import DeployContractDropDown from "./DeployContractDropDown";
import { useAccount } from "wagmi";
import { deployEscrow } from "../../../contracts/EscrowMethods/deploy";
import { useEthersSigner } from "@/contracts/providerChange";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useRecoilState } from "recoil";
import { conversationObject, deployedEscrowAddress } from "@/RecoilStore/store";
import ApprovalBtn from "@/app/components/ApprovalBtn";
import Footer from "@/app/components/Footer";

interface UserProfile {
    id: string; 
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
    text: string
    senderId: string;
    timestamp: string;
}

export default function User({ params }: { params: { id: string } }) {
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
    // let alreadyExists = null
    const [escrowAddress, setEscrowAdress] = useRecoilState(deployedEscrowAddress);
    const [existingConversation, setExistingConversation] = useRecoilState(conversationObject);
    const connectedAccount = useAccount();
    const signer = useEthersSigner({chainId: connectedAccount.chainId});
    const router = useRouter();
    const id = params.id;
    const [myUser, setMyUser] = useState<UserProfile>();
    // const [myUser, setMyUser] = useRecoilState(profile);
    const [, setIsAuthenticated] = useState(false);
    const {findUser, getProfile, showContractDropDown,getProfileById} = useContext(MyContext);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const messagesEndRef= useRef<HTMLDivElement>(null);
    useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        const setupListener = async () => {
            const res = await getProfileById(id);
            setUser(res);
            const userRes = await findUser();
            console.log("printing myself")
            console.log(userRes.email)
            if (userRes === null) {
                router.push('/');
            } else {
                const myProfile = await getProfile(userRes.email);
                setMyUser(myProfile);

                console.log("printing my profile")
                console.log(myProfile)
                setIsAuthenticated(true);
                const conversationId = getConversationId(myProfile.id,res.id);
                const messagesRef = ref(database, `messages/${conversationId}`);


                 // Ensure myUser and user are defined before proceeding
                 if (myProfile && res) {
                    // Add data to Firestore
                    console.log("res is : " , res.id);
                    const docRef = doc(db, "conversations", conversationId);
                    const alreadyExists = (await getDoc(docRef)).data();
                    // console.log("chatbox is ; " , res)
                    if(!alreadyExists){
                        await setDoc(docRef, {
                            client: myProfile.id || "unknown", // Fallback to "unknown" if undefined
                            freelancer: res.id || "unknown",   // Fallback to "unknown" if undefined
                            contractAddress: "",
                            id: conversationId
                        });
                    }else{
                        setExistingConversation(alreadyExists);
                    }
                }

                
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
    }, [id, findUser, getProfile, router,getProfileById, setExistingConversation]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);


    useEffect(() => {
        console.log("connected account", connectedAccount);
    }, [connectedAccount])
    
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
    
    const deployContractHandeler = async () => {
        console.log('clicked deploy btn')
        console.log(signer)
        const freelancerAddress = (document.getElementById('freelancerAddress') as HTMLInputElement).value || "0x567A027B2f96bbf8D47c133e13A54862D565bcd6";
        const amount = parseFloat((document.getElementById('amount') as HTMLInputElement).value) || 0.002;
        const address = await deployEscrow(connectedAccount, signer, freelancerAddress, amount)
        alert(`contract deployed at adderss: ${address}`) 
        setEscrowAdress(address)
    }
     

    return (
        <div className="bg-[#1D2C40] flex min-h-screen gap-y-10 flex-col justify-between h-screen w-screen overflow-hidden">
            <Navbar />
            <div className="flex flex-col w-10/12 place-self-center justify-center items-center max-w-[1535px] text-xl">
                <div className="px-40 mt-10 w-full flex flex-col gap-y-3">
                    <div className="flex justify-between items-center w-full py-2">
                        <div className="text-3xl text-[#8BADD9] font-semibold">Chat with {user?.name || 'User'}</div>
                        <ApprovalBtn approvalProps={existingConversation} contractAddress={escrowAddress} clientAdd={connectedAccount.address}/>
                    </div>
                    <div className="chat-container relative border-[0.5px] border-white rounded-[7px] p-5 flex min-h-[60vh] flex-col gap-y-4">

                        {/* chat area */}
                        <div className="flex flex-col gap-y-4 h-full w-full">
                            <div className="messages w-full flex flex-col gap-y-2 place-content-end overflow-y-auto h-full">
                                {messages.map((msg, index) => (
                                    <div 
                                        key={`${msg.id}-${index}`} // Use a combination of id and index to ensure uniqueness
                                        className={`message ${msg.senderId === myUser?.id ? 'self-end' : 'self-start'} bg-[#3D5473] text-[#BDD9F2] p-2 rounded-md`}
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

                        <div className="absolute top-[10px] right-[20px]">
                            <DeployContractDropDown/>
                        </div>
                        <div className={`absolute top-[70px] min-w-[205px] ${!showContractDropDown? 'hidden':'block'} p-2 bg-[#3D5473] rounded-lg border-[0.5px] border-white right-[20px]`}>
                            <div className="flex flex-col gap-y-2">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="freelancerAddress" className="text-sm text-white font-['Hammersmith_One']">
                                        freelancer&apos;s Public Address
                                    </label>
                                    <input type="text" id="freelancerAddress" placeholder="0xHOS8w93jdJw0..." className="text-sm hover:bg-[#4f6f9a] text-white placeholder:text-white bg-[#6581A6] rounded-lg px-1 py-1"/>
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="amount" className="text-sm text-white font-['Hammersmith_One']">
                                         Amount in ETH
                                    </label>
                                    <input type="number" id="amount" placeholder="0.2" className="text-sm hover:bg-[#4f6f9a] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 text-white placeholder:text-white bg-[#6581A6] rounded-lg px-1 py-1"/>
                                </div>
                                <button className="text-lg px-2 py-1 bg-[#6581A6] rounded-lg hover:bg-[#4f6f9a] active:bg-[#304969]" onClick={deployContractHandeler}>Deploy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
  }
