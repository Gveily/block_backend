import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { AreaEnum } from "../../enums";
import { Area } from "../../entities/Area";

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'Имя товара'
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Цена в ETH'
  })
  price: string;

  @ApiProperty({
    description: 'район',
    type: Number,
  })
  areaId: number;

  @ApiProperty({
    type: String,
    description: 'Photo url (вставить по очереди через пробел)'
  })
  photoUrl: string;

  @ApiProperty({
    type: String,
    description: 'Вес'
  })
  weight: string;
}
