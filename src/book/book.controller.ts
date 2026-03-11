import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'; 
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { user_role } from '@prisma/client';

@Controller('book')
@ApiTags('Books') 
@ApiBearerAuth() 
@Controller('books') 
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get('title/:title')
  findByTitle(@Param('title') title: string) {
    return this.bookService.findByTitle(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.update(Number(id), dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(Number(id));
  }
}
