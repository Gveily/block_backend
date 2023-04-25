import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { City } from "../entities/City";
import { Repository } from "typeorm";

@Injectable()
export class CitiesService {
  private logger = new Logger('Cities Service')

  constructor(
    @InjectRepository(City)
    private citiesRepository: Repository<City>
  ) {
  }

  async create(createCityDto: CreateCityDto) {
    console.log(createCityDto);
    return this.citiesRepository.save(
      this.citiesRepository.create(createCityDto)
    )
  }

  async findAll() {
    return await this.citiesRepository.find();
  }

  async findOne(id: number) {
    this.logger.log('findOne: ' + id)
    try {
      return await this.citiesRepository.findOneOrFail({ where: { id } })
    } catch (e) {
      throw new HttpException('Город с таким ID не найден', HttpStatus.NOT_FOUND);
    }
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${ id } city`;
  }

  async remove(id: number) {
    return await this.citiesRepository.delete(id);
  }
}
