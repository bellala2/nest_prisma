import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStudentDto) {
    if (!dto.email) {
      throw new Error('Email harus diisi');
    }

    const data: Prisma.studentCreateInput = {
      nis: dto.nis,
      name: dto.name,
      email: dto.email,
      kelas: dto.kelas,
      jurusan: dto.jurusan,
    };

    return this.prisma.student.create({ data });
  }

  findAll(name?: string) {
    return this.prisma.student.findMany({
      where: name
        ? {
            name: { contains: name },
          }
        : {},
    });
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Student tidak ditemukan');
    return student;
  }

  async findByNis(nis: string) {
    const student = await this.prisma.student.findUnique({ where: { nis } });
    if (!student) throw new NotFoundException('Student tidak ditemukan');
    return student;
  }

  async update(id: number, dto: UpdateStudentDto) {
    await this.findOne(id); 
    const data: Prisma.studentUpdateInput = { ...dto };
    return this.prisma.student.update({ where: { id }, data });
  }

  async updateByNis(nis: string, dto: UpdateStudentDto) {
    await this.findByNis(nis); 
    const data: Prisma.studentUpdateInput = { ...dto };
    return this.prisma.student.update({ where: { nis }, data });
  }

  async remove(id: number) {
    await this.findOne(id); 
    return this.prisma.student.delete({ where: { id } });
  }

  async removeByNis(nis: string) {
    await this.findByNis(nis); 
    return this.prisma.student.delete({ where: { nis } });
  }
}