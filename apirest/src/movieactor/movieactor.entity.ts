import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Movies } from '../movies/movies.entity';
import { Actors } from '../actors/actors.entity';

@Table({
    tableName: 'movie_actor',
    timestamps: false,
})
export class MovieActor extends Model {
    @ForeignKey(() => Movies)
    @Column({ type: DataType.INTEGER })
    declare movieId: number;

    @ForeignKey(() => Actors)
    @Column({ type: DataType.INTEGER })
    declare actorId: number;
}