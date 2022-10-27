import { IsString } from 'class-validator';

export class ResultGetDto {
  @IsString({ message: 'Неверно указан id'})
  _id: string;
}
