import { MongoClient } from "mongodb";

const DATABASE_NAME = 'gmate_standalone'
const uri = process.env.MONGO_URI || ''
const mongoOptions = {}

const client = new MongoClient(uri, mongoOptions)

export default async function connect() {
  if (client) await client.connect()
  const db = client.db(DATABASE_NAME)
  return { client, db }
}

