import { IsEmail } from 'class-validator';

export class ResultGetDto {
  @IsEmail({}, { message: 'Неверно указан email'})
  email: string;
}
