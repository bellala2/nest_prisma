import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PeminjamanService } from './peminjaman.service';
import { PeminjamanController } from './peminjaman.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PeminjamanService, PrismaService],
  controllers: [PeminjamanController],
})
export class PeminjamanModule {}
