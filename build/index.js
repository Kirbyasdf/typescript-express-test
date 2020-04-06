"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var loginRoutes_1 = require("./routes/loginRoutes");
var PORT = 5000;
// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieSession({ keys: ["asdf"] }));
// app.use("/login", loginRouter);
// app.listen(PORT, () => console.log("GOOD 2 GO on PORT: " + PORT));
//written as a class
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(cookie_session_1.default({ keys: ["asdf"] }));
        this.app.use("/login", loginRoutes_1.loginRouter);
    }
    Server.prototype.start = function () {
        this.app.listen(PORT, function () { return console.log("GOOD 2 GO on PORT: " + PORT); });
    };
    return Server;
}());
new Server().start();
