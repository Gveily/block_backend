import { ApiProperty } from "@nestjs/swagger";

export class MakePendingPaymentDto {
  @ApiProperty({
    type: Number
  })
  baseProductId: number;

  @ApiProperty({
    type: Number
  })
  areaId: number;

  @ApiProperty({
    type: Number
  })
  amountToBuy: number
}