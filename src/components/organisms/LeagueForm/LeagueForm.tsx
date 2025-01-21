"use client";
import { z } from "zod";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leagueFormSchema, leagueFormType } from "./l";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface LeagueFormProps {
  createLeague: (data: leagueFormType) => Promise<{ error: string } | void>;
}

const LeagueForm: React.FC<LeagueFormProps> = ({ createLeague }) => {
  const form = useForm<z.infer<typeof leagueFormSchema>>({
    resolver: zodResolver(leagueFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof leagueFormSchema>) {
    const leaguePromise = createLeague(values);

    toast.promise(leaguePromise, {
      loading: "Tworzenie ligi...",
      success: "Liga utworzona",
      error: "Coś poszło nie tak",
    });

    const result = await leaguePromise;
    result?.error && toast.error(result.error);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwa</FormLabel>
                <FormControl>
                  <Input placeholder="Nazwa" {...field} />
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
                  <Textarea placeholder="Opis" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Utwórz</Button>
        </form>
      </Form>
    </div>
  );
};

export default LeagueForm;
