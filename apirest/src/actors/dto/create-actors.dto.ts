import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateActorsDto {
    @IsNotEmpty({ message: 'O nome do ator não pode ser vazio.' })
    @IsString({ message: 'O nome deve ser uma string.' })
    @MaxLength(70, { message: 'O nome deve ter no máximo 70 caracteres.' })
    name: string;

    @IsNotEmpty({ message: 'A data de nascimento não pode ser vazia.' })
    @IsDateString({}, { message: 'A data de nascimento deve ser uma string no formato de data ISO.' })
    birthDate: string;

    @IsNotEmpty({ message: 'A nacionalidade não pode ser vazia.' })
    @IsString({ message: 'A nacionalidade deve ser uma string.' })
    nationality: string;
}