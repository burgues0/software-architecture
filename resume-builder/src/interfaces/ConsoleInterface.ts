import * as readlineSync from 'readline-sync';

export class ConsoleInterface {
    
    question(prompt: string): string {
        return readlineSync.question(prompt);
    }

    showMenu(): void {
        console.log('\n=== CONSTRUTOR DE CURRÍCULOS ===');
        console.log('1. Criar novo currículo');
        console.log('2. Sair');
        console.log('================================');
    }

    showResumeMenu(): void {
        console.log('\n=== OPÇÕES DO CURRÍCULO ===');
        console.log('1. Adicionar experiência profissional');
        console.log('2. Adicionar formação acadêmica');
        console.log('3. Salvar currículo');
        console.log('4. Voltar ao menu principal');
        console.log('===========================');
    }

    displayMessage(message: string): void {
        console.log(message);
    }

    displayError(error: string): void {
        console.error(`Erro: ${error}`);
    }

    displaySuccess(message: string): void {
        console.log(message);
    }
}