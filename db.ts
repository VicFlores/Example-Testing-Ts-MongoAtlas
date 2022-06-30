import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { httpException } from './utils/httpException';

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

export const findOne = async (collection: string, id: string) => {
  try {
    const db = await database();
    return await db.collection(collection).findOne({ _id: new ObjectId(id) });
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

export const update = async (collection: string, id: string, data: object) => {
  try {
    const db = await database();
    return await db
      .collection(collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: data }, { upsert: true });
  } catch (error) {
    return new Error(error as string);
  }
};

export const remove = async (collection: string, id: string) => {
  try {
    const db = await database();
    return await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    return new Error(error as string);
  }
};
