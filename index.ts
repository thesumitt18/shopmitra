import app from "./src/app";
import { connect } from "./src/services/database.service";
const port = process.env.PORT || 3000;

const startAuthService = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    console.error("Auth service failed to start: code 1");
    process.exit(1);
  }
};

startAuthService();
