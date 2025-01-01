import { MongoClient } from 'mongodb';

const url = '';
async function dynamicChunks(chunkSize) {
  const client = new MongoClient(url); 

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('userdb');
    const collection = database.collection('users');

    let skipCount = 0;
    let hasMoreData = true;

    while (hasMoreData) {
      const users = await collection
        .find({})
        .skip(skipCount) 
        .limit(chunkSize) 
        .toArray();

      console.log(`Retrieved Users (Users ${skipCount + 1} to ${skipCount + users.length}):`);
      users.forEach((user, index) => {
        console.log(`User Number ${skipCount + index + 1}:`);
        Object.entries(user).forEach(([key, value]) => {
          console.log(`${key}: ${value}`);
        });
        console.log();
        console.log();
      });

      skipCount += users.length;

      if (users.length < chunkSize) {
        hasMoreData = false;
        console.log('All users have been retrieved.');
      }
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    
    await client.close();
    console.log('Connection to MongoDB closed.');
  }
}

dynamicChunks(10);
