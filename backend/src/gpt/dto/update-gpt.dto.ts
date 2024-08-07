import { PartialType } from '@nestjs/mapped-types';
import { CreateGptDto } from './create-gpt.dto';

export class UpdateGptDto extends PartialType(CreateGptDto) {}
