import { createInMemoryRepository } from "../../shared/repository.js";
import type { Member, NewMember } from "./schema.js";

export const createMembersRepo = (store: Map<string, Member>) => {

    const genericRepo = createInMemoryRepository(store);

    const findAll = async (): Promise<Member[]> => genericRepo.findAll();

    const findById = async (id: string): Promise<Member | undefined> => genericRepo.findById(id);

    const findByEmail = async (email: string): Promise<Member | undefined> => {
        const members = await genericRepo.findAll();
        const member = members.find((member) => member.email === email);
        return member;
    }

    const create = async (input: NewMember): Promise<Member> => genericRepo.create(input);

    const remove = async(id: string): Promise<boolean> => genericRepo.remove(id);

    return {
        findById,
        findAll,
        findByEmail,
        create,
        remove,

    }
}

export type MemberRepo = ReturnType<typeof createMembersRepo>;