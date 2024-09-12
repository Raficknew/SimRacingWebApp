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

type InviteBarProps = {
  raceId: string;
  CreateInvite: (userEmail: string, raceID: string) => Promise<void>;
};

const InviteBar: React.FC<InviteBarProps> = ({ CreateInvite, raceId }) => {
  function onSubmit(values: z.infer<typeof formSchema>) {
    CreateInvite(values.userEmail, raceId);
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
                <Input placeholder="invite" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default InviteBar;
