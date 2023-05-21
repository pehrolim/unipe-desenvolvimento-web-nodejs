import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDTO } from '../dtos/user.dto';
import { AddressService } from '../services/address.service';
import { ExceptionHandler } from '../exception/exceptionHandler'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private addressService: AddressService,
  ) {}

  async findAll(): Promise<User[]>{
    return await this.userRepository.find();
  }

  async find(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['address'] });

    if (!user) {
        throw new ExceptionHandler(`Não existe user de código ${id}`, 404);
    }

    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['address'] });
    const address = user.address;
  
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
  
    await this.userRepository.remove(user);
    await this.addressService.deleteAddress(address);
  }
  

  async createUser(userDTO: UserDTO): Promise<User> {
    const address = await this.addressService.createAddress(userDTO.address);

    const user = new User();
    user.fullname = userDTO.fullname;
    user.cpf = userDTO.cpf;
    user.email = userDTO.email;
    user.birthDate = userDTO.birthDate;
    user.username = userDTO.username;
    user.password = userDTO.password;
    user.address = address;

    return await this.userRepository.save(user);
  }

  async updateUser(id: number, userDTO: UserDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({id});
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
  
    user.fullname = userDTO.fullname;
    user.cpf = userDTO.cpf;
    user.email = userDTO.email;
    user.birthDate = userDTO.birthDate;
    user.username = userDTO.username;
    user.password = userDTO.password;
  
    if (userDTO.address) {
      user.address.street = userDTO.address.street;
      user.address.neightboord = userDTO.address.neightboord;
      user.address.postalCode = userDTO.address.postalCode;
      user.address.number = userDTO.address.number;
      user.address.city = userDTO.address.city;
      user.address.state = userDTO.address.state;
    }
  
    await this.userRepository.save(user);
  
    return user;
  }




}
