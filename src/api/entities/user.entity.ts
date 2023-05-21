import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Stage } from './stage.entity'

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    fullname: string;

    @Column({ length: 11 })
    cpf: string;

    @Column()
    email: string;

    @Column({name: 'birth_date', nullable: true})
    birthDate?: Date;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToOne(type => Address)
    @JoinColumn({name: "address_id"})
    address: Address;

    @OneToOne(type => Stage)
    @JoinColumn({name: "stage_id"})
    stage: Stage;

}