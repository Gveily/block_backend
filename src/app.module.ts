import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "./entities/City";
import { Area } from "./entities/Area";
import { AppController } from "./app.controller";
import { CitiesModule } from './cities/cities.module';
import { AreasModule } from './areas/areas.module';
import { ProductsModule } from './products/products.module';
import { Product } from "./entities/Product";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'block',
      username: 'postgres',
      password: '4br4k4d4br4',
      entities: [City, Area, Product],
      logger: 'file',
      synchronize: true, // never use TRUE in production!
    }),
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    // TelegrafModule.forRoot({
    //   token: process.env.BOT_KEY
    // }),
    CitiesModule,
    AreasModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
