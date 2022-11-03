import { IsEmail, IsString, IsInt } from 'class-validator';

export class ResultSetDto {
  @IsEmail({}, { message: 'Неверно указан email'})
  email: string;
  
  @IsString({ message: 'Не указано имя'})
  name: string;

  @IsInt({ message: 'Не указан IQ'})
  iq: number;

  yearOfBirth: string;
  gender: string;

  @IsString({ message: 'Не указан уровень образования'})
  educationLevel: string;

  @IsString({ message: 'Не указано образование'})
  educationType: string;

  @IsString({ message: 'Не указана страна'})
  countryCode: string;
}

export class ResultRestoreDto {
  @IsEmail({}, { message: 'Неверно указан email'})
  email: string;
}
