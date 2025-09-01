import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateMoviesDto {
    @IsOptional()
    @IsString({ message: 'O título deve ser uma string.' })
    @MaxLength(50, { message: 'O título deve ter no máximo 50 caracteres.' })
    readonly title?: string;

    @IsOptional()
    @IsNumber({}, { message: 'O ano de lançamento deve ser um número.' })
    readonly releaseYear?: number;

    @IsOptional()
    @IsString({ message: 'A sinopse deve ser uma string.' })
    readonly synopsis?: string;

    @IsOptional()
    @IsNumber({}, { message: 'A duração deve ser um número em minutos.' })
    readonly runtime?: number;

    @IsOptional()
    @IsNumber({}, { message: 'O ID do gênero deve ser um número.' })
    readonly genreId?: number;
}