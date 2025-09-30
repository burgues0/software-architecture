import { Resume } from '../models/Resume';

export interface ResumeFormatter {
    format(resume: Resume): string;
    getFileExtension(): string;
}

export class TextFormatter implements ResumeFormatter {
    format(resume: Resume): string {
        let output = '';
        
        output += `===== CURRÍCULO =====\n\n`;
        output += `Nome: ${resume.name}\n`;
        output += `Contato: ${resume.contact}\n\n`;
        
        if (resume.experiences.length > 0) {
            output += `EXPERIÊNCIAS PROFISSIONAIS:\n`;
            resume.experiences.forEach((exp, index) => {
                output += `${index + 1}. ${exp.position} - ${exp.company} (${exp.period})\n`;
            });
            output += '\n';
        }
        
        if (resume.educations.length > 0) {
            output += `FORMAÇÃO ACADÊMICA:\n`;
            resume.educations.forEach((edu, index) => {
                output += `${index + 1}. ${edu.degree} - ${edu.institution} (${edu.period})\n`;
            });
        }
        
        return output;
    }

    getFileExtension(): string {
        return '.txt';
    }
}

export class JsonFormatter implements ResumeFormatter {
    format(resume: Resume): string {
        return JSON.stringify(resume, null, 4);
    }

    getFileExtension(): string {
        return '.json';
    }
}