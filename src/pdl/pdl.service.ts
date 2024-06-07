import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import { Conifg, CreatePdlDto } from './dto/create-pdl.dto';
import { UpdatePdlDto } from './dto/update-pdl.dto';

@Injectable()
export class PdlService {
  async updateConfig(config: Conifg) {
    const cwd = process.cwd();
    const data = fs.readFileSync(`${cwd}/pdl.config.json`, 'utf-8');
    const jsonData = JSON.parse(data);
    const { phone, ...other } = config;
    if (!phone) throw new Error('phone is required');
    jsonData[phone] = other;
    fs.writeFileSync(`${cwd}/pdl.config.json`, JSON.stringify(jsonData));
    return 'update success';
  }
  create(createPdlDto: CreatePdlDto) {
    return 'This action adds a new pdl';
  }

  findAll() {
    return `This action returns all pdl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pdl`;
  }

  update(id: number, updatePdlDto: UpdatePdlDto) {
    return `This action updates a #${id} pdl`;
  }

  remove(id: number) {
    return `This action removes a #${id} pdl`;
  }
}
