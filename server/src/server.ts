import 'dotenv/config';
import 'reflect-metadata';
import { ProductTypeRoute } from './routes/type.route';
import { createConnection } from 'typeorm';
import App from './app';
import { config } from './ormconfig';
import AdminRoute from './routes/admin.route';
import { BrandRoute } from './routes/brand.route';
import { SizeRoute } from './routes/size.route';
import { AmountRoute } from './routes/amount.route';
import { ProductRoute } from './routes/product.route';
import { OrderRoute } from "./routes/order.route";
import { SentOrderRoute } from './routes/sent-order.route';
 
(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App( [new AdminRoute, new ProductTypeRoute, new BrandRoute, new SizeRoute, new AmountRoute, new ProductRoute, new OrderRoute, new SentOrderRoute],
    5000
  );
  app.listen();
})();

// "dev": "nodemon --exec \"ts-node\" ./src/server.ts"
