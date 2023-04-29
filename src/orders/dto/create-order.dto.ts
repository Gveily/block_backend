import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
  @ApiProperty({
    type: String,
    description: 'names'
  })
  names: string;

  @ApiProperty({
    type: String,
    description: 'photo urls'
  })
  photoUrl: string;
}
