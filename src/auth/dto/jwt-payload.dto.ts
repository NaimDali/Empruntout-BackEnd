import { UserRoleEnum } from '../../users/entities/user.entity';

export interface JwtPayloadDto {
  username: string;
  role: UserRoleEnum;
  email: string;
}
