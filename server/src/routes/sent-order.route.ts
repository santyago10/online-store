import * as express from 'express';
import { getRepository } from 'typeorm';
import Route from '../interfaces/route.interface';
import { SentOrderController } from '../controllers/sent-order.controller';
import authenticationMiddleware from '../middlewares/authentication.middleware';
 
export class SentOrderRoute implements Route {
  public path = '/sentOrders';
  public orderPath = "/byOrderId";
  public router = express.Router();
  private controller: SentOrderController = new SentOrderController();
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post( this.path, this.controller.create );
    this.router.get( this.path, authenticationMiddleware(), this.controller.getAll );
    this.router.get( `${this.path}/:id`, authenticationMiddleware(), this.controller.getById );
    this.router.get( `${this.orderPath}/:id`, authenticationMiddleware(), this.controller.getByOrderId );
    this.router.patch( `${this.path}/:id`, authenticationMiddleware(), this.controller.edit );
    this.router.delete( `${this.path}/:id`, authenticationMiddleware(), this.controller.delete );
  }
}