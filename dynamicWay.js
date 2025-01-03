const {MongoClient} = require('mongodb');
const url = 'enter db connection string'; 

async function dynamicRetrieve() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('enter database name');
    const collection = database.collection('enter collection name');

    const users = await collection.find({}).toArray();

    users.forEach((user, indexing) => {
      console.log();
      console.log(`User Number ${indexing + 1}:`);
      Object.entries(user).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    });

    const totalCount = await collection.countDocuments({});
    console.log(`Total number of users: ${totalCount}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    
    await client.close();
    console.log('Connection to MongoDB closed.');
  }
}

dynamicRetrieve();
