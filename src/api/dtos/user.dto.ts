import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '../entities/address.entity';

@Entity('users')
export class UserDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ length: 11 })
  cpf: string;

  @Column()
  email: string;

  @Column({ name: 'birth_date', nullable: true })
  birthDate?: Date;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
