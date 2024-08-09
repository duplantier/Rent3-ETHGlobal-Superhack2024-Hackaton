import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PropertyService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createPropertyDto: Prisma.PropertyCreateInput) {
    return this.databaseService.property.create({ data: createPropertyDto });
  }

  findAll() {
    return this.databaseService.property.findMany();
  }

  findOne(id: number) {
    return this.databaseService.property.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updatePropertyDto: Prisma.PropertyUpdateInput) {
    return this.databaseService.property.update({
      data: updatePropertyDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.databaseService.property.delete({ where: { id } });
  }
}
