import { HttpCode, Put, Get, Param, Delete } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() userDTO: UserDTO) {
    return await this.userService.createUser(userDTO);
  }

  @Get()
  async findAll() {
      return await this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
      return await this.userService.find(id);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() userDTO: UserDTO): Promise<User> {
    const updatedUser = await this.userService.updateUser(id, userDTO);
    return updatedUser;
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: number){
    this.userService.deleteUser(id);
  }
}
