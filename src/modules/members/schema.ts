import z from "zod";

export const ZMember = z.object({
    id: z.uuid(),
    name: z.string().trim().nonempty(),
    email: z.email(),
    createdAt: z.date()
})
export type Member = z.infer<typeof ZMember>;

export const ZNewMember = ZMember.pick({
    name: true,
    email: true
});
export type NewMember = z.infer<typeof ZNewMember>;