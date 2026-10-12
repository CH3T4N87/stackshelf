import express from "express";
import type { Router, Request, Response, NextFunction } from "express";
import type { Member } from "./schema.js";
import { createMembersRepo } from "./repo.js";
import { createMembersService, type MemberService } from "./service.js";
import { createAppError } from "../../errors/app-error.js";


export const createMembersRouter = (service: MemberService): Router => {
    const membersRouter = express.Router();

    membersRouter.get("/", async (req: Request, res: Response) => {
        const members = await service.getMembers();
        res.status(200).json(members);
    })

    membersRouter.get("/:id", async (req: Request<{id: string}>, res: Response, next:NextFunction) => {
        const id = req.params.id;
        if(!id) return next(createAppError(400, "id param is required"))
        const member = await service.getMemberById(id);
        res.status(200).json(member);
    });

    membersRouter.post("/", async (req: Request, res:Response, next:NextFunction) => {
        const { name, email } = req.body ?? {};
        if(!name || !email){
            return next(createAppError(400, "name and email are required"));
        }
        const member = await service.createMember({ name, email });
        res.status(201).json(member);
    });

    membersRouter.delete("/:id", async (req: Request<{ id: string }>, res:Response, next:NextFunction) => {
        const { id } = req.params;
        if(!id){
            return next(createAppError(400, "id param is required"))
        }
        await service.removeMember(id);
        res.status(200).json({
            message: "member has been deleted successfully"
        })

    })




    return membersRouter;
}

