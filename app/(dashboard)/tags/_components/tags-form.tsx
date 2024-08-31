"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

import axios from "axios";

interface TagsFormProps {
  initialData: {
    name: string;
  };
}

const TagsForm = ({ initialData }: TagsFormProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
    shouldFocusError: true,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.post("/api/tags", values);
      toast.success("Tag created successfully");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 mt-2 bg-white dark:bg-slate-800 rounded-md flex justify-between items-center">
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex gap-x-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 lg:w-2/5">
                  <FormControl>
                    <Input
                      className="dark:bg-slate-700"
                      placeholder="Tag name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading && (
                <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
              )}
              {/* {isEdit ? "Update" : "Save"} */}Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TagsForm;
