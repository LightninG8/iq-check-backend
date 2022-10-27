import { ResultGetByIdDto, ResultGetByEmailDto, ResultGetRecentDto, ResultSetDto, ResultGetTopDto } from "dto";
import { IResult } from "interfaces/models";
import { Document } from "mongoose";

export interface IResultService {
  set: (body: ResultSetDto) => Promise<Document<unknown, any, IResult> | null>;
  getById: (body: ResultGetByIdDto) => Promise<Document<unknown, any, IResult> | null>;
  getByEmail: (body: ResultGetByEmailDto) => Promise<Document<unknown, any, IResult> | null>;
  getRecent: (body: ResultGetRecentDto) => Promise<Document<unknown, any, IResult>[] | null>;
  getTop: (body: ResultGetTopDto) => Promise<Document<unknown, any, IResult>[] | null>;

}
