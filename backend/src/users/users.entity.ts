import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UsersRepository } from './users.repository';

@Entity({ tableName: 'users', repository: () => UsersRepository })
export class UsersEntity {
  [EntityRepositoryType]: UsersRepository;

  @PrimaryKey()
  id: bigint;

  @Property({ nullable: true })
  uid: string;

  @Property()
  username: string;

  @Property()
  password: string;

  @Property({ nullable: true })
  latestLogin: Date;

  @Property({ default: false })
  delFlag: boolean;

  @Property({ onCreate: () => new Date() })
  createdAt: Date;

  @Property({
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  updatedAt: Date;
}
