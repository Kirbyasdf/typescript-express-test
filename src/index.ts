import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { loginRouter } from "./routes/loginRoutes";
const PORT = 5000;

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieSession({ keys: ["asdf"] }));
// app.use("/login", loginRouter);
// app.listen(PORT, () => console.log("GOOD 2 GO on PORT: " + PORT));

//written as a class
class Server {
  app: express.Express = express();
  constructor() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieSession({ keys: ["asdf"] }));
    this.app.use("/login", loginRouter);
  }
  start(): void {
    this.app.listen(PORT, () => console.log("GOOD 2 GO on PORT: " + PORT));
  }
}

new Server().start();
