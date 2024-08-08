import { Injectable } from '@nestjs/common';
import { CreateWorldIdDto } from './dto/create-world-id.dto';
import { UpdateWorldIdDto } from './dto/update-world-id.dto';
import { ISuccessResult, IVerifyResponse } from '@worldcoin/idkit';
import 'dotenv/config';

@Injectable()
export class WorldIdService {
  create(createWorldIdDto: CreateWorldIdDto) {
    return 'This action adds a new worldId';
  }

  async verify(proof: ISuccessResult) {
    const action = process.env.ACTION_ID;
    const id = process.env.WORLD_ID_APP_ID;
    const response = await fetch(
      `https://developer.worldcoin.org/api/v1/verify/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...proof, action }),
      },
    );
    if (response.ok) {
      const { verified } = await response.json();
      return verified;
    } else {
      const { code, detail } = await response.json();
      throw new Error(`Error Code ${code}: ${detail}`);
    }
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
