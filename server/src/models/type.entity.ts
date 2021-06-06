import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Product from './product.entity';

@Entity()
class ProductType {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @OneToMany( () => Product, (product: Product) => product.type_ )
    public products: Product[];
}

export default ProductType;