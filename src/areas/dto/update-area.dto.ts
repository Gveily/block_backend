import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAreaDto } from './create-area.dto';
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateAreaDto extends PartialType(CreateAreaDto) {
  @ApiProperty({
    type: String,
    description: 'Имя города'
  })
  text: string

  @ApiProperty({
    type: String,
    description: 'Имя города с маленькой буквы'
  })
  callback_data: string
}
