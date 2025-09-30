export interface Experience {
    position: string;
    company: string;
    period: string;
}

export interface Education {
    degree: string;
    institution: string;
    period: string;
}

export interface Resume {
    name: string;
    contact: string;
    experiences: Experience[];
    educations: Education[];
}