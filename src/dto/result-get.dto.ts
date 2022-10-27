import { IsString, IsInt, IsEmail } from 'class-validator';

export class ResultGetByIdDto {
  @IsString({ message: 'Неверно указан id'})
  _id: string;
}

export class ResultGetRecentDto {
  @IsInt({ message: 'Неверно указан лимит'})
  limit: string;
}


export class ResultGetByEmailDto {
  @IsEmail({}, { message: 'Неверно указан email'})
  email: string;
}
