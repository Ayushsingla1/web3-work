import { selector } from "recoil";
import { freelancersArray, skillToSearch } from "./store";
import { freelancerProfile } from "./store";

export const searchFilterFreelancers = selector({
    key: "searchFilterFreelancers",
    get: ({get}) => {
        const allFreelancers = get(freelancersArray);
        const skillArray = get(skillToSearch);
        if(allFreelancers.length === 0 || skillArray.length === 0) return;
        const filteredFreelancers = allFreelancers.filter((freelancer: freelancerProfile) => (
            skillArray.every(skill => freelancer.skills.includes(skill))
        ))
        console.log(filteredFreelancers)
        return filteredFreelancers;
    }
})