import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBaseProductDto } from './create-base-product.dto';
import { ProductsEnum } from "../../enums";

export class UpdateBaseProductDto extends PartialType(CreateBaseProductDto) {
}
