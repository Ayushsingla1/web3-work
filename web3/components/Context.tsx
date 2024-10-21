"use client"
import { createContext } from "react";
import { auth , db } from '../app/firebase'
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc , collection, doc, query , updateDoc, where} from "firebase/firestore";
import { getDocs } from "firebase/firestore";

  
export const MyContext = createContext<any>(null);
export const ContextProvider = ({children} : { children: React.ReactNode }) => {

    const GoogleAuth = async() => {
        const provider = new GoogleAuthProvider();
        // return await signInWithPopup(auth,provider);
        try {
            const result = await signInWithPopup(auth, provider);
            const email = result.user.email;
        
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);
        
            if (querySnapshot.empty) {
              const res = await addDoc(usersRef, {
                email: email,
                name: "",
                skills: [],
                resume: "",
                image: "",
                work: [],
                description: "",
                isAvailable: true,
                loyaltyPoints: 0,
                walletAddress: "",
              });
              console.log('New user added to Firestore:', res.id);
            } else {
              console.log('User already exists in Firestore.');
            }
            return result.user;
          } catch (error : any) {
            console.error('Error during Google sign-in:', error.message);
          }
    }

    const FindUser = async () => {
        return new Promise<string | null>((resolve) => {
          onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
              console.log('User is logged in:', user.uid); // Log the user's display name
              console.log(user)
              resolve(user.email); // Return the user's display name
            } else {
              console.log('User is not logged in'); // User is not logged in
              resolve(null); // Return null if the user is not logged in or displayName is not available
            }
          });
        });
      };

    const CreateUserWithEmail = async(email : string,password : string) => {
        return await createUserWithEmailAndPassword(auth,email,password)
        .then(async()=>{
            const ref = collection(db,'users');
            const res =  await addDoc(ref,{
                email : email,
                name  : "",
                skills : [],
                resume : "",
                image : "",
                work : [],
                description : "",
                isAvailable : true,
                loyaltyPoints : 0,
                walletAddress : "",
            })
            console.log(res);
        });
    }

    const SignInWithEmail = async(email : string,password : string) => {
        return await signInWithEmailAndPassword(auth,email,password)
    }

    const GithubAuth = async() => {
        const provider = new GithubAuthProvider();
        return await signInWithPopup(auth,provider)
    }

    const GetProfile = async(email : string) => {
        const ref = collection(db,'users');
        const q = query(ref,where('email','==',`${email}`))
        let items : any = "";
        const data = await getDocs(q)
        console.log(data.docs[0].id)
        data.forEach((item)=>
        {
            console.log(item)
            items = item
        }
        )
        items = {
            ...items.data(),
            id : data.docs[0].id,
        }
        console.log(items)
        return items;
    }

    const UpdateProfile = async(id : string,user : any) => {
        const ref = doc(db,"users",id)
        const res = await updateDoc(ref,user);
        console.log(res);
    }

    const CreatePost = async (data : any) =>{
      console.log(data)
      console.log(db)
      const ref = collection(db,'posts')
      try{
        const res = await addDoc(ref,data);
        console.log(res)
      }
      catch(e){
        console.log(e);
      }
    }

    const Getposts = async() => {
      const res : any = [];
      const ref = collection(db,"posts")
      try{
        const posts = await getDocs(ref);
        posts.forEach((post)=>{
          res.push(post.data());
        })
        console.log(res);
        return res;
      }
      catch(e){
        console.log(e);
      }
    }

    return(
        <MyContext.Provider value={{GoogleAuth,FindUser,CreateUserWithEmail,SignInWithEmail,GithubAuth , GetProfile , UpdateProfile , CreatePost, Getposts}}>
            {children}
        </MyContext.Provider>
    )
}