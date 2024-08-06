import { Injectable } from '@nestjs/common';
import { CreateWorldIdDto } from './dto/create-world-id.dto';
import { UpdateWorldIdDto } from './dto/update-world-id.dto';

@Injectable()
export class WorldIdService {
  create(createWorldIdDto: CreateWorldIdDto) {
    return 'This action adds a new worldId';
  }

  findAll() {
    return `This action returns all worldId`;
  }

  findOne(id: number) {
    return `This action returns a #${id} worldId`;
  }

  update(id: number, updateWorldIdDto: UpdateWorldIdDto) {
    return `This action updates a #${id} worldId`;
  }

  remove(id: number) {
    return `This action removes a #${id} worldId`;
  }
}
