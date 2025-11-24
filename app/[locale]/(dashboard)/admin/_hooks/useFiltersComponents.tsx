import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import TextInputComponent, {
  IProps as TextInputComponentProps,
} from "../components/form/TextInputComponent";
import { JSX } from "react";
import DatePickerComponent, {
  IProps as DatePickerProps,
} from "../components/form/date-pickers/DatePickerComponent";

type FilterType = "search" | "dateFrom" | "dateTo" | "status";

type FilterConfigItem = {
  type: FilterType;
  name: string;
  label: string;
  placeholder?: string;
  props?: any;
};

export type FilterConfig = FilterConfigItem[];

export interface UseFiltersReturn<T extends FieldValues = FieldValues> {
  filterComponents: JSX.Element[];
  formMethods: UseFormReturn<T>;
  onSubmit: (callback: (data: T) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onClear: () => void;
}

export const useFilters = <T extends FieldValues = FieldValues>(
  filterConfig: FilterConfig,
  defaultValues?: Partial<T>
): UseFiltersReturn<T> => {
  const formMethods = useForm<T>({
    defaultValues: defaultValues as any,
  });

  const { control, handleSubmit, reset } = formMethods;

  const componentMap: Record<FilterType, (config: FilterConfigItem) => JSX.Element> = {
    search: (config) => (
      <TextInputComponent
        key={config.name}
        control={control}
        name={config.name as any}
        label={config.label}
        placeholder={config.placeholder}
        {...config.props}
      />
    ),

    dateFrom: (config) => (
      <DatePickerComponent
        key={config.name}
        control={control}
        name={config.name as any}
        label={config.label}
        {...config.props}
      />
    ),

    dateTo: (config) => (
      <DatePickerComponent
        key={config.name}
        control={control}
        name={config.name as any}
        label={config.label}
        {...config.props}
      />
    ),

    status: (config) => (
      <TextInputComponent
        key={config.name}
        control={control}
        name={config.name as any}
        label={config.label}
        placeholder={config.placeholder}
        {...config.props}
      />
    ),
  };

  const filterComponents = filterConfig.map((config) => 
    componentMap[config.type]?.(config)
  ).filter(Boolean) as JSX.Element[];

  const onSubmit = (callback: (data: T) => void) => handleSubmit(callback);
  const onClear = () => reset(defaultValues as any);

  return {
    filterComponents,
    formMethods,
    onSubmit,
    onClear,
  };
};
