import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class BtcUsdtHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "float8"})
    rate;

    @Column({type: "int4"})
    date;
}
