import { atom } from "recoil";


interface UserProfile {
    name : string,
    description : string,
    resume : string,
    skills : string[],
    work : string[],
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

export const count = atom({
    key  : "count",
    default : 0 as number
})
