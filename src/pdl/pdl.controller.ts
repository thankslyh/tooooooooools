import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PdlService } from './pdl.service';
import { CreatePdlDto, Conifg } from './dto/create-pdl.dto';
import { UpdatePdlDto } from './dto/update-pdl.dto';

@Controller('pdl')
export class PdlController {
  constructor(private readonly pdlService: PdlService) {}

  @Post('/update-config')
  updateConfig(@Body() configDto: Conifg) {
    return this.pdlService.updateConfig(configDto);
  }

  @Post()
  create(@Body() createPdlDto: CreatePdlDto) {
    return this.pdlService.create(createPdlDto);
  }

  @Get()
  findAll() {
    return this.pdlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pdlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePdlDto: UpdatePdlDto) {
    return this.pdlService.update(+id, updatePdlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pdlService.remove(+id);
  }
}
