import { Injectable,UnauthorizedException,ForbiddenException,BadRequestException,} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Username tidak ditemukan');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Password salah');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      memberId: user.studentId,
    };

    return {
      message: 'Login berhasil',
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(
    data: {
      username: string;
      password: string;
      role?: 'ADMIN' | 'PETUGAS' | 'MEMBER';
      studentId?: number;
    },
    currentUserRole?: string,
  ) {
    const role = data.role ?? 'MEMBER';
    if ((role === 'ADMIN' || role === 'PETUGAS') && currentUserRole !== 'ADMIN') {
      throw new ForbiddenException('Hanya ADMIN yang boleh membuat akun ini');
    }
    if (role === 'MEMBER' && !data.studentId) {
      throw new BadRequestException('studentId wajib untuk MEMBER');
    }

    const hashed = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        username: data.username,
        password: hashed,
        role,
        studentId: role === 'MEMBER' ? data.studentId : null,
      },
    });
  }
}
