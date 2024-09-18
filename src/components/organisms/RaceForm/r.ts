import { Series, RaceStatus } from "@prisma/client";
import { z } from "zod";

enum messages {
  short = "Wartość jest za krótka",
  long = "Wartość jest za długa",
  date = "Nie wybrano daty",
  hour = "Nie wybrano godziny",
}

export type RaceFormType = z.infer<typeof RaceFormSchema>;

export const RaceFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: messages.short })
    .max(20, { message: messages.long }),
  description: z
    .string()
    .min(10, { message: messages.short })
    .max(100, { message: messages.long }),
  circuit: z
    .string()
    .min(2, { message: messages.short })
    .max(40, { message: messages.long }),
  series: z.nativeEnum(Series),
  raceDate: z.date({ message: messages.date }),
  raceHour: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
  status: z.nativeEnum(RaceStatus),
});
