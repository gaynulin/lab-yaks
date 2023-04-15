import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({nullable: false, length: 128})
   @Index()
   customer: string;
   
   @Column({nullable: false, default: 0})
   day: number;

   @Column({nullable: true, default: 0})
   milk: number;

   @Column({nullable: true, default: 0})
   skins: number;

   @Column({default: false})
   isParticial: boolean;

   @Column({ type: 'timestamptz', default: new Date() })
   created: Date;
}
