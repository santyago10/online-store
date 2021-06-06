import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Order from './order.entity';


@Entity()
class SentOrder {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => Order)
    @JoinColumn()
    order_: Order;
}

export default SentOrder;