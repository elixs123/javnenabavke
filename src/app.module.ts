import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
