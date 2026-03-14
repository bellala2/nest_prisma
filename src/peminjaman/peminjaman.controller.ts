import { Controller, Get, Post, Param, Body, Query, UseGuards, Req } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { user_role } from '@prisma/client';


@Controller('peminjaman')
@UseGuards(JwtAuthGuard) 
export class PeminjamanController {
  constructor(private readonly peminjamanService: PeminjamanService) {}

  @UseGuards(RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Get()
  getAll(
    @Query('date') date?: string,
    @Query('id') id?: string,
  ) {
    return this.peminjamanService.findAll({
      date,
      id: id ? Number(id) : undefined,
    });
  }

  @UseGuards(RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.peminjamanService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Post()
  create(@Body() dto: CreatePeminjamanDto) {
    return this.peminjamanService.create(dto);
  }

  @Get('my/history')
  getMyHistory(@Req() req) {
    return this.peminjamanService.findByStudent(req.user.sub);
  }
}
