import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  Entity,
  PostgreSqlDriver,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';

@Entity({ abstract: true })
export abstract class DBBaseEntity {
  @PrimaryKey()
  id = v4();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}

@Entity({
  tableName: 'client',
})
export class ClientEntity extends DBBaseEntity {
  @Property()
  userId!: string;

  @Property({ unique: true, nullable: true })
  userEmail!: string;
}

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log(`hello ${config.get('DB_NAME')}`);

        return {
          entities: [DBBaseEntity, ClientEntity],
          driver: PostgreSqlDriver,
          dbName: config.get('DB_NAME'),
          password: config.get('DB_PASSWORD'),
          host: config.get('DB_HOST'),
          user: config.get('DB_USER'),
          port: 5432,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
