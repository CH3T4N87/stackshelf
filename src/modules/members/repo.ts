import { createInMemoryRepository } from "../../shared/repository.js";
import type { Member } from "./schema.js";

export const createMembersRepo = (store: Map<string, Member>) => {

    const genericRepo = createInMemoryRepository(store);

    const findByEmail = async (email: string): Promise<Member | undefined> => {
        const members = await genericRepo.findAll();
        const member = members.find((member) => member.email === email);
        return member;
    }


    return {
        ...genericRepo,
        findByEmail
    }
}

export type MemberRepo = ReturnType<typeof createMembersRepo>;