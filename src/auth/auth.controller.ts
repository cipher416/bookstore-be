import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Controller } from '@nestjs/common/decorators/core';
import { Body, Post, Res } from '@nestjs/common/decorators/http';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Post('/register')
  @ApiOperation({
    summary: 'Registers the user in the database.',
  })
  async register(@Body() userData: AuthDto) {
    await this.usersService.addUser(userData.email, userData.password);
  }
  @Post('/login')
  @ApiOperation({
    summary:
      'Verifies the user information against the database. Returns bearer token to client.',
  })
  async login(
    @Body() userData: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.validateUser(
      userData.email,
      userData.password,
    );
    if (!result) {
      throw new UnauthorizedException();
    }
    response.cookie(
      'access_token',
      this.jwtService.sign({
        email: result.Email,
        userId: result.UserId,
      }),
    );
    return {
      access_token: this.jwtService.sign({
        email: result.Email,
        userId: result.UserId,
      }),
    };
  }
}
