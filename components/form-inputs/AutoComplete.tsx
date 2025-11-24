import * as React from "react";
import { useState, useEffect, forwardRef, useRef } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { matchSorter } from "match-sorter";
import { Check, ChevronDown, X, Loader2 } from "lucide-react";
import { FixedSizeList } from "react-window";

import { cn } from "../../lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ITEM_HEIGHT = 40; // Height of each option
const MAX_VISIBLE_ITEMS = 8; // Maximum number of visible items

const VirtualizedList = forwardRef<HTMLDivElement, any>(
  function VirtualizedList(props, ref) {
    const { children, ...other } = props;
    const items = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        {...other}
        style={{
          overflow: "hidden",
        }}
      >
        <FixedSizeList
          height={Math.min(
            ITEM_HEIGHT * MAX_VISIBLE_ITEMS,
            items?.length * ITEM_HEIGHT
          )}
          itemCount={items?.length}
          itemSize={ITEM_HEIGHT}
          width="100%"
        >
          {({ index, style }) => <div style={style}>{items[index]}</div>}
        </FixedSizeList>
      </div>
    );
  }
);

interface AutocompleteBaseProps<
  T extends FieldValues,
  Option extends Record<string, any>
> {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  getOptionLabel?: (option: Option) => string;
  getOptionKey?: (option: Option) => string;
  multiple?: boolean;
  loading?: boolean;
  valueKey?: string;
  rules?: any;
  onChangeFn?: (value: Option | Option[] | null) => void;
  selectFirst?: boolean;
  isOptionEqualToValue?: (option: Option, value: Option) => boolean;
  disableClearable?: boolean;
  variant?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
}

interface AutocompleteFormProps {
  label?: string;
  description?: string;
  withForm?: boolean;
}

type AutocompleteProps<
  T extends FieldValues,
  Option extends Record<string, any>
> = AutocompleteBaseProps<T, Option> & AutocompleteFormProps;

function AutocompleteBase<
  T extends FieldValues,
  Option extends Record<string, any>
>({
  name,
  control,
  options = [],
  getOptionLabel,
  getOptionKey,
  valueKey = "id",
  multiple = false,
  loading = false,
  placeholder = "Select…",
  rules,
  onChangeFn,
  selectFirst = false,
  isOptionEqualToValue,
  disableClearable = false,
  className,
  id,
  disabled,
  required,
  autoComplete,
  autoFocus,
}: AutocompleteBaseProps<T, Option>) {
  const { field } = useController({ name, control, rules });
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Define default getters if not provided
  const getLabel =
    getOptionLabel || ((option: Option) => option?.name || String(option));
  const getKey =
    getOptionKey ||
    ((option: Option) => String(option[valueKey]) || String(option));

  // Default equality check
  const checkOptionEquality =
    isOptionEqualToValue ||
    ((option: Option, value: Option) => option[valueKey] === value[valueKey]);

  const filteredOptions =
    query === ""
      ? options
      : matchSorter(options, query, {
          keys: [(option) => getLabel(option)],
          baseSort: () => 0,
        });

  const handleSelect = (option: Option) => {
    if (multiple) {
      const selectedOptions = field.value || [];
      const exists = selectedOptions.some((item: Option) =>
        checkOptionEquality(item, option)
      );
      const newValue = exists
        ? selectedOptions.filter(
            (item: Option) => !checkOptionEquality(item, option)
          )
        : [...selectedOptions, option];
      field.onChange(newValue);

      // Keep focus on input after selection in multiple mode
      setTimeout(() => {
        inputRef.current?.focus();
        setQuery("");
      }, 0);

      if (onChangeFn) {
        onChangeFn(newValue);
      }
    } else {
      field.onChange(option);
      setOpen(false);
      setQuery("");

      if (onChangeFn) {
        onChangeFn(option);
      }
    }
  };

  const handleRemove = (option: Option) => {
    if (multiple) {
      const selectedOptions = field.value || [];
      const newValue = selectedOptions.filter(
        (item: Option) => !checkOptionEquality(item, option)
      );
      field.onChange(newValue);

      if (onChangeFn) {
        onChangeFn(newValue);
      }
    }
  };

  const handleClear = () => {
    const newValue = multiple ? [] : null;
    field.onChange(newValue);
    setQuery("");

    if (onChangeFn) {
      onChangeFn(newValue);
    }
  };

  const isSelected = (option: Option) => {
    if (!field.value) return false;

    if (multiple) {
      return field.value.some((item: Option) =>
        checkOptionEquality(item, option)
      );
    } else {
      return checkOptionEquality(field.value, option);
    }
  };

  // Handle select first option if enabled
  useEffect(() => {
    if (selectFirst && options?.length > 0 && !field.value) {
      const firstOption = options[0];
      field.onChange(firstOption);

      if (onChangeFn) {
        onChangeFn(firstOption);
      }
    }
  }, [selectFirst, options, field, onChangeFn]);

  // Display text for the input
  const getDisplayValue = () => {
    if (!field.value) return "";

    if (multiple) {
      return ""; // For multiple selection, we show chips inside the input
    } else {
      return getLabel(field.value);
    }
  };

  // Reset query when dropdown closes
  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  return (
    <div className={cn("w-full", className)}>
      <Popover
        open={open}
        onOpenChange={(isOpen) => {
          // Only allow external close events, not open events
          if (!isOpen) {
            setOpen(false);
          }
        }}
      >
        <PopoverTrigger asChild>
          <div
            className="relative w-full border rounded-md flex items-center flex-wrap p-1 min-h-10 bg-background cursor-text"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
              // Focus the input when clicking anywhere in the container
              inputRef.current?.focus();
            }}
          >
            {multiple &&
            field.value &&
            Array.isArray(field.value) &&
            field.value.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1 w-full pr-16">
                {field.value.map((option: Option) => (
                  <div
                    key={getKey(option)}
                    className="flex items-center bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-sm"
                  >
                    <span className="mr-1 truncate max-w-[150px]">
                      {getLabel(option)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(option);
                      }}
                      className="text-secondary-foreground/70 hover:text-secondary-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <input
                  ref={inputRef}
                  className="flex-1 min-w-[60px] bg-transparent border-0 outline-none h-8 p-1 text-sm"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                  }}
                  id={id}
                  disabled={disabled || loading}
                  required={required}
                  autoComplete={autoComplete}
                  autoFocus={autoFocus}
                  placeholder={field.value.length > 0 ? "" : placeholder}
                  name={name}
                />
              </div>
            ) : (
              <input
                ref={inputRef}
                className="flex-1 bg-transparent border-0 outline-none h-8 p-1 text-sm"
                value={open ? query : getDisplayValue()}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
                id={id}
                disabled={disabled || loading}
                required={required}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                placeholder={placeholder}
                name={name}
              />
            )}
            <div className="flex items-center self-stretch ml-auto absolute right-1">
              {field.value && !disableClearable && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((prev) => !prev);
                }}
                type="button"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
          sideOffset={4}
        >
          <Command>
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder={placeholder}
              onFocus={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="border-none focus:ring-0"
            />
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              <CommandList className="max-h-[320px] overflow-hidden">
                <VirtualizedList>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={getKey(option)}
                      onSelect={() => handleSelect(option)}
                      className={cn(
                        "flex items-center justify-between",
                        isSelected(option) && "font-semibold"
                      )}
                      value={getLabel(option)}
                    >
                      <span>{getLabel(option)}</span>
                      {isSelected(option) && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </CommandItem>
                  ))}
                </VirtualizedList>
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function Autocomplete<
  T extends FieldValues,
  Option extends Record<string, any>
>({
  label,
  description,
  withForm = true,
  ...props
}: AutocompleteProps<T, Option>) {
  // If withForm is false, just render the base component
  if (!withForm) {
    return <AutocompleteBase {...props} />;
  }

  // Otherwise, wrap it in form components
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <AutocompleteBase {...props} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
