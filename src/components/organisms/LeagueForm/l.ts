import { z } from "zod";

export type leagueFormType = z.infer<typeof leagueFormSchema>;

export const leagueFormSchema = z.object({
  name: z.string().min(2).max(20),
  description: z.string().min(10).max(50),
});
