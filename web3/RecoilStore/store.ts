import { atom } from "recoil";


interface UserProfile {
    name : string,
    description : string,
    resume : string,
    skills : string[],
    work : string[],
}

interface WorkProfile {
    title : string,
    description : string,
    amount : number,
    skills : string[],
    photoUrl : ""
}
export const Profile = atom({
    key : "profile",
    default : {} as any
})


export const ProfileCreation = atom({
    key : "profileCreation",
    default : {
        name : "",
        description : "",
        resume : "",
        skills : [],
        work : []
    } as UserProfile
})

export const PostCreation = atom({
    key : "postCreation",
    default : {
        title : "",
        description : "",
        amount : 0,
        skills : [],
        photoUrl : ""
    } as WorkProfile
})

export const count = atom({
    key  : "count",
    default : 0 as number
})

export const postCount = atom({
    key : "postCount",
    default : 0 as number
})
