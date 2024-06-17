import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DdDamoclesService } from './dd-damocles.service';
import { CreateDdDamocleDto } from './dto/create-dd-damocle.dto';
import { UpdateDdDamocleDto } from './dto/update-dd-damocle.dto';

@Controller('dd-damocles')
export class DdDamoclesController {
  constructor(private readonly ddDamoclesService: DdDamoclesService) {}

  @Post('login')
  async login(@Body() createDdDamocleDto: CreateDdDamocleDto) {
    await this.ddDamoclesService.findByPhone(createDdDamocleDto.phone);
    await this.ddDamoclesService.checkValidate(createDdDamocleDto.phone, '');
    return this.ddDamoclesService.create(createDdDamocleDto);
  }

  @Post('create')
  create(@Body() createDdDamocleDto: CreateDdDamocleDto) {
    return this.ddDamoclesService.create(createDdDamocleDto);
  }

  @Get()
  findAll() {
    return this.ddDamoclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ddDamoclesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDdDamocleDto: UpdateDdDamocleDto,
  ) {
    return this.ddDamoclesService.update(+id, updateDdDamocleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ddDamoclesService.remove(+id);
  }
}
