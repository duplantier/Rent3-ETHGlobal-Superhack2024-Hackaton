import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorldIdService } from './world-id.service';
import { CreateWorldIdDto } from './dto/create-world-id.dto';
import { UpdateWorldIdDto } from './dto/update-world-id.dto';
import { ISuccessResult } from '@worldcoin/idkit';

@Controller('world-id')
export class WorldIdController {
  constructor(private readonly worldIdService: WorldIdService) {}

  @Post()
  create(@Body() createWorldIdDto: CreateWorldIdDto) {
    return this.worldIdService.create(createWorldIdDto);
  }

  @Post('/verify')
  async verify(@Body() data: ISuccessResult) {
    return await this.worldIdService.verify(data);
  }

  @Get()
  findAll() {
    return this.worldIdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.worldIdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorldIdDto: UpdateWorldIdDto) {
    return this.worldIdService.update(+id, updateWorldIdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.worldIdService.remove(+id);
  }
}
