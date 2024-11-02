import { selector } from "recoil";
import { freelancersArray, jobsArray, skillsInJobs, skillToSearch, WorkProfileNew } from "./store";
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

export const searchInJobs = selector({
    key: "searchInJobs",
    get: ({get}) => {
        const allJobs = get(jobsArray);
        const skillArray = get(skillsInJobs);
        if(allJobs?.length === 0 || skillArray.length === 0) return;
        const filteredJobs = allJobs?.filter((job: WorkProfileNew) => (
            skillArray.every(skill => job.skills.includes(skill))
        ))
        console.log(filteredJobs)
        return filteredJobs;
    }
})