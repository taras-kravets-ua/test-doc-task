import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Document } from "../../document/entities/document.entity";

@Entity({ name: 'page' })
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Document, document => document.pages)
  document: Document;
}
