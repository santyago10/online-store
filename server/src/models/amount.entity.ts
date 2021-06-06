import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import Product from "./product.entity";
import Size from './size.entity';

@Entity()
class Amount {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public amount: number;

  @ManyToOne( () => Product, (product: Product) => product.amount )
  public product_: Product;

  @ManyToOne( () => Size, (size: Size) => size.amount )
  public size_: Size;
}
 
export default Amount;