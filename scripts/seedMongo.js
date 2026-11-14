import { connectToMongoDB, seedMongoDatabase, getMongoStatus } from '../server/mongodb.js';

async function main() {
  console.log('--- Aroham Foundation: MongoDB Seeding Tool ---');
  console.log('Connecting to MongoDB...');
  const conn = await connectToMongoDB();
  if (!conn) {
    console.error('Failed to connect to MongoDB server. Please verify MONGODB_URI in .env (e.g., MONGODB_URI=mongodb://127.0.0.1:27017/aroham).');
    process.exit(1);
  }

  console.log('Seeding all Aroham collections (mentors, events, mentees, applications)...');
  const result = await seedMongoDatabase();
  if (result.success) {
    console.log('Seeding Succeeded! Collection Counts:');
    console.table(result.counts);
    const status = await getMongoStatus();
    console.log('MongoDB Live Status:', status);
    process.exit(0);
  } else {
    console.error('Seeding Failed:', result.error);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error during MongoDB seeding:', err);
  process.exit(1);
});

