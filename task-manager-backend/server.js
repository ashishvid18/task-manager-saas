require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");

const PORT = process.env.PORT || 5000;

// DB + Server start
sequelize.sync().then(() => {
  console.log("Database connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
