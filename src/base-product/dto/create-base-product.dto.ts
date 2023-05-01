import { ApiProperty } from "@nestjs/swagger";
import { ProductsEnum } from "../../enums";


export class CreateBaseProductDto {
  @ApiProperty({
    name: 'name',
    enum: ProductsEnum
  })
  name: ProductsEnum;


  @ApiProperty({
    name: 'description',
    type: String
  })
  description: string;
}
