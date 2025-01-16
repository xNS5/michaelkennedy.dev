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
    highlights: Highlight[]
}

export type Project = {
    name: string,
    technologies: string[],
    url: string,
    description: string,
    startDate: string,
    endDate: string,
    highlights: Highlight[]
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

export type Highlight = {
    name: string,
    alt?: string,
    icon?: string
}