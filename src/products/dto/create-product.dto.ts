import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'Имя товара'
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Цена в ZL'
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

  @ApiProperty({
    type: Number,
    description: 'base product id'
  })
  baseProductId: number;
}
