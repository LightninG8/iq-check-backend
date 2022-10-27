import { IResultService } from '../interfaces';
import { injectable } from 'inversify';
import { ResultGetByIdDto, ResultGetByEmailDto, ResultGetRecentDto, ResultSetDto, ResultGetTopDto } from '../dto';
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
      const recentResults = await ResultModel.find().sort({_id: -1}).limit(body.limit);

      return recentResults;
    } catch (e) { 
      return null;
    }
  }

  async getTop(body: ResultGetTopDto) {
    try {
      const daysAgoTimestamp = Date.now() - 1000 * 60 * 60 * 24 * body.days;

      const recentResults = await ResultModel.find({createdAt: {$gte: daysAgoTimestamp}}).sort({iq: -1}).limit(body.limit);

      return recentResults;
    } catch (e) { 
      return null;
    }
  }
}
