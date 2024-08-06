import { PartialType } from '@nestjs/mapped-types';
import { CreateWorldIdDto } from './create-world-id.dto';

export class UpdateWorldIdDto extends PartialType(CreateWorldIdDto) {}
