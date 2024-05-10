import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalStrategy } from './local-auth.guard';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalStrategy)
    @Post('login')
    async login(@Body() user: LoginDto) {
      return this.authService.login(user);
    }
  
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('validate')
    validate(@Req() req) {
      const userObject = req.user.toObject();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = userObject;
      return userWithoutPassword;
    }
}
