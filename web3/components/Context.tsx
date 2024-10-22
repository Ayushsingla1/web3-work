"use client"
import { createContext, useState } from "react";
import { auth , db } from '../app/firebase'
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc , collection, query , where , updateDoc , doc} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
  
export const MyContext = createContext<any>(null);

export const ContextProvider = ({children} : { children: React.ReactNode }) => {

  const [showContractDropDown, setShowContractDropDown] = useState<boolean>(false);

    const googleAuth = async() => {
        const provider = new GoogleAuthProvider();
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
          } catch (error) {
            console.error('Error during Google sign-in:', error);
          }
    }

    const findUser = async () => {
        return new Promise<string | null>((resolve) => {
          onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
              console.log('User is logged in:', user.uid); 
              console.log(user)
              resolve(user.email); 
            } else {
              console.log('User is not logged in'); 
              resolve(null); 
            }
          });
        });
      };

    const createUserWithEmail = async(email : string,password : string) => {
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

    const signInWithEmail = async(email : string,password : string) => {
        try {
          return await signInWithEmailAndPassword(auth,email,password)
        } catch (e) {
          console.log(e)
        }
    }

    const githubAuth = async() => {
        const provider = new GithubAuthProvider();
        try {
          return await signInWithPopup(auth,provider)
        } catch (e) {
          console.log(e)
        }
    }

    const getProfile = async(email : string) => {
        const ref = collection(db,'users');
        const q = query(ref,where('email','==',`${email}`))
        let items : any = "";
        try{
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
        }catch(e){
          console.log(e)
        }
    }

    const getProfileByUsername = async(username : string) => {
      const ref = collection(db,'users');
      const q = query(ref,where('name','==',`${username}`))
      let items : any = "";
      try{
        const data = await getDocs(q)
      console.log(data.docs[0]?.id)
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
      }catch(e){
        console.log(e)
      }
  }

    const updateProfile = async(id : string,user : any) => {
        const ref = doc(db,"users",id)
        try{
          await updateDoc(ref,user);
        }catch(e){
          console.log(e);
        }
        
    }

    const createPost = async (data : any) =>{
      console.log(data)
      console.log(db)
      const ref = collection(db,'posts')
      try{
        await addDoc(ref,data);
      }
      catch(e){
        console.log(e);
      }
    }

    const getposts = async() => {
      const res : any = [];
      const ref = collection(db,"posts")
      try{
        const posts = await getDocs(ref);
        posts.forEach((post)=>{
          res.push(post.data());
        })
        return res;
      }
      catch(e){
        console.log(e);
      }
    }

    const getFreeLancers = async() => {
      const res : any = []
      const ref = collection(db,"users")
      try{
        const posts = await getDocs(ref);
        posts.forEach((post)=>{
          res.push(post.data());
        })
        return res;
      }
      catch(e){
        console.log(e);
      }
    }

    return(
        <MyContext.Provider value={{googleAuth,findUser,createUserWithEmail,signInWithEmail,githubAuth , getProfile , updateProfile , createPost, getposts , getFreeLancers, getProfileByUsername, showContractDropDown, setShowContractDropDown}}>
            {children}
        </MyContext.Provider>
    )
}