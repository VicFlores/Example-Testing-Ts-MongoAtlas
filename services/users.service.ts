import { create, findAll, findOne, remove, update } from '../db';
import { IUsers } from '../types/TUsers';
import { httpException } from '../utils/httpException';

export default class Users {
  collection: string;

  constructor() {
    this.collection = 'Users';
  }

  async findAllUsers() {
    const response = await findAll(this.collection, {});
    return response;
  }

  async findOneUser(id: string) {
    try {
      const response = await findOne(this.collection, id);

      if (!response) {
        throw new httpException(404, 'User not found');
      } else if (response?.message) {
        throw new httpException(500, response?.message);
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createUser(body: IUsers) {
    await create(this.collection, body);
    return 'User was created successfully';
  }

  async updateUser(id: string, body: IUsers) {
    await this.findOneUser(id);
    await update(this.collection, id, body);
    return 'User was updated successfully';
  }

  async removeUser(id: string) {
    try {
      await this.findOneUser(id);
      await remove(this.collection, id);
      return 'User was removed successfully';
    } catch (error) {
      throw error;
    }
  }
}
