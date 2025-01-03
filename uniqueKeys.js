import { MongoClient } from 'mongodb';
import logger from './logger.js'

const url = 'enter db connection string';

async function findUniqueKeys() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    logger.info("Connection Successfully Made")

    const database = client.db('enter database name');
    const collection = database.collection('enter collection name');
    logger.info("")

    const uniqueKeys = new Set();
    const users = await collection.find({}).toArray();

    users.forEach((user) => {
      Object.keys(user).forEach((key) => {
        uniqueKeys.add(key);
      });
    });

    const uniqueKeysArray = Array.from(uniqueKeys);

    console.log();
    console.log('The Unique Keys Are: ', uniqueKeysArray);
    console.log('The Number of Total Unique Keys:', uniqueKeysArray.length);
    logger.warn("Warning! Unique Keys are revealed!");
    

  } 
  catch (error) {
    console.error('Error connecting to MongoDB:', error);
    
    
  } 
  finally {
    await client.close();
    console.log('Connection to MongoDB closed.');
  }
}

findUniqueKeys();
