import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAreaDto {
  @ApiProperty({
    type: Number,
    description: 'Айдишник города (ID)',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty({
    type: String,
    description: 'Имя Района'
  })
  text: string;

  @ApiProperty({
    type: String,
    description: 'Имя района с маленькой буквы'
  })
  callback_data: string;
}
