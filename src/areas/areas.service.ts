import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Area } from "../entities/Area";
import { Repository } from "typeorm";

@Injectable()
export class AreasService {

  constructor(
    @InjectRepository(Area)
    private areasRepository: Repository<Area>
  ) {
  }

  create(createAreaDto: CreateAreaDto) {
    return this.areasRepository.save(
      this.areasRepository.create(createAreaDto)
    )
  }

  async findAll() {
    return await this.areasRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  async findByCityId(cityId: number) {
    return await this.areasRepository.find({
      where: {
        cityId
      }
    })
}

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    try {
      const area = await this.areasRepository.findOneOrFail({
        where: {
          id
        }
      })
      this.areasRepository.merge(area, {
        ...updateAreaDto
      })
      return await this.areasRepository.save(area);
    } catch (e) {

    }
  }

  async remove(id: number) {
    return await this.areasRepository.delete(id)
  }
}
