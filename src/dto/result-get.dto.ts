import { IsString, IsEmail } from 'class-validator';

export class ResultGetByIdDto {
  @IsString({ message: 'Неверно указан id'})
  _id: string;
}

export class ResultGetRecentDto {
  @IsString({ message: 'Неверно указан лимит'})
  limit: string;
}


export class ResultGetByEmailDto {
  @IsEmail({}, { message: 'Неверно указан email'})
  email: string;
}

export class ResultGetTopDto {
  @IsString({ message: 'Неверно указан период'})
  days: string;

  @IsString({ message: 'Неверно указан лимит'})
  limit: string;
}

