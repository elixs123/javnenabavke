import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenders } from './users/entities/tenders.entity';
import { User } from './users/entities/user.entity';
import { AllTenders } from './users/entities/alltenders.entity';

@Module({
  imports: [HttpModule, UsersModule, TypeOrmModule.forRoot({
    type: 'mssql',
    database: 'TENDERI',
    host: '10.20.10.50',
    port: 51132,
    username: 'sa',
    password: 'uppercase',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    options: {
      encrypt: false,
      trustServerCertificate: true
    },
  }), TypeOrmModule.forFeature([Tenders, User, AllTenders])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
