import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import Amount from './amount.entity';

@Entity()
class Size {
  @PrimaryColumn({
    update: false,
  })
  public id: string;
 
  @OneToMany( () => Amount, (amount: Amount) => amount.size_ )
  public amount: Amount[];
}
 
export default Size;