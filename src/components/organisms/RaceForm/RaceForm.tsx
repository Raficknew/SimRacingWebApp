"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Series, RaceStatus } from "@prisma/client";
import { RaceFormSchema, RaceFormType } from "./r";

interface RaceFormProps {
  leagueId?: string | null;
  createRace: (data: RaceFormType, leagueId: string) => Promise<void>;
}

const RaceForm: React.FC<RaceFormProps> = ({ createRace, leagueId }) => {
  const form = useForm<RaceFormType>({
    resolver: zodResolver(RaceFormSchema),
    defaultValues: {
      name: "",
      description: "",
      circuit: "",
      status: RaceStatus.BEFORE,
    },
  });

  function onSubmit(values: RaceFormType) {
    (values.name =
      values.name.charAt(0).toUpperCase() + values.name.slice(1).toLowerCase()),
      createRace(values, leagueId ?? "");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nazwa wyścigu</FormLabel>
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
              <FormLabel className="text-white">Opis</FormLabel>
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
              <FormLabel className="text-white">Tor</FormLabel>
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

        <Button type="submit">Utwórz</Button>
      </form>
    </Form>
  );
};

export default RaceForm;
