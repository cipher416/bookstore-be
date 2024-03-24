import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty()
  BookId: string;
  @ApiProperty()
  Quantity: number;
}
