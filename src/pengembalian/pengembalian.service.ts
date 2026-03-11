import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';

@Injectable()
export class PengembalianService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePengembalianDto) {
    const peminjaman = await this.prisma.peminjaman.findUnique({
      where: { id: dto.peminjamanId },
    });

    if (!peminjaman) {
      throw new NotFoundException('Peminjaman tidak ditemukan');
    }

    if (peminjaman.status === 'DIKEMBALIKAN') {
      throw new BadRequestException('Buku sudah dikembalikan');
    }

    return this.prisma.peminjaman.update({
      where: { id: dto.peminjamanId },
      data: {
        status: 'DIKEMBALIKAN',
        tanggalKembali: new Date(),
      },
      include: {
        student: true,
        book: true,
      },
    });
  }

  findAll() {
    return this.prisma.peminjaman.findMany({
      where: { status: 'DIKEMBALIKAN' },
      include: {
        student: true,
        book: true,
      },
    });
  }
}
