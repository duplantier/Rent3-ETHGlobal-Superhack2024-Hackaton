import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createPaymentDto: Prisma.RentalPaymentCreateInput) {
    return this.databaseService.rentalPayment.create({
      data: createPaymentDto,
    });
  }

  findAll() {
    return this.databaseService.rentalPayment.findMany();
  }

  findOne(id: number) {
    return this.databaseService.rentalPayment.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updatePaymentDto: Prisma.RentalPaymentUpdateInput) {
    return this.databaseService.rentalPayment.update({
      data: updatePaymentDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.databaseService.rentalPayment.delete({ where: { id } });
  }
}
