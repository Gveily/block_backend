import { ApiProperty } from "@nestjs/swagger";

export class CreateCityDto {
  @ApiProperty({
    type: String,
    description: 'Имя города'
  })
  text: string;

  @ApiProperty({
    type: String,
    description: 'Имя города с маленькой буквы'
  })
  callback_data: string;
}
