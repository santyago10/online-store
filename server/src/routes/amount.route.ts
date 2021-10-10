import * as express from 'express';
import { getRepository } from 'typeorm';
import Route from '../interfaces/route.interface';
import { AmountController } from '../controllers/amount.controller';
import authenticationMiddleware from '../middlewares/authentication.middleware';
 
export class AmountRoute implements Route {
  public path = "/amount";
  public incrementPath = "/incrementAmount";
  public oneSizePath="/oneSizeAmount"
  public productPath = "/amountByProduct";
  public router = express.Router();
  private controller: AmountController = new AmountController();
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post( this.path, authenticationMiddleware(),  this.controller.create );
    this.router.get( this.path, this.controller.getAll );
    this.router.get( `${this.path}/:id`, this.controller.getById );
    this.router.get( `${this.productPath}/:id`, this.controller.getByProductId );
    this.router.post( `${this.oneSizePath}/:id`, this.controller.getOneSizeByProductId );
    this.router.patch( `${this.path}/:id`, this.controller.edit );
    this.router.patch( `${this.incrementPath}/:id`, this.controller.incrementAmount );
    this.router.delete( `${this.path}/:id`, authenticationMiddleware(), this.controller.delete );
  }
}