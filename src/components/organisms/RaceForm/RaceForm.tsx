"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Series, Status } from "@prisma/client";

enum messages {
  short = "Wartość jest za krótka",
  long = "Wartość jest za długa",
  date = "Nie wybrano daty",
  hour = "Nie wybrano godziny",
}

const formSchema = z.object({
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
  raceHour: z.string({ message: messages.hour }),
  status: z.nativeEnum(Status),
});

interface RaceFormProps {
  createRace: (
    name: string,
    description: string,
    circuit: string,
    series: Series,
    raceDate: string,
    raceHour: string,
    status: Status
  ) => Promise<void>;
}

const RaceForm: React.FC<RaceFormProps> = ({ createRace }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      circuit: "",
      status: Status.before,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createRace(
      values.name.charAt(0).toUpperCase() + values.name.slice(1).toLowerCase(),
      values.description,
      values.circuit,
      values.series,
      values.raceDate.toISOString(),
      values.raceHour,
      values.status
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Race Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="circuit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Circuit</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="series"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seria wyścigowa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Series.F1}>F1</SelectItem>
                  <SelectItem value={Series.GT3}>GT3</SelectItem>
                  <SelectItem value={Series.HYPERCAR}>Hypercar</SelectItem>
                  <SelectItem value={Series.GT3HYPERCAR}>
                    GT3 + Hypercar
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="raceDate"
          render={({ field }) => (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Wybierz datę wyścigu</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      startOfDay(date) < startOfDay(new Date())
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="raceHour"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="time" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};

export default RaceForm;
