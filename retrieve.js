const {MongoClient} = require('mongodb');

const url = '';

async function retrieveUsers() {
  const client = new MongoClient(url);

  try {
    await client.connect(); // Connecting to the MongoDB server

    console.log('Successfully Connected to MongoDB');

    const database = client.db('userdb'); // Selecting the particular database and collection
    const collection = database.collection('users');

    const users = await collection.find({}).toArray(); // Fetching all the fields with values from the users collection

    console.log('Detailed Information of The Users: '); // Printing user information to the console
    users.forEach(user => {
      console.log(user);
    });
    
    const totalCount = await collection.countDocuments({});
    console.log(`Total number of users: ${totalCount}`);

  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  } finally {
    
    await client.close();
    console.log('Connection to MongoDB is closed.');
  }
}

retrieveUsers();