import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { AddressDTO } from '../dtos/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async createAddress(addressDTO: AddressDTO): Promise<Address> {
    const address = new Address();
    address.street = addressDTO.street;
    address.city = addressDTO.city;
    address.state = addressDTO.state;
    address.neightboord = addressDTO.neightboord;
    address.postalCode = addressDTO.postalCode;
    address.number = addressDTO.number;

    return await this.addressRepository.save(address);
  }

  async deleteAddress(address: Address): Promise<void> {
    const addressId = address.id;
    const existingAddress = await this.addressRepository.findOne({ where: { id: addressId } });
  
    if (!existingAddress) {
      throw new Error('Endereço não encontrado');
    }
  
    await this.addressRepository.remove(existingAddress);
  }
  
  

}