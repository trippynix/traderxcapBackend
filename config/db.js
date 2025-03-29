const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true, // ✅ Enable TLS
      tlsAllowInvalidCertificates: false, // ✅ Ensures valid SSL
      serverSelectionTimeoutMS: 50000, // ✅ Increases timeout to 50s
    });
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;
