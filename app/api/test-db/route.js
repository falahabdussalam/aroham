import connectToDatabase, { getMongoStatus } from '../../../lib/mongodb.js';

/**
 * Next.js App Router Route Handler: GET /api/test-db
 * Also compatible with Node.js standard Web Request/Response
 */
export async function GET(request) {
  try {
    const conn = await connectToDatabase();
    const status = await getMongoStatus();

    return Response.json({
      success: true,
      message: 'MongoDB connection test successful! Database is live and reachable.',
      database: status.database || 'aroham',
      connected: Boolean(status.connected),
      collections: status.collections || {
        mentors: 0,
        events: 0,
        mentees: 0,
        applications: 0
      },
      timestamp: new Date().toISOString()
    }, { status: 200 });
  } catch (error) {
    console.error('[API /api/test-db] Connection test failed:', error);
    return Response.json({
      success: false,
      message: 'MongoDB connection test failed',
      error: error.message,
      help: 'Please verify MONGODB_URI in your .env.local file.',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

