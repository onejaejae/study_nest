import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './BoardRepository';
import { Board } from './boards.entity';
import { BoardStatus } from './boards.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getBoardId(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`can't find board with id ${id}`);
    }

    return found;
  }

  async createBoard(CreateBoardDto: CreateBoardDto): Promise<Board> {
    return await this.boardRepository.createBoard(CreateBoardDto);
  }

  async updateBoard(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardId(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }

  deleteBoard(id: number): Promise<void> {
    // 왜 await을 안써도 잘 되는지?
    return this.boardRepository.deleteBoard(id);
  }
}
