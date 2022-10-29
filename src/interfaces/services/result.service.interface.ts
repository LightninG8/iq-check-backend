import { ResultGetByIdDto, ResultGetByEmailDto, ResultGetRecentDto, ResultSetDto, ResultGetTopDto } from "dto";
import { IResult } from "interfaces/models";
import { Document } from "mongoose";
import { Query } from 'express-serve-static-core';

export interface IResultService {
  set: (body: Query) => Promise<Document<unknown, any, IResult> | null>;
  getResultById: (query: Query) => Promise<Document<unknown, any, IResult> | null>;
  getResultByEmail: (query: Query) => Promise<Document<unknown, any, IResult> | null>;
  getRecent: (query: Query) => Promise<Document<unknown, any, IResult>[] | null>;
  getTop: (query: Query) => Promise<Document<unknown, any, IResult>[] | null>;

}
