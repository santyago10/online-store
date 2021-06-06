import * as express from 'express';
import { getRepository } from 'typeorm';
import Route from '../interfaces/route.interface';
import { BrandController } from '../controllers/brand.controller';
import authenticationMiddleware from '../middlewares/authentication.middleware';
 
export class BrandRoute implements Route {
  public path = '/brands';
  public router = express.Router();
  private controller: BrandController = new BrandController();
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post( this.path, authenticationMiddleware(),  this.controller.create );
    this.router.get( this.path, this.controller.getAll );
    this.router.get( `${this.path}/:id`, this.controller.getById );
    this.router.patch( `${this.path}/:id`, authenticationMiddleware(), this.controller.edit );
    this.router.delete( `${this.path}/:id`, authenticationMiddleware(), this.controller.delete );
  }
}