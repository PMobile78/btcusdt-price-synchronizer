import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class BtcUsdtHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'float'})
    rate;

    @Column({type: 'int'})
    date;
}
