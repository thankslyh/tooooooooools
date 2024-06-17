import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { DdDamoclesService } from './dd-damocles.service';
import { CreateDdDamocleDto, LoginDto } from './dto/create-dd-damocle.dto';
import { UpdateDdDamocleDto } from './dto/update-dd-damocle.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('dd-damocles')
export class DdDamoclesController {
  constructor(private readonly ddDamoclesService: DdDamoclesService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('login')
  async login(@Body() createDdDamocleDto: LoginDto) {
    const user = await this.ddDamoclesService.login(createDdDamocleDto);

    const token = this.jwtService.sign(
      {
        id: user.id,
        phone: user.phone,
        email: user.email,
        password: user.password,
      },
      { expiresIn: '30m' },
    );
    return token;
  }

  @Post('create')
  create(@Body() createDdDamocleDto: CreateDdDamocleDto) {
    console.log(createDdDamocleDto);
    return this.ddDamoclesService.create(createDdDamocleDto);
  }

  @Get()
  findAll() {
    return this.ddDamoclesService.findAll();
  }
}
