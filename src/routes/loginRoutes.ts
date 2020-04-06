import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.loggIn) {
    next();
    return;
  }
  res.status(403).send("You must be logged in to access this route");
};

const loginRouter = Router();

loginRouter.get("/", (req: Request, res: Response) => {
  res.send(
    `
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" type="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button> SUBMIT </button>
    </form>
    `
  );
});

loginRouter.post("/", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === "test@case" && password === "123") {
    req.session = { loggIn: true };
    res.redirect("/login/check");
  } else {
    res.status(422).send(`
      <h1>Invalid Email or Pass</h1>
      <a href="/login">Try Again </a>
      `);
  }
});

loginRouter.get("/check", (req: Request, res: Response) => {
  if (req.session && req.session.loggIn) {
    res.send(`
      <h1>You are Logged in </h1>
      <a href="/login/logout">Logout </a>
      `);
  } else {
    res.send(`
      <h1>You are NOT Logged in </h1>
      <a href="/login">Login </a>
      `);
  }
});

loginRouter.get("/logout", (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect("/login");
});

loginRouter.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send("You are in a protected route");
});

export { loginRouter };
