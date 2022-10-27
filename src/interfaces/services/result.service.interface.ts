import { ResultGetDto, ResultSetDto } from "dto";
import { IResult } from "interfaces/models";
import { Document } from "mongoose";

export interface IResultService {
  set: (body: ResultSetDto) => Promise<Document<unknown, any, IResult> | null>;
  get: (body: ResultGetDto) => Promise<Document<unknown, any, IResult> | null>;
}
