import * as express from 'express';
import { getRepository } from 'typeorm';
import Route from '../interfaces/route.interface';
import { ProductController } from '../controllers/product.controller';
import authenticationMiddleware from '../middlewares/authentication.middleware';
 
export class ProductRoute implements Route {
  public path = '/products';
  public genderPath = "/productByGender";
  public router = express.Router();
  private controller: ProductController = new ProductController();
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post( this.path, authenticationMiddleware(),  this.controller.create );
    this.router.post( "/byFilters", this.controller.getByFilters );
    this.router.get( this.path, this.controller.getAll );
    this.router.get( `${this.path}/:id`, this.controller.getById );
    this.router.get( `${this.genderPath}/:id`, this.controller.getByGender );
    this.router.patch( `${this.path}/:id`, authenticationMiddleware(), this.controller.edit );
    this.router.delete( `${this.path}/:id`, authenticationMiddleware(), this.controller.delete );
  }
}