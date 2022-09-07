import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder()
      .select("games")
      .from(Game, 'games')
      .where("games.title ilike :title", { title: `%${param}%`})
      .getMany()
      // Complete usando query builder ok
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('SELECT count(id) FROM games'); // Complete usando raw query OK
  }

  async findUsersByGameId(id: string): Promise<User[] | any> {
    return this.repository
      .createQueryBuilder().
      relation('users')
      .of(id)
      .loadMany()

      // Complete usando query builder
  }
}
