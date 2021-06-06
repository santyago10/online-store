import { Column, Entity,ManyToMany,JoinTable, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
class Admin {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public login: string;

  @Column()
  public password: string;
}
 
export default Admin;