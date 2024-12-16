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
  userEmail: z.string().min(3).max(50),
  userName: z.string().min(3).max(50).optional(),
});

type InviteToRaceBarProps = {
  id: string;
  createInviteToRace: (
    userEmail: string,
    id: string,
    userName?: string
  ) => Promise<void>;
};

const InviteToRaceBar: React.FC<InviteToRaceBarProps> = ({
  createInviteToRace,
  id,
}) => {
  function onSubmit(values: z.infer<typeof formSchema>) {
    createInviteToRace(values.userEmail, id, values.userName);
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
            <FormItem>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-custom-gradient" type="submit">
          Zaproś
        </Button>
      </form>
    </Form>
  );
};

export default InviteToRaceBar;
