import { CryptoMonitor } from './CryptoMonitor';

class ConsoleInterface {
    private monitor: CryptoMonitor;
    private inputHandler: NodeJS.ReadStream;

    constructor() {
        this.monitor = new CryptoMonitor();
        this.inputHandler = process.stdin;
        this.setupInput();
    }

    private setupInput(): void {
        this.inputHandler.setEncoding('utf8');
        this.inputHandler.on('data', (input: string) => {
            this.handleUserInput(input.trim().toLowerCase());
        });
    }

    private handleUserInput(input: string): void {
        switch (input) {
            case 'sair':
            case 'exit':
            case 'quit':
                this.monitor.stop();
                process.exit(0);
                break;
            
            case 'config':
                this.monitor.showConfig();
                break;
            
            case 'bitcoin':
            case 'ethereum':
            case 'solana':
                this.monitor.changeCrypto(input);
                break;
            
            case 'help':
            case 'ajuda':
                this.showHelp();
                break;
            
            default:
                if (input.length > 0) {
                    console.log(`Comando desconhecido: "${input}"`);
                    console.log('Digite "help" para ver os comandos disponíveis');
                }
                break;
        }
    }

    private showHelp(): void {
        console.log('=== AJUDA ===');
        console.log('Comandos disponíveis:');
        console.log('  bitcoin, ethereum, solana - Trocar moeda monitorada');
        console.log('  config - Mostrar configurações atuais');
        console.log('  help - Mostrar esta ajuda');
        console.log('  sair - Encerrar aplicação');
        console.log('');
    }

    async start(): Promise<void> {
        console.log('Iniciando monitor...');
        console.log('');
        
        this.monitor.start().catch(error => {
            console.error('Erro fatal no monitor:', error);
            process.exit(1);
        });
    }
}

async function main(): Promise<void> {
    try {
        const app = new ConsoleInterface();
        await app.start();
    } catch (error) {
        console.error('Erro ao iniciar aplicação:', error);
        process.exit(1);
    }
}

process.on('SIGINT', () => {
    console.log('\nEncerrando aplicação...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\nEncerrando aplicação...');
    process.exit(0);
});

if (require.main === module) {
    main();
}