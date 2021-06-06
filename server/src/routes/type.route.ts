import * as express from 'express';
import { getRepository } from 'typeorm';
import Route from '../interfaces/route.interface';
import { ProductTypeController } from '../controllers/type.controller';
import authenticationMiddleware from '../middlewares/authentication.middleware';
 
export class ProductTypeRoute implements Route {
  public path = '/types';
  public router = express.Router();
  private controller: ProductTypeController = new ProductTypeController();
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post( this.path, authenticationMiddleware(),  this.controller.create );
    this.router.get( this.path, this.controller.getAll );
    this.router.patch( `${this.path}/:id`, authenticationMiddleware(), this.controller.edit );
    this.router.delete( `${this.path}/:id`, authenticationMiddleware(), this.controller.delete );
  }
}