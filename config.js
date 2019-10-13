module.exports = {
  dbHost: process.env.NODE_ENV === "production"
  ? `mongodb+srv://frases-node:${process.env.DB_PASSWORD}@cluster0-rknza.mongodb.net`
  : "mongodb://localhost:27017",
  dbName: process.env.NODE_ENV === "test" ? "frases-test" : "frases",
  dbDebug: true,
}
