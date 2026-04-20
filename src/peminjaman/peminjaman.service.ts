import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';

@Injectable()
export class PeminjamanService {
  constructor(private prisma: PrismaService) { }

  create(dto: CreatePeminjamanDto) {
    return this.prisma.peminjaman.create({
      data: {
        studentId: dto.studentId,
        bookId: dto.bookId,
        status: dto.status ?? 'DIPINJAM',
        tanggalPinjam: dto.tanggalPinjam ?? new Date(),
      },
    });
  }

   async findAll() {
  return this.prisma.peminjaman.findMany(); 
}
  async findByStudent(userId: number) {
    return this.prisma.peminjaman.findMany({
      where: {
        student: {
          user: {
            id: userId,
          },
        },
      },
      include: {
        student: true,
        book: true,
      },
      orderBy: {
        tanggalPinjam: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const peminjaman = await this.prisma.peminjaman.findUnique({
      where: { id },
      include: {
        student: true,
        book: true,
      },
    });

    if (!peminjaman) throw new NotFoundException('Peminjaman tidak ditemukan');

    return peminjaman;
  }

  async returnBook(id: number) {
    const peminjaman = await this.prisma.peminjaman.update({
      where: { id },
      data: {
        status: 'DIKEMBALIKAN',
        tanggalKembali: new Date(),
      },
    });

    return peminjaman;
  }

  delete(id: number) {
    return this.prisma.peminjaman.delete({
      where: { id },
    });
  }
}
