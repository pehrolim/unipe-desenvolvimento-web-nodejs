import { Stage } from "./stage.entity";

import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('address')
export class Address {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    street: string
    
    @Column()
    neightboord: string;
    
    @Column()
    postalCode: string;
    
    @Column()
    number: string;
    
    @Column()
    city: string;

    @Column()
    state: string;

}