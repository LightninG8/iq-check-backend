import { IsString, IsInt, IsEmail } from 'class-validator';

export class ResultGetByIdDto {
  @IsString({ message: 'Неверно указан id'})
  _id: string;
}

export class ResultGetRecentDto {
  @IsInt({ message: 'Неверно указан лимит'})
  limit: number;
}


export class ResultGetByEmailDto {
  @IsEmail({}, { message: 'Неверно указан email'})
  email: string;
}

export class ResultGetTopDto {
  @IsInt({ message: 'Неверно указан период'})
  days: number;

  @IsInt({ message: 'Неверно указан лимит'})
  limit: number;
}

