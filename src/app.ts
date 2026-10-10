import express, { type Request, type Response } from "express";
import { requestLogger } from "./middlewares/requestLogger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { requireHeader } from "./middlewares/requireHeader.js";
import type { Member } from "./modules/members/schema.js";
import { createMembersRouter } from "./modules/members/routes.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

//routes

app.get("/health",requireHeader("x-api-key"), (req: Request, res: Response) => {
    res.json({
        "status": "ok",
        "project": "stackshelf"
    })
});

const membersStore = new Map<string, Member>();
app.use("/members", createMembersRouter(membersStore));

app.use(notFound);
app.use(errorHandler);

export default app;