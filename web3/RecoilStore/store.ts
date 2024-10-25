import { atom } from "recoil";


interface userProfile {
    name : string,
    description : string,
    resume : string,
    skills : string[],
    work : string[],
}

interface workProfile {
    title : string,
    description : string,
    amount : number,
    skills : string[],
    photoUrl : string
}

export const profile = atom({
    key : "profile",
    default : {} as any
})


export const profileCreation = atom({
    key : "profileCreation",
    default : {
        name : "",
        description : "",
        resume : "",
        skills : [],
        work : []
    } as userProfile
})

export const postCreation = atom({
    key : "postCreation",
    default : {
        title : "",
        description : "",
        amount : 0,
        skills : [],
        photoUrl : "",
    } as workProfile
})

export const count = atom({
    key  : "count",
    default : 0 as number
})

export const postCount = atom({
    key : "postCount",
    default : 0 as number
})
