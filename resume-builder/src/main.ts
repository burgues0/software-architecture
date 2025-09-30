import { ResumeBuilder } from './builders/ResumeBuilder';
import { TextFormatter, JsonFormatter } from './formatters/ResumeFormatter';
import { FileSaver } from './services/FileSaver';
import { ConsoleInterface } from './interfaces/ConsoleInterface';
import { Resume } from './models/Resume';



export class ResumeApp {
    private consoleInterface: ConsoleInterface;
    private resumeBuilder: ResumeBuilder;
    
    constructor() {
        this.consoleInterface = new ConsoleInterface();
        this.resumeBuilder = new ResumeBuilder();
    }

    run(): void {
        console.log('Bem-vindo ao Construtor de Currículos!');
        
        let running = true;
        while (running) {
            this.consoleInterface.showMenu();
            const choice = this.consoleInterface.question('Escolha uma opção: ');
            
            switch (choice.trim()) {
                case '1':
                    this.createInteractiveResume();
                    break;
                case '2':
                case 'sair':
                    running = false;
                    console.log('Saindo...');
                    break;
                default:
                    console.log('Opção inválida. Tente novamente.');
            }
        }
    }



    private createInteractiveResume(): void {
        this.resumeBuilder.reset();
        
        const name = this.consoleInterface.question('Digite seu nome: ');
        const contact = this.consoleInterface.question('Digite seu contato (email/telefone): ');
        
        this.resumeBuilder.withName(name).withContact(contact);
        
        this.addExperiences();
        this.addEducations();
        
        try {
            const resume = this.resumeBuilder.build();
            console.log('\nCurrículo criado com sucesso!');
            
            const fileName = this.consoleInterface.question('Digite o nome do arquivo (sem extensão): ');
            this.saveResume(resume, fileName || 'meu_curriculo');
            
        } catch (error) {
            console.error(`Erro: ${error}`);
        }
    }

    private addExperiences(): void {
        console.log('\n=== EXPERIÊNCIAS PROFISSIONAIS ===');
        let addMore = true;
        
        while (addMore) {
            const hasExperience = this.consoleInterface.question('Deseja adicionar uma experiência profissional? (s/n): ');
            
            if (hasExperience.toLowerCase() === 's' || hasExperience.toLowerCase() === 'sim') {
                const position = this.consoleInterface.question('Cargo: ');
                const company = this.consoleInterface.question('Empresa: ');
                const period = this.consoleInterface.question('Período (ex: 2020-2024): ');
                
                this.resumeBuilder.addExperience(position, company, period);
                console.log('Experiência adicionada!');
            } else {
                addMore = false;
            }
        }
    }

    private addEducations(): void {
        console.log('\n=== FORMAÇÃO ACADÊMICA ===');
        let addMore = true;
        
        while (addMore) {
            const hasEducation = this.consoleInterface.question('Deseja adicionar uma formação acadêmica? (s/n): ');
            
            if (hasEducation.toLowerCase() === 's' || hasEducation.toLowerCase() === 'sim') {
                const degree = this.consoleInterface.question('Curso/Grau: ');
                const institution = this.consoleInterface.question('Instituição: ');
                const period = this.consoleInterface.question('Período (ex: 2018-2022): ');
                
                this.resumeBuilder.addEducation(degree, institution, period);
                console.log('Formação adicionada!');
            } else {
                addMore = false;
            }
        }
    }

    private saveResume(resume: Resume, baseFileName: string): void {
        console.log('\nSalvando currículo nos formatos TXT e JSON...');
        
        try {
            const textSaver = new FileSaver(new TextFormatter());
            const txtPath = textSaver.save(resume, baseFileName);
            console.log(`Arquivo TXT salvo: ${txtPath}`);
            
            const jsonSaver = new FileSaver(new JsonFormatter());
            const jsonPath = jsonSaver.save(resume, baseFileName);
            console.log(`Arquivo JSON salvo: ${jsonPath}`);
            
        } catch (error) {
            console.error(`Erro ao salvar arquivos: ${error}`);
        }
    }


}

function main(): void {
    const app = new ResumeApp();
    app.run();
}

main();