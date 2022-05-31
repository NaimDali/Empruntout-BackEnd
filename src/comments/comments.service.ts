import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Comment)
    private usersRepository: Repository<User>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const comment = this.commentsRepository.create(createCommentDto);
    return await this.commentsRepository.save(comment);
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }
  async findByProfile(profileId: number) {
    if (profileId) {
      const user = await this.usersRepository.findOne(profileId);
      return await this.commentsRepository.find({ profile: user });
    } else
      throw new BadRequestException(
        'Veuillez préciser les commentaires de qui récupérer.',
      );
  }
  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    return await this.commentsRepository.delete(id);
  }
}
