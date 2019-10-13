module.exports = {
  dbHost: process.env.NODE_ENV === "production"
  ? ""
  : "mongodb://localhost:27017",
  dbName: process.env.NODE_ENV === "test" ? "frases-test" : "frases",
  dbDebug: true,
}
