import { ProductProviderFactory } from './factory/ProductProviderFactory';

interface Arguments {
    input: string;
    format: string;
}

function parseArguments(): Arguments {
    const args = process.argv.slice(2);
    let input = '';
    let format = '';

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--input' && i + 1 < args.length) {
            input = args[i + 1];
        } else if (args[i].startsWith('--format=')) {
            format = args[i].split('=')[1];
        }
    }

    if (!input || !format) {
        console.error('Uso: node app.js --input <arquivo> --format=<formato>');
        console.error('Formatos suportados: json, csv, xml');
        process.exit(1);
    }

    return { input, format };
}

async function main() {
    const argv = parseArguments();

    try {
        const factory = ProductProviderFactory.getInstance();
        const provider = factory.createProvider(argv.format, argv.input);
        
        const products = await provider.load();
        
        console.log(JSON.stringify(products, null, 2));
    } catch (error) {
        console.error('Erro ao processar arquivo:', error);
        process.exit(1);
    }
}

main();