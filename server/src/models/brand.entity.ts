import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import Product from './product.entity';

@Entity()
class Brand {
    @PrimaryColumn({
        update: false
    })
    public id: string;

    @Column()
    public description: string;

    @Column({
        nullable: true
    })
    public logo: string;

    @OneToMany( () => Product, (product: Product) => product.brand_ )
    public products: Product[];
}

export default Brand;