import * as express from 'express';
import { AdminService } from '../services/admin.service';
import { send } from 'process';
 
export class AdminController {
  public service: AdminService = new AdminService();


  public login = async(request: express.Request, response: express.Response) => {
    let result = await this.service.login( request.body );
    result ? response.send( result ) : response.status( 401 ).send( "Unauthorized" );
  }
  
  public registration = async ( request: express.Request, response: express.Response ) => {
    let result = await this.service.registration(request.body);
    response.send( result );
  }

  public isAuthenticated = async ( request: express.Request, response:express.Response ) => {
    const result = await this.service.isAuthenticated( request );
    result ? response.send( result ) : response.status( 401 ).send();
  }

  public logout = async ( request: express.Request, response: express.Response ) => {
    const result = await this.service.logout( request );
    response.send( result );
  }

}