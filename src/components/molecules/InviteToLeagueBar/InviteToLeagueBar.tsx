"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  userEmail: z.string().min(2).max(50),
});

type InviteToLeagueBarProps = {
  id: string;
  createInvite: (userEmail: string, id: string) => Promise<void>;
};

const InviteToLeagueBar: React.FC<InviteToLeagueBarProps> = ({
  createInvite,
  id,
}) => {
  function onSubmit(values: z.infer<typeof formSchema>) {
    createInvite(values.userEmail, id);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <FormField
          control={form.control}
          name="userEmail"
          render={({ field }) => (
            <FormItem className="w-3/4">
              <FormControl>
                <Input placeholder="Zaproś" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-1/4 bg-custom-gradient" type="submit">
          Wyślij
        </Button>
      </form>
    </Form>
  );
};

export default InviteToLeagueBar;
