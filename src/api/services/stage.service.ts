import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from '../entities/stage.entity';
import { StageDTO } from '../dtos/stage.dto';

@Injectable()
export class StageService {
  constructor(
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
  ) {}

  async findAll(): Promise<Stage[]> {
    return this.stageRepository.find();
  }

  async find(id: number): Promise<Stage> {
    const stage = await this.stageRepository.findOneBy({id});

    if (!stage) {
      throw new NotFoundException('Estágio não encontrado');
    }

    return stage;
  }

  async save(stageDto: StageDTO): Promise<Stage> {
    const stage = this.stageRepository.create(stageDto);
    return this.stageRepository.save(stage);
  }

  async update(id: number, stageDto: StageDTO): Promise<Stage> {
    const stage = await this.stageRepository.findOneBy({id});

    if (!stage) {
      throw new NotFoundException('Estágio não encontrado');
    }
    stage.name = stageDto.name;
    return this.stageRepository.save(stage);
  }

  async delete(id: number): Promise<void> {
    const result = await this.stageRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Estágio não encontrado');
    }
  }
}
