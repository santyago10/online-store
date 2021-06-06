import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
class Order {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public products_id: string;

    @Column()
    public details: string;

    @Column()
    public date: string;

    @Column()
    public customerData: string;
}

export default Order;