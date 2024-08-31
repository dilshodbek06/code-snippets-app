"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import MultipleSelector from "@/components/ui/Multi-select";
import { Tag } from "@prisma/client";
import { strict } from "assert";
import axios from "axios";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SnippetsFormProps {
  initialData: {
    tags: { label: string; value: string }[];
    title: string;
    content: string;
  };
}

const SnippetsForm = ({ initialData }: SnippetsFormProps) => {
  //
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const languages = [
    {
      label: "JavaScript",
      value: "javascript",
    },
    {
      label: "Python",
      value: "python",
    },
    {
      label: "Java",
      value: "java",
    },
    {
      label: "C#",
      value: "csharp",
    },
    {
      label: "C++",
      value: "cpp",
    },
    {
      label: "Ruby",
      value: "ruby",
    },
    {
      label: "PHP",
      value: "php",
    },
    {
      label: "Swift",
      value: "swift",
    },
    {
      label: "TypeScript",
      value: "typescript",
    },
    {
      label: "Kotlin",
      value: "kotlin",
    },
    {
      label: "Go",
      value: "go",
    },
    {
      label: "Rust",
      value: "rust",
    },
    {
      label: "Dart",
      value: "dart",
    },
    {
      label: "Scala",
      value: "scala",
    },
    {
      label: "Perl",
      value: "perl",
    },
    {
      label: "Haskell",
      value: "haskell",
    },
    {
      label: "JSX",
      value: "jsx",
    },
    {
      label: "Objective-C",
      value: "objectivec",
    },
    {
      label: "Shell",
      value: "shell",
    },
    {
      label: "Sql",
      value: "sql",
    },
  ];

  const TagSchema = z.object({
    value: z.string(),
    label: z.string(),
  });

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title is required",
    }),
    content: z.string().min(5, {
      message: "Content is required",
    }),
    language: z.string().min(2, {
      message: "Language is required",
    }),
    tags: z.array(TagSchema).min(1, {
      message: "At least one tag is required.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      tags: [], // or provide an appropriate initial value
    },
    shouldFocusError: true,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.post("/api/snippets", values);
      toast.success("Snippet created");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-md p-3">
      <div>
        <Heading title={``} description="" />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8  flex justify-center"
        >
          <div className="max-w-2xl w-full">
            <div className="mt-4">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        loadingIndicator
                        options={initialData.tags}
                        placeholder="select your tags..."
                        className="dark:bg-slate-700
                         dark:placeholder-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-slate-700 dark:placeholder-white"
                        placeholder="Enter your snippet title..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Snippet code</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your code here..."
                          className="dark:bg-slate-700 dark:placeholder-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full sm:w-[220px] dark:bg-slate-700">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-slate-700">
                            {languages?.map((language) => (
                              <SelectItem
                                key={language.value}
                                value={language.value}
                              >
                                {language.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                className="ml-auto w-full sm:w-auto md:w-1/4 mt-4"
                type="submit"
                disabled={loading}
              >
                {loading && (
                  <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                )}
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SnippetsForm;
