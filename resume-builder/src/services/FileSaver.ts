import { Resume } from '../models/Resume';
import { ResumeFormatter } from '../formatters/ResumeFormatter';
import * as fs from 'fs';
import * as path from 'path';

export class FileSaver {
    private formatter: ResumeFormatter;

    constructor(formatter: ResumeFormatter) {
        this.formatter = formatter;
    }

    setFormatter(formatter: ResumeFormatter): void {
        this.formatter = formatter;
    }

    save(resume: Resume, baseFileName: string): string {
        const formattedContent = this.formatter.format(resume);
        const fileName = `${baseFileName}${this.formatter.getFileExtension()}`;
        const outputDir = path.join(process.cwd(), 'output');
        
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const filePath = path.join(outputDir, fileName);
        fs.writeFileSync(filePath, formattedContent, 'utf8');
        
        return filePath;
    }
}