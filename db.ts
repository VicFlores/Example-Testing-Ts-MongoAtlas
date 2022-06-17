import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const url: string = process.env.MONGODB as string;
export const client = new MongoClient(url);

export const database = async () => {
  await client.connect();
  const db = client.db(process.env.DATABASE as string);
  return db;
};

export const findAll = async (collection: string, query: object) => {
  try {
    const db = await database();
    return await db.collection(collection).find(query).toArray();
  } catch (error) {
    return new Error(error as string);
  }
};

export const create = async (collection: string, data: object) => {
  try {
    const db = await database();
    return await db.collection(collection).insertOne(data);
  } catch (error) {
    return new Error(error as string);
  }
};
