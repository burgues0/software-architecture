import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateActorsDto {
    @IsOptional()
    @IsString({ message: 'O nome deve ser uma string.' })
    @MaxLength(70, { message: 'O nome deve ter no máximo 70 caracteres.' })
    readonly name?: string;

    @IsOptional()
    @IsDateString({}, { message: 'A data de nascimento deve ser uma string no formato de data ISO.' })
    readonly birthDate?: Date;

    @IsOptional()
    @IsString({ message: 'A nacionalidade deve ser uma string.' })
    readonly nationality?: string;
}