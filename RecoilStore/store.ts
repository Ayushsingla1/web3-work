import { atom } from "recoil";

export interface freelancerProfile {
    name : string,
    description : string,
    resume : string,
    skills : string[],
    work : string[],
    image : string,
    id : string
}

export interface conversationObjectType {
    client: string,
    freelancer: string,
    contractAddress?: string,
    id: string
}

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

export const freelancersArray = atom({
    key: "freelancersArray",
    default: [] as freelancerProfile[]
})

export const skillToSearch = atom({
    key: "skillToSearch",
    default: [] as string[]
})

export const deployedEscrowAddress = atom({
    key: "deployedEscrowAddress",
    default: "" as string | undefined
})

export const conversationObject = atom({
    key: "conversationObject",
    default: {} as any
})