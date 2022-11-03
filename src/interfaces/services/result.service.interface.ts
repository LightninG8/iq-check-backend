import { ResultGetByIdDto, ResultGetByEmailDto, ResultGetRecentDto, ResultSetDto, ResultGetTopDto } from "dto";
import { IResult } from "interfaces/models";
import { Document } from "mongoose";

export interface IResultService {
  set: (body: ResultSetDto) => Promise<Document<unknown, any, IResult> | null>;
  getResult: (body: any) => Promise<Document<unknown, any, IResult>[] | null>;
  getResultById: (query: ResultGetByIdDto) => Promise<Document<unknown, any, IResult> | null>;
  getResultByEmail: (query: ResultGetByEmailDto) => Promise<Document<unknown, any, IResult> | null>;
  getRecent: (query: ResultGetRecentDto) => Promise<Document<unknown, any, IResult>[] | null>;
  getTop: (query: ResultGetTopDto) => Promise<Document<unknown, any, IResult>[] | null>;

}
