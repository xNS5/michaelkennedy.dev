export type Profile = {
    network: string,
    display_name: string,
    url: string
}

export type Work = {
    name: string,
    position: string,
    location: string,
    startDate: string,
    endDate: string,
    highlights: string[]
}

export type Education = {
    institution: string,
    area: string,
    studyType: string,
    minor: string,
    location: string,
    startDate: string,
    endDate: string
}

export type Skill = {
    name: string,
    highlights: string[]
}

export type Project = {
    name: string,
    technologies: string[],
    startDate: string,
    endDate: string,
    highlights: string[]
}

export type Resume = {
    basics: {
        name: string,
        email: string,
        phone: string,
        summary: string,
        profiles: Profile[]
    }
    work: Work[],
    education: Education[],
    skills: Skill[],
    projects: Project[]
}