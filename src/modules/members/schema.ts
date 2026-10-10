export interface Member {
    id: string;
    name: string;
    email: string;
    createdAt: Date
}

export type NewMember = Omit<Member, "id" | "createdAt">;