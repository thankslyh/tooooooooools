import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsMobilePhone,
} from 'class-validator';

export class LoginDto {
  @IsMobilePhone(
    'zh-CN',
    {
      strictMode: false,
    },
    {
      message: '手机号格式不正确',
    },
  )
  @IsNotEmpty({
    message: '手机号不能为空',
  })
  phone: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(8, {
    message: '密码不能少于8位',
  })
  @MaxLength(16, {
    message: '密码不能多于16位',
  })
  password: string;
}
export class CreateDdDamocleDto extends LoginDto {
  @IsNotEmpty({
    message: '确认密码不能为空',
  })
  @MinLength(8, {
    message: '确认密码不能少于8位',
  })
  @MaxLength(16, {
    message: '确认密码不能多于16位',
  })
  confirmPassword: string;
}
