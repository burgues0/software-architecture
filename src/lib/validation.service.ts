export class ValidationService {
    static validateExists<T>(entity: T | null, entityName: string, id: number): T {
        if (!entity) {
            throw new Error(`${entityName} com o ID ${id} não encontrado.`);
        }
        return entity;
    }

    static validateNonEmptyString(value: string | undefined, fieldName: string): void {
        if (value && value.trim().length === 0) {
            throw new Error(`${fieldName} não pode ser vazio.`);
        }
    }

    static validateRequiredField(value: any, fieldName: string): void {
        if (!value) {
            throw new Error(`${fieldName} não foi informado.`);
        }
    }

    static validateNonEmptyArray(array: any[], fieldName: string): void {
        if (!array || array.length === 0) {
            throw new Error(`Nenhum ${fieldName} foi fornecido.`);
        }
    }

    static validateYearRange(year: number | undefined): void {
        if (year !== undefined && (year < 1888 || year > new Date().getFullYear() + 1)) {
            throw new Error("Ano de lançamento inválido.");
        }
    }
}
