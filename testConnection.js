const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ngcobosibani170_db_user:qKh91LhPIRoUq0xK@salon-web.pt4tced.mongodb.net/salonDB?retryWrites=true&w=majority&appName=salon-web")
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ Connection error:", err));
