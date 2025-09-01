import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AutoIncrement, BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { MovieActor } from '../movieactor/movieactor.entity';
import { Movies } from '../movies/movies.entity';

@Table({
    tableName: 'actors',
    timestamps: false,
})
export class Actors extends Model<InferAttributes<Actors>, InferCreationAttributes<Actors>> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    declare readonly id: number;

    @Column({ type: DataType.STRING(70), allowNull: false })
    declare name: string;

    @Column({ type: DataType.DATE, allowNull: false })
    declare birthDate: Date;

    @Column({ type: DataType.STRING, allowNull: false })
    declare nationality: string;

    @BelongsToMany(() => Movies, () => MovieActor)
    declare moviesCasted: Movies[];
}