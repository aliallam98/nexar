import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Search, X } from "lucide-react";

// Define the form schema using Zod
const searchFormSchema = z.object({
  searchTerm: z.string().min(1, "Please enter a search term"),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

interface SearchFormProps {
  initialSearchTerm?: string;
  className?: string;
  placeholder?: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  initialSearchTerm = "",
  className = "",
  placeholder = "Search...",
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Initialize the form with React Hook Form
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchTerm: initialSearchTerm,
    },
  });

  // Handle form submission
  const onSubmit = (values: SearchFormValues) => {
    // Create a URL with the search parameter
    const searchParams = new URLSearchParams();
    if (values.searchTerm) {
      searchParams.set("s", values.searchTerm);
    }

    // Navigate to the current path with the search parameter
    router.push(`${pathname}?${searchParams.toString()}`);
  };

  // Clear search input
  const handleClearSearch = () => {
    form.reset({ searchTerm: "" });
    router.push(pathname);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-2 w-full ${className} shadow-md rounded-md bg-card border border-border/50 p-1`}
      >
        <FormField
          control={form.control}
          name="searchTerm"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    {...field}
                    placeholder={placeholder}
                    className="pr-20 border-0 shadow-none focus-visible:ring-0"
                    aria-label="Search"
                  />
                  <div className="absolute right-0 top-0 h-full flex items-center">
                    {field.value && (
                      <Button
                        size="sm"
                        variant="ghost"
                        type="button"
                        onClick={handleClearSearch}
                        className="px-2 h-full"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-full px-3"
                      type="submit"
                      aria-label="Submit search"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchForm;
