import { Module } from '@nestjs/common';
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
      url: process.env.DATABASE_URL,
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT),
      database: process.env.PGDATABASE,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      entities: [City, Area, Product],
      logger: 'file',
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
