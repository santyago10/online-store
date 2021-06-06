import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Product from './product.entity';

@Entity()
class Gender {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @OneToMany( () => Product, (product: Product) => product.gender_ )
    public products: Product;
}

export default Gender;

