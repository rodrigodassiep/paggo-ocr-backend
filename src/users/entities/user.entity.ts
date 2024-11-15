// src/users/entities/user.entity.ts
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: number;

  name: string;

  email: string;

  @Exclude()
  password: string;
}
