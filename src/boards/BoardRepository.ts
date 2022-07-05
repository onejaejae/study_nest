import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './boards.entity';
import { BoardStatus } from './boards.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(CreateBoardDto: CreateBoardDto): Promise<Board> {
    const { description, title } = CreateBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find board with ${id}`);
    }
  }
}
