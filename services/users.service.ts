import { create, database, findAll } from '../db';
import { IUsers } from '../types/TUsers';

export default class Users {
  collection: string;

  constructor() {
    this.collection = 'Users';
  }

  async findAllUsers() {
    try {
      const response = await findAll(this.collection, {});
      return response;
    } catch (error) {
      return new Error(error as string);
    }
  }

  async createUser(body: IUsers) {
    try {
      await create(this.collection, body);
      return 'User was created successfully';
    } catch (error) {
      return new Error(error as string);
    }
  }
}
