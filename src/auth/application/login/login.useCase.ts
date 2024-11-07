import { Injectable } from '@nestjs/common';
import { AuthRepositoryImp } from 'src/auth/domain/repositories/auth.repository';
import { LoginRequestDto, LoginResponseDto } from './login.dto';
import { JSONWebTokenUtils } from 'src/auth/infrastructure/external/jsonWebtoken';
import { BcryptUtils } from 'src/auth/infrastructure/external/bcrypt';
import { User } from 'src/auth/domain/models/user.entity';
import { WrongPasswordException } from 'src/auth/exception/wrongPassword.exception';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: AuthRepositoryImp,
    private readonly bcryptUtils: BcryptUtils,
    private readonly jsonWebTokenUtils: JSONWebTokenUtils,
  ) {}

  async execute(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const calledUser = await this.userRepository.getUserByEmail(
      loginRequestDto.email,
    );
    const isValid = this.bcryptUtils.checkValidPassword(
      loginRequestDto.password,
      calledUser.password,
    );
    if (!isValid) throw new WrongPasswordException();
    const token = await this.jsonWebTokenUtils.generate({
      id: calledUser.id,
      email: calledUser.email,
    });

    const userData: Partial<User> = {
      fullName: calledUser.fullName,
    };

    const result: LoginResponseDto = {
      email: calledUser.email,
      token: token,
      userData,
    };
    return result;
  }
}
