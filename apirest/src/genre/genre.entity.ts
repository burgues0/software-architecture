import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
    tableName: 'genre',
    timestamps: false,
})
export class Genre extends Model<InferAttributes<Genre>, InferCreationAttributes<Genre>> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    declare readonly id: number;

    @Column({ type: DataType.STRING(30), allowNull: false })
    declare name: string;
}