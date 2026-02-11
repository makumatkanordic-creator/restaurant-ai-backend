import { ApiProperty } from '@nestjs/swagger';

export class AiOrderDto {
  @ApiProperty({
    example: 40,
    description: 'Total budget for the order',
  })
  budget: number;

  @ApiProperty({
    example: 2,
    description: 'Number of people',
  })
  people: number;
}
