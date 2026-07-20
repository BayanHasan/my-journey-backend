const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://postgres.cuiqmehpumlqsctbaftw:Bayan28599@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
  ssl: { rejectUnauthorized: false }
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('✅ Connected to Supabase database successfully!');
  }
});

module.exports = pool;