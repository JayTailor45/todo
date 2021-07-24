import { Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 255)
  todo: string;

  @Column()
  done: boolean;

  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }

  toJSON() {
    return { ...this, id: undefined };
  }
}
