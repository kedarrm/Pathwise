require('dotenv/config')

module.exports = {
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Use process.env directly in JS projects to avoid PrismaConfigEnvError
    url: process.env.DATABASE_URL || '',
  },
}
