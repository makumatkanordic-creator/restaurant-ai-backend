import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AutoPlanDto {

  @ApiProperty({
    example: 40,
    description: 'Total budget available'
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  budget: number;

  @ApiProperty({
    example: 2,
    description: 'Number of people'
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  peopleCount: number;

  @ApiProperty({
    example: 'normal',
    description: 'Diet type (normal / veg / halal)'
  })
  @IsString()
  dietType: string;
}
