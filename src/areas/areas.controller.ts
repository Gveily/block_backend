import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AreasService } from './areas.service';
import { UpdateAreaDto } from './dto/update-area.dto';
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { AreaEnum } from "../products/dto/enums";

@ApiTags('Районы')
@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @ApiQuery({ name: 'Район', enum: AreaEnum, required: true })
  @ApiQuery({ name: 'Город', required: true })
  @Post()
  create(
    @Query('Район') area: string,
    @Query('Город') cityId: string,
  ) {
    return this.areasService.create({ cityId: parseInt(cityId), name: area});
  }

  @Get()
  findAll() {
    return this.areasService.findAll();
  }

  @ApiQuery({name: 'cityId', required: true})
  @Get('by-city')
  getByCityId(
    @Query('cityId') cityId: string
  ) {
    return this.areasService.findByCityId(parseInt(cityId))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areasService.update(+id, updateAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areasService.remove(+id);
  }
}
