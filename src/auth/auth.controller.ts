import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common'; // Tambahkan UseGuards & Req
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // Pastikan path ini benar sesuai filemu

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(JwtAuthGuard) // <--- WAJIB: Supaya @Req() bisa berisi data user
  @Post('register')
  @ApiOperation({ summary: 'Mendaftarkan user baru' })
  register(@Body() dto: any, @Req() req: any) { 
    // req.user didapat dari JwtAuthGuard setelah verifikasi token
    const roleYgLogin = req.user.role; 
    
    // Kirim data DTO dan Role yang sedang login ke Service
    return this.authService.register(dto, roleYgLogin);
  }

  @Post('login')
login(@Body() dto: LoginDto) {
  console.log('--- DEBUG LOGIN ---');
  console.log('Isi DTO:', dto); 
  console.log('Username:', dto.username);
    return this.authService.login(dto.username, dto.password);
  }
}