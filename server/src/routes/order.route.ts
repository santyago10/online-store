import * as express from 'express';
import { getRepository } from 'typeorm';
import Route from '../interfaces/route.interface';
import { OrderController } from '../controllers/order.controller';
import authenticationMiddleware from '../middlewares/authentication.middleware';
 
export class OrderRoute implements Route {
  public path = '/orders';
  public sendPath = "/sendOrder";
  public router = express.Router();
  private controller: OrderController = new OrderController();
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post( this.path, this.controller.create );
    this.router.get( this.path, authenticationMiddleware(), this.controller.getAll );
    this.router.get( `${this.path}/:id`, authenticationMiddleware(), this.controller.getById );
    this.router.get( `${this.sendPath}/:id`, authenticationMiddleware(), this.controller.sendOrder );
    this.router.patch( `${this.path}/:id`, authenticationMiddleware(), this.controller.edit );
    this.router.delete( `${this.path}/:id`, authenticationMiddleware(), this.controller.delete );
  }
}