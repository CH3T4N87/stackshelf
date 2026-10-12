 interface Entity {
    id: string;
    createdAt: Date
}

export const createInMemoryRepository = <T extends Entity>(store: Map<string, T>) => {
    const findAll = async (): Promise<T[]> => {
        return [...store.values()]
    }
    const findById = async (id: string): Promise<T | undefined> => {
        return store.get(id);
    }
    const create = async (input: Omit<T, keyof Entity>): Promise<T> => {
        const newEntity = { id: crypto.randomUUID(), ...input, createdAt: new Date() } as T;
        store.set(newEntity.id, newEntity);
        return newEntity;
    }
    const remove = async (id: string): Promise<boolean> => {
        return store.delete(id);
    }

    return {
        findAll,
        findById,
        create,
        remove
    }
}

export type InMemoryRepository = ReturnType<typeof createInMemoryRepository>;