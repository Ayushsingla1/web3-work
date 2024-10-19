"use client"
import { createContext } from "react";
import { auth , db } from '../app/firebase'
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc , collection} from "firebase/firestore";

// interface AuthContextType {
//     GoogleAuth: () => Promise<void>;
//     FindUser: () => Promise<boolean>;
//     CreateUserWithEmail: (email: string, password: string) => Promise<void>;
//     SignInWithEmail: (email: string, password: string) => Promise<void>;
//   }
  
export const MyContext = createContext<any>(null);

export const ContextProvider = ({children} : { children: React.ReactNode }) => {

    const GoogleAuth = async() => {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth,provider);
    }

    const FindUser = async() => {
        return new Promise<boolean>((resolve) => {
            onAuthStateChanged(auth, (user) => {
              if (user) {
                console.log(user); // User is logged in
                resolve(true);
              } else {
                console.log("not logged in"); // User is not logged in
                resolve(false);
              }
            });
          });
    }

    const CreateUserWithEmail = async(email : string,password : string) => {
        return await createUserWithEmailAndPassword(auth,email,password)
        .then(async()=>{
            const ref = collection(db,'users');
            const res =  await addDoc(ref,{
                email : email,
                password : password
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

    return(
        <MyContext.Provider value={{GoogleAuth,FindUser,CreateUserWithEmail,SignInWithEmail,GithubAuth}}>
            {children}
        </MyContext.Provider>
    )
}