import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Cereals extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public name: string = '';

  @Column()
  public mfr: string = '';

  @Column()
  public type: string = '';

  @Column()
  public calories: number = 0;

  @Column()
  public protein: number = 0;

  @Column()
  public fat: number = 0;

  @Column()
  public sodium: number = 0;

  @Column()
  public fiber: number = 0;

  @Column()
  public carbo: number = 0;

  @Column()
  public sugars: number = 0;

  @Column()
  public potass: number = 0;

  @Column()
  public vitamins: number = 0;

  @Column()
  public shelf: number = 0;

  @Column()
  public weight: number = 0;

  @Column()
  public cups: number = 0;

  @Column()
  public rating: number = 0;
}

export default Cereals;
