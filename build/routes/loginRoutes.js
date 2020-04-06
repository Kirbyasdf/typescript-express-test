"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var requireAuth = function (req, res, next) {
    if (req.session && req.session.loggIn) {
        next();
        return;
    }
    res.status(403).send("You must be logged in to access this route");
};
var loginRouter = express_1.Router();
exports.loginRouter = loginRouter;
loginRouter.get("/", function (req, res) {
    res.send("\n    <form method=\"POST\">\n      <div>\n        <label>Email</label>\n        <input name=\"email\" type=\"email\" />\n      </div>\n      <div>\n        <label>Password</label>\n        <input name=\"password\" type=\"password\" />\n      </div>\n      <button> SUBMIT </button>\n    </form>\n    ");
});
loginRouter.post("/", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === "test@case" && password === "123") {
        req.session = { loggIn: true };
        res.redirect("/login/check");
    }
    else {
        res.status(422).send("\n      <h1>Invalid Email or Pass</h1>\n      <a href=\"/login\">Try Again </a>\n      ");
    }
});
loginRouter.get("/check", function (req, res) {
    if (req.session && req.session.loggIn) {
        res.send("\n      <h1>You are Logged in </h1>\n      <a href=\"/login/logout\">Logout </a>\n      ");
    }
    else {
        res.send("\n      <h1>You are NOT Logged in </h1>\n      <a href=\"/login\">Login </a>\n      ");
    }
});
loginRouter.get("/logout", function (req, res) {
    req.session = undefined;
    res.redirect("/login");
});
loginRouter.get("/protected", requireAuth, function (req, res) {
    res.send("You are in a protected route");
});
