import { IsEmail, IsString, IsInt } from 'class-validator';

export class ResultSetDto {
  @IsEmail({}, { message: 'Неверно указан email'})
  email: string;
  
  @IsString({ message: 'Не указано имя'})
  name: string;

  @IsInt({ message: 'Не указан IQ'})
  iq: number;

  @IsInt({ message: 'Не указан год рождения'})
  yearOfBirth: number;

  @IsString({ message: 'Не указан уровень образования'})
  educationLevel: string;

  @IsString({ message: 'Не указано образование'})
  educationType: string;
}
