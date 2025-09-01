import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateMoviesDto {
    @IsNotEmpty({ message: 'O título do filme não pode ser vazio.' })
    @IsString({ message: 'O título deve ser uma string.' })
    @MaxLength(50, { message: 'O título deve ter no máximo 50 caracteres.' })
    title: string;

    @IsNotEmpty({ message: 'O ano de lançamento não pode ser vazio.' })
    @IsNumber({}, { message: 'O ano de lançamento deve ser um número.' })
    releaseYear: number;

    @IsNotEmpty({ message: 'A sinopse não pode ser vazia.' })
    @IsString({ message: 'A sinopse deve ser uma string.' })
    synopsis: string;

    @IsNotEmpty({ message: 'A duração não pode ser vazia.' })
    @IsNumber({}, { message: 'A duração deve ser um número em minutos.' })
    runtime: number;

    @IsNotEmpty({ message: 'O gênero do filme não pode ser vazio.' })
    @IsNumber({}, { message: 'O ID do gênero deve ser um número.' })
    genreId: number;
}