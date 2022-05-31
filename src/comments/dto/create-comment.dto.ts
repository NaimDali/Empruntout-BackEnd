import { User } from 'src/users/entities/user.entity';

export class CreateCommentDto {
  writer: User;
  profile: User;
  content: string;
}
