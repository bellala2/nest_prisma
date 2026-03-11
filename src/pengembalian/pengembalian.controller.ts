import { Controller, Get, Post, Body } from '@nestjs/common';
import { PengembalianService } from './pengembalian.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';

@Controller('pengembalian')
export class PengembalianController {
  constructor(private readonly pengembalianService: PengembalianService) {}

  @Get()
  findAll() {
    return this.pengembalianService.findAll();
  }
  @Post()
  create(@Body() dto: CreatePengembalianDto) {
    return this.pengembalianService.create(dto);
  }
}
