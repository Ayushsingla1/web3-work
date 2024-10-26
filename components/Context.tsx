"use client"
import { createContext, useState } from "react";
import { auth , db } from '../app/firebase'
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc , collection, query , where , updateDoc , doc, getDoc} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { storage } from "../app/firebase";
import { uploadBytes , ref , getDownloadURL} from "firebase/storage";
  
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
              console.log(res.id)
              const ref = doc(db,"users",res.id);
              await updateDoc(ref,{id : res.id});
              console.log('New user added to Firestore:', res.id);
            } else {
              console.log('User already exists in Firestore.');
            }
            return result.user;
          } catch (error) {
            console.error('Error during Google sign-in:', error);
            throw error
          }
  }

  const findUser = async () => {
        return new Promise((resolve) => {
          onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
              console.log('User is logged in:', user.uid); 
              console.log(user)
              resolve(user); 
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
            const reference = doc(db,"users",res.id);
            await updateDoc(reference,{id : res.id});
            console.log(res);
        });
  }

  const signInWithEmail = async(email : string,password : string) => {
        try {
          return await signInWithEmailAndPassword(auth,email,password)
        } catch (e) {
          console.log(e)
          throw e;
        }
  }

  const githubAuth = async() => {
        const provider = new GithubAuthProvider();
        try {
          return await signInWithPopup(auth,provider)
        } catch (e) {
          console.log(e)
          throw e;
        }
  }

  const getProfile = async(email : string) => {
    console.log("email is " , email)
        const ref = collection(db,'users');
        const q = query(ref,where('email','==',`${email}`))
        let items : any = "";
        try{
        const data = await getDocs(q)
        console.log("data is : " , data);
        data.forEach((item)=>
        {
            console.log("item is" , item)
            console.log(item)
            items = item
        }
        )
        console.log("items is " , items)
        console.log(items)
        return items;
        }catch(e){
          console.log(e)
          throw e
        }
  }

  const getProfileByUsername = async(username : string) => {
      const ref = collection(db,'users');
      const q = query(ref,where('name','==',`${username}`))
      let items : any = "";
      try{
        const data = await getDocs(q)
      data.forEach((item)=>
      {
          items = item
      }
      )
      items = {
          ...items.data(),
          id : data.docs[0].id,
      }
      return items;
      }catch(e){
        console.log(e)
        throw e;
      }
  }

  const getProfileById = async(id : string) => {
    const ref = doc(db,"users",id)
    const res = await getDoc(ref);
    return res.data();
  }

  const updateProfile = async(id : string,user : any) => {
        const userRef = doc(db,"users",id)
        console.log("user in contest is " , user)
        try{
          const imageRef = ref(storage,`${Date.now()}`)
          const imageRes = await uploadBytes(imageRef,user.image);
          const imageUrl = await getDownloadURL(ref(storage,`${imageRes.metadata.fullPath}`))
          console.log(imageUrl)
          user = {
            ...user,
            image : imageUrl
          }
          await updateDoc(userRef,user);
        }catch(e){
          throw e;
        }
        
  }

  const createPost = async (data : any) =>{ 
    const postRef = collection(db,'posts')
    try{
      data.applicants = [];
      console.log("data after being uploaded : ",data);
      const res = await addDoc(postRef,data);
      console.log("added doc id is : ", res.id)
      const reference = doc(db,"posts",res.id);
      await updateDoc(reference,{id : res.id});
      console.log(res);
    }catch(e){
      console.log(e);
      throw e;
    }
    console.log(data)
    console.log(db)
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
        throw e;
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
        throw e;
      }
  }

  const logOut = async() => {
      return await signOut(auth);
  }

  const applyJobs = async(id : string , applicants : string[]) => {

    try {
      const job = doc(db,"posts",id);
      await updateDoc(job,{
        applicants : applicants
      })
      console.log("Succesfully applied")
    } catch (error) {
      throw error

    }
  }

  return(
        <MyContext.Provider value={{googleAuth,findUser,createUserWithEmail,signInWithEmail,githubAuth , getProfile , updateProfile , createPost, getposts , getFreeLancers, getProfileByUsername,getProfileById, showContractDropDown, setShowContractDropDown, logOut,applyJobs}}>
            {children}
        </MyContext.Provider>
  )
}