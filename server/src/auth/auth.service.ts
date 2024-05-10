import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';

export interface ResponseUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    tasks: any[];
    __v: number;
  }
  
export interface RegisterResponse {
    access_token: string;
    user: ResponseUser;
}

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
      ) {}
    
      async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (user && await bcrypt.compare(pass, user.password)) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(user: LoginDto) {
        if (!user) {
          throw new BadRequestException('User data must be provided');
        }
      
        const { email, password } = user;
      
        if (!email) {
          throw new BadRequestException('Email must be provided');
        }
      
        if (!password) {
          throw new BadRequestException('Password must be provided');
        }
      
        const foundUser = await this.userService.findOne(email);
        
        if (!foundUser) {
          throw new UnauthorizedException('Invalid credentials');
        }
        if (!password || !foundUser || !foundUser.password) {
          throw new UnauthorizedException('Invalid credentials');
        }
        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        if (!passwordMatch) {
          throw new UnauthorizedException('Invalid credentials');
        }
      
        const userObject = foundUser.toObject();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = userObject;
      
        const payload = { email: foundUser.email, sub: foundUser._id };
        return {
          access_token: this.jwtService.sign(payload),
          user: userWithoutPassword,
        };
      }
    
      async register(createUserDto: CreateUserDto): Promise<any> {
        if (!createUserDto) {
          throw new BadRequestException('User data must be provided');
        }
    
        const { email, password } = createUserDto;
    
        if (!email) {
          throw new BadRequestException('Email must be provided');
        }
    
        if (!password) {
          throw new BadRequestException('Password must be provided');
        }
    
        const existingUser = await this.userService.findOne(email);
        if (existingUser) {
          throw new BadRequestException('Email already in use');
        }
    
        createUserDto.password = await bcrypt.hash(password, 10);
        const newUser = await this.userService.create(createUserDto);
    
        const userObject = newUser.toObject();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = userObject;
    
        const payload = { email: newUser.email, sub: newUser._id };
        const token = this.jwtService.sign(payload);
    
        return {
          access_token: token,
          user: userWithoutPassword,
        };
      }
}
