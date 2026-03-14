import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common'; 
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Mendaftarkan user baru' })
  register(@Body() dto: any, @Req() req: any) { 
    
    const roleYgLogin = req.user.role; 


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