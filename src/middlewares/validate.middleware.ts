import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { IValidateMiddleware } from 'interfaces';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

@injectable()
export class ValidateMiddleware implements IValidateMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {

  }

  execute(req: Request, res: Response, next: NextFunction): void {
    const data = req.method === 'GET' ? req.query : req.body;
  
    const instance = plainToClass(this.classToValidate, data);

    validate(instance).then((errors) => {
      if (errors.length) {
        res.status(422).send(errors);
      } else {
        next();
      }
    })
  }
}
