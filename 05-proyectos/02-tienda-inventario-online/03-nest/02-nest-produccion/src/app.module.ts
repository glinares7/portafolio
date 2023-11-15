import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmartphoneModule } from './smartphone/smartphone.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Smartphone } from './smartphone/entities/smartphone.entity';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { PerfilModule } from './perfil/perfil.module';
import { Perfil } from './perfil/entities/perfil.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../'),
      renderPath: '/public',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.POSTGRES_HOST || 'localhost',
      // port: parseInt(process.env.POSTGRES_PORT || '5432'),
      // username: process.env.POSTGRES_USER || 'devgtp',
      // password: process.env.POSTGRES_PASSWORD || 'family',
      // database: process.env.POSTGRES_DB || 'nestbuild',
      url:
        process.env.POSTGRES_URL ||
        'postgres://devgtp:family@localhost:5432/nestbuild',
      entities: [Smartphone, User, Perfil],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    SmartphoneModule,
    UsersModule,
    PerfilModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
