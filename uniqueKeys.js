import { MongoClient } from 'mongodb';

const url = '';

async function findUniqueKeys() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('');
    const collection = database.collection('');

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
