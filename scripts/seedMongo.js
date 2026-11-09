import { connectToMongo, seedMongoDatabase, getMongoStatus } from '../server/db.js';

async function main() {
  console.log('--- Aroham Foundation: MongoDB Seeding Tool ---');
  const db = await connectToMongo();
  if (!db) {
    console.error('Failed to connect to MongoDB server. Ensure mongod is running.');
    process.exit(1);
  }

  console.log('Seeding all Aroham collections (mentors, events, mentees, applications)...');
  const result = await seedMongoDatabase(db);
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
  console.error('Fatal error during seeding:', err);
  process.exit(1);
});

