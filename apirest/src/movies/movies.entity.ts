import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Actors } from '../actors/actors.entity';
import { Genre } from '../genre/genre.entity';
import { MovieActor } from '../movieactor/movieactor.entity';

@Table({
    tableName: 'movies',
    timestamps: false,
})
export class Movies extends Model<InferAttributes<Movies>, InferCreationAttributes<Movies>> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    declare readonly id: number;

    @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
    declare title: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare releaseYear: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    declare synopsis: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare runtime: number;
    
    @ForeignKey(() => Genre)
    @Column({ type: DataType.INTEGER })
    declare genreId: number;

    @BelongsTo(() => Genre)
    declare genre: Genre;

    @BelongsToMany(() => Actors, () => MovieActor)
    declare actors: Actors[];
}