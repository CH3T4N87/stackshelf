import { createAppError } from "../../errors/app-error.js";
import type { MemberRepo } from "./repo.js";
import type { Member, NewMember } from "./schema.js";

export const createMembersService = (repo: MemberRepo) => {
    const getMembers = async (): Promise<Member[]> => {
        return await repo.findAll();
    }

    const getMemberById = async (id: string): Promise<Member> => {
        const member = await repo.findById(id);
        if (!member) throw createAppError(404, "member not found");
        return member;
    }

    const createMember = async (input: NewMember): Promise<Member> => {
        return await repo.create(input);
    }

    const removeMember = async (id: string): Promise<void> => {
        const isDeleted = await repo.remove(id);
        if (!isDeleted) throw createAppError(404, "member not found");
    }

    return {
        getMembers,
        getMemberById,
        createMember,
        removeMember
    }
}

export type MemberService = ReturnType<typeof createMembersService>;