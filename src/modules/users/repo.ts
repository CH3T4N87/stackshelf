import type { Member, NewMember } from "./schema.js";

export const createMembersRepo = (store: Map<string, Member>) => {
    const findAll = async (): Promise<Member[]> => {
        return [...store.values()];
    }
    const findById = async (id: string): Promise<Member | undefined> => {
        return store.get(id);
    }
    const create = async (input: NewMember): Promise<Member> => {
        const newMember: Member = {
            id: crypto.randomUUID(),
            name: input.name,
            email: input.email,
            createdAt: new Date()
        }
        store.set(newMember.id, newMember);
        return newMember;
    }
    const remove = async(id: string): Promise<boolean> => {
        return store.delete(id);
    }

    return {
        findById,
        findAll,
        create,
        remove
    }
}

export type MemberRepo = ReturnType<typeof createMembersRepo>;