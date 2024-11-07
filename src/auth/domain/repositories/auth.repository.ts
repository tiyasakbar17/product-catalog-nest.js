import { User } from '../models/user.entity';
import { NewUserParams } from 'src/auth/shared/createNewUser';
import { RegistrationFailedException } from 'src/auth/exception/registrationFailed.exception';
import { AccountNotFoundFailedException } from 'src/auth/exception/accountNotFound.exception';
import { InjectModel } from '@nestjs/sequelize';

interface AuthRepository {
  getUserByEmail(key: string): Promise<User>;
  create(params: NewUserParams): Promise<User>;
}

export class AuthRepositoryImp implements AuthRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  // Private
  async #getUserByEmail(email: string) {
    const result = await this.userModel.findOne({ where: { email } });
    return result;
  }

  //   Public
  async getUserByEmail(email: string) {
    // Check data availibility
    const isRegistered = await this.#getUserByEmail(email);
    if (!isRegistered) {
      throw new AccountNotFoundFailedException();
    }

    const result = await this.userModel.findOne({ where: { email } });
    return result;
  }

  async create(params: NewUserParams) {
    // Check if the email is registered
    const isRegistered = await this.#getUserByEmail(params.email);
    if (isRegistered) {
      throw new RegistrationFailedException();
    }

    const newUserData: Partial<User> = {
      fullName: params.fullName,
      email: params.email,
      password: params.password,
    };
    const newUser = await this.userModel.create(newUserData);

    return newUser;
  }
}
