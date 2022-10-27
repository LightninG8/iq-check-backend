import { IResultService } from '../interfaces';
import { injectable } from 'inversify';
import { ResultGetByIdDto, ResultGetByEmailDto, ResultGetRecentDto, ResultSetDto } from '../dto';
import { ResultModel } from '../models';

@injectable()
export class ResultService implements IResultService {

	async set(body: ResultSetDto) {
    try {
      const result = new ResultModel(body);

      await result.save();

      return result;
    } catch (e) {
      return null;
    }
    
  }

  async getById(body: ResultGetByIdDto) {
    try {
      const result = await ResultModel.findOne(body);

      return result;
    } catch (e) { 
      return null;
    }
  }

  async getByEmail(body: ResultGetByEmailDto) {
    try {
      const result = await ResultModel.findOne(body);

      return result;
    } catch (e) { 
      return null;
    }
  }

  async getRecent(body: ResultGetRecentDto) {
    try {
      const recentResults = await ResultModel.find().sort({_id: -1}).limit(+body.limit);

      return recentResults;
    } catch (e) { 
      return null;
    }
  }
}