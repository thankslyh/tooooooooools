import { PartialType } from '@nestjs/mapped-types';
import { CreateDdDamocleDto } from './create-dd-damocle.dto';

export class UpdateDdDamocleDto extends PartialType(CreateDdDamocleDto) {}
