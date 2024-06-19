import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';

import { DdDamocle } from './entities/dd-damocle.entity';
import { CreateDdDamocleDto } from './dto/create-dd-damocle.dto';
import { UpdateDdDamocleDto } from './dto/update-dd-damocle.dto';
import { md5 } from 'src/utils/crypto';

@Injectable()
export class DdDamoclesService {
  @InjectEntityManager()
  private manager: EntityManager;

  @InjectRepository(DdDamocle)
  private repository: Repository<DdDamocle>;

  async login(loginDto: Omit<CreateDdDamocleDto, 'confirmPassword'>) {
    const user = await this.findByPhone(loginDto.phone);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    if (user.password !== md5(loginDto.password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async create(createDdDamocleDto: CreateDdDamocleDto) {
    const user = await this.findByPhone(createDdDamocleDto.phone);
    console.log('user', user);
    if (user) {
      throw new HttpException('该用户已存在', HttpStatus.BAD_REQUEST);
    }
    if (createDdDamocleDto.password !== createDdDamocleDto.confirmPassword) {
      throw new HttpException('密码不一致', HttpStatus.BAD_REQUEST);
    }
    const newUser = new DdDamocle();
    newUser.phone = createDdDamocleDto.phone;
    newUser.password = md5(createDdDamocleDto.password);
    await this.manager.save(newUser);
    return '用户创建成功';
  }

  sendDdVerifyCode(phone: string) {
    // 操作设备
  }

  async findByPhone(phone: string) {
    const user = await this.repository.findOne({
      where: { phone },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = this.repository.findOne({
      where: { email },
    });
    return user;
  }

  update(id: number, updateDdDamocleDto: UpdateDdDamocleDto) {
    return `This action updates a #${id} ddDamocle`;
  }

  remove(id: number) {
    return `This action removes a #${id} ddDamocle`;
  }
}
