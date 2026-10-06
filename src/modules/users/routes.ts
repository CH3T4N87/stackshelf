import express from "express";
import type { Router, Request, Response, NextFunction } from "express";
import type { Member } from "./schema.js";
import { createMembersRepo } from "./repo.js";
import { createMembersService } from "./service.js";


export const createMemberRouter = (store: Map<string, Member>): Router => {
    const repo = createMembersRepo(store);
    const service = createMembersService(repo);
    const membersRouter = express.Router();

    membersRouter.get("/", (req: Request, res: Response) => {
        const members = service.getMembers();
        res.status(200).json(members);
    })

    membersRouter.get("/:id", (req: Request<{id: string}>, res: Response) => {
        const id = req.params.id;
        const member = service.getMemberById(id);
        res.status(200).json(member);
    });




    return membersRouter;
}