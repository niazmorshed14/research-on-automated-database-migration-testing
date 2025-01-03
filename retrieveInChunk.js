const { MongoClient } = require('mongodb');

const url = '';

async function retrieveInChunk(chunkSize, chunkNumber) {
  const client = new MongoClient(url);

  try {
    await client.connect();

    console.log('Connected to MongoDB');

    const database = client.db(''); 
    const collection = database.collection('users'); 

    const skipCount = (chunkNumber - 1) * chunkSize;

    const users = await collection
      .find({})
      .skip(skipCount) 
      .limit(chunkSize) 
      .toArray();

    console.log(`Fetched Users (Chunk ${chunkNumber}, Users ${skipCount + 1} to ${skipCount + users.length}):`);
    users.forEach((user, index) => {
      console.log(`User ${skipCount + index + 1}:`);
      Object.entries(user).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
      console.log();
    });

    if (users.length === 0) {
      console.log(`No users found in this Chunk ${chunkNumber}.`);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {

    await client.close();
    console.log('Connection to MongoDB closed.');
  }
}

retrieveInChunk(20, 1);
