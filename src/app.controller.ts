import { Controller, Get } from '@nestjs/common';
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('Bot')
@Controller('app')
export class AppController {

  constructor(
    private appService: AppService
  ) {
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}