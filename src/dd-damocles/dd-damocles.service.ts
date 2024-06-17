import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

import { DdDamocle } from './entities/dd-damocle.entity';
import { CreateDdDamocleDto } from './dto/create-dd-damocle.dto';
import { UpdateDdDamocleDto } from './dto/update-dd-damocle.dto';

@Injectable()
export class DdDamoclesService {
  @InjectEntityManager()
  private manager: EntityManager;

  private repository: Repository<DdDamocle>;
  create(createDdDamocleDto: CreateDdDamocleDto) {
    return 'This action adds a new ddDamocle';
  }

  findAll() {
    return `This action returns all ddDamocles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ddDamocle`;
  }

  async findByPhone(phone: string): Promise<void> {
    return;
  }

  async checkValidate(phone: string, code: string): Promise<void> {
    return;
  }

  update(id: number, updateDdDamocleDto: UpdateDdDamocleDto) {
    return `This action updates a #${id} ddDamocle`;
  }

  remove(id: number) {
    return `This action removes a #${id} ddDamocle`;
  }
}
