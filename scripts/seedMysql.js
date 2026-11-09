import { connectToMysql, seedMysqlDatabase, getMysqlStatus } from '../server/mysql.js';

async function main() {
  console.log('--- Aroham Foundation: MySQL Seeding Tool ---');
  console.log('Connecting to MySQL...');
  const pool = await connectToMysql();
  if (!pool) {
    console.error('Failed to connect to MySQL server. Please verify MySQL credentials in .env (MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE).');
    process.exit(1);
  }

  console.log('Seeding all Aroham tables (mentors, events, mentees, applications)...');
  const result = await seedMysqlDatabase(pool);
  if (result.success) {
    console.log('Seeding Succeeded! Table Counts:');
    console.table(result.counts);
    const status = await getMysqlStatus();
    console.log('MySQL Live Status:', status);
    process.exit(0);
  } else {
    console.error('Seeding Failed:', result.error);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error during MySQL seeding:', err);
  process.exit(1);
});

