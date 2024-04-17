import { EntityRepository } from '@mikro-orm/postgresql';
import { UsersEntity } from './users.entity';

export class UsersRepository extends EntityRepository<UsersEntity> {}
