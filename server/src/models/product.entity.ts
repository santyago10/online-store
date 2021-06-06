import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import Amount from './amount.entity';
import Brand from './brand.entity';
import Gender from './gender.entity';
import ProductType from './type.entity';

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public name: string;

  @Column()
  public model: string;

  @Column()
  public vendorCode: string;
    
  @Column()
  public description: string;

  @Column()
  public firstPrice: number;

  @Column()
  public currentPrice: number;

  @Column()
  public photos: string;

  @ManyToOne( () => Gender, (gender: Gender) => gender.products )
  public gender_: Gender;

  @ManyToOne( () => Brand, (brand: Brand) => brand.products )
  public brand_: Brand;

  @ManyToOne( () => ProductType, (productType: ProductType) => productType.products )
  public type_: ProductType;

  @OneToMany( () => Amount, (amount: Amount) => amount.product_ )
  public amount: Amount[];
}
 
export default Product;