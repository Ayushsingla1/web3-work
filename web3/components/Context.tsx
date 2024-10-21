"use client"
import { createContext } from "react";
import { auth , db } from '../app/firebase'
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc , collection, query , where} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
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

    const FindUser = async () => {
        return new Promise<string | null>((resolve) => {
          onAuthStateChanged(auth, (user) => {
            if (user && user.displayName) {
              console.log('User is logged in:', user.uid); // Log the user's display name
              resolve(user.displayName); // Return the user's display name
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

    const GetProfile = async(name : string) => {
        const ref = collection(db,'users');
        const q = query(ref,where('name','==',`${name}`))
        let items : any = "";
        const data = await getDocs(q)
        data.forEach((item)=>
        {
            console.log(item)
            items = item
        }
        )
        return items;
    }

    // const GetProfileData = () => {

    // }

    return(
        <MyContext.Provider value={{GoogleAuth,FindUser,CreateUserWithEmail,SignInWithEmail,GithubAuth , GetProfile}}>
            {children}
        </MyContext.Provider>
    )
}