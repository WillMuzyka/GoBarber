import {
  ObjectID,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notifications')
export default class {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  content: string;

  @Column()
  recipient_id: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
