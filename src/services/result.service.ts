import { IResultService } from '../interfaces';
import { injectable } from 'inversify';
import { ResultGetDto, ResultSetDto } from '../dto';
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

  async get(body: ResultGetDto) {
    try {
      const result = await ResultModel.findOne(body);

      return result;
    } catch (e) { 
      return null;
    }
    
  }
}
