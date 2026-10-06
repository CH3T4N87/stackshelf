import { createAppError } from "../../errors/app-error.js";
import type { MemberRepo } from "./repo.js";
import type { NewMember } from "./schema.js";

export const createMembersService = (repo: MemberRepo) => {
    const getMembers  = () => {
        return repo.findAll();
    }
    
    const getMemberById = (id: string) => {
        const member = repo.findById(id);
        if(!member) throw createAppError(404, "member not found");
        return member;
    }

    const createMember = (input: NewMember) => {
        return repo.create(input);
    }

    const removeMember = (id: string) => {
        const isDeleted = repo.remove(id);
        if(!isDeleted) throw createAppError(404, "member not found");
        return isDeleted;
    }

    return {
        getMembers,
        getMemberById,
        createMember,
        removeMember
    }
}

export type MemberService = ReturnType<typeof createMembersService>;