import { Resume, Experience, Education } from '../models/Resume';

export class ResumeBuilder {
    private resume: Partial<Resume>;

    constructor() {
        this.resume = {
            name: '',
            contact: '',
            experiences: [],
            educations: []
        };
    }

    withName(name: string): ResumeBuilder {
        this.resume.name = name;
        return this;
    }

    withContact(contact: string): ResumeBuilder {
        this.resume.contact = contact;
        return this;
    }

    addExperience(position: string, company: string, period: string): ResumeBuilder {
        if (!this.resume.experiences) {
            this.resume.experiences = [];
        }
        this.resume.experiences.push({ position, company, period });
        return this;
    }

    addEducation(degree: string, institution: string, period: string): ResumeBuilder {
        if (!this.resume.educations) {
            this.resume.educations = [];
        }
        this.resume.educations.push({ degree, institution, period });
        return this;
    }

    build(): Resume {
        if (!this.resume.name || !this.resume.contact) {
            throw new Error('Nome e contato são obrigatórios');
        }
        
        return {
            name: this.resume.name,
            contact: this.resume.contact,
            experiences: this.resume.experiences || [],
            educations: this.resume.educations || []
        };
    }

    reset(): ResumeBuilder {
        this.resume = {
            name: '',
            contact: '',
            experiences: [],
            educations: []
        };
        return this;
    }
}