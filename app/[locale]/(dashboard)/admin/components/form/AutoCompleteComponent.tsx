import { ArrowDropDown } from "@mui/icons-material";
import {
  Autocomplete,
  type AutocompleteProps,
  CircularProgress,
  TextField,
} from "@mui/material";
import { matchSorter } from "match-sorter";
import React, { useEffect, useRef, useState } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FixedSizeList } from "react-window";

const VirtualizedListbox = React.forwardRef<HTMLDivElement, any>(
  function VirtualizedListbox(props, ref) {
    const { children, ...other } = props;
    const items = React.Children.toArray(children);
    const ITEM_HEIGHT = 40; // Height of each option
    const MAX_VISIBLE_ITEMS = 8; // Maximum number of visible items

    const dir = document?.documentElement?.getAttribute("dir") || "ltr";

    return (
      <div
        ref={ref}
        {...other}
        style={{
          overflow: "hidden", // Prevent the outer container from scrolling
          gap: 0,
          direction: dir as "ltr" | "rtl",
        }}
      >
        <FixedSizeList
          height={Math.min(
            ITEM_HEIGHT * MAX_VISIBLE_ITEMS,
            items?.length * ITEM_HEIGHT
          )} // Show max 8 items or less
          itemCount={items?.length}
          itemSize={ITEM_HEIGHT}
          width="100%"
        >
          {({ index, style }) => (
            <div
              style={{
                ...style,
                direction: dir as "ltr" | "rtl",
                height: "auto",
              }}
            >
              {items[index]}
            </div>
          )}
        </FixedSizeList>
      </div>
    );
  }
);

export interface IProps<T extends FieldValues>
  extends Omit<AutocompleteProps<any, any, any, any>, "renderInput"> {
  name: Path<T>;
  label: string;
  rules?: any;
  valueKey: string;
  control: Control<T>;
  loading: boolean;
  variant?: "outlined" | "filled" | "standard";
  selectFirst?: boolean;
  onChangeFn?: (e?: any) => void;
  defaultCustomValue?: any;
  required?: boolean;
}

const AutoCompleteComponent = <T extends FieldValues>({
  name,
  label,
  rules,
  options,
  valueKey = "id",
  control,
  defaultValue,
  loading,
  multiple = false,
  variant,
  selectFirst,
  defaultCustomValue,
  onChangeFn,
  required,
  ...rest
}: IProps<T>) => {
  // const { control } = useFormContext();

  const { field } = useController({ name, control });
  const { t, i18n } = useTranslation(["common"]);
  const hasInitialized = useRef(false);

  const [valueState, setValueState] = useState([]);

  const handleFilterOptions = (options, state) => {
    const { inputValue } = state;
    const filteredOptions = options?.filter(
      (option) => option[valueKey] !== field.value
    ); // test it

    if (inputValue) {
      return matchSorter(filteredOptions, inputValue, {
        keys: ["name", "code"],
        baseSort: () => 0,
      });
    }

    return filteredOptions;
  };

  const handleChange = (_, newValue) => {
    if (!newValue) {
      field.onChange(multiple ? [] : "");
      setValueState([]);
      if (onChangeFn) {
        onChangeFn();
      }
      return;
    }

    const isArray = Array.isArray(newValue);
    field.onChange(
      isArray ? newValue.map((value) => value[valueKey]) : newValue[valueKey]
    );

    // isArray
    //   ? field.onChange(newValue.map((value) => value[valueKey]))
    //   : field.onChange(newValue[valueKey]);
    if (onChangeFn) {
      onChangeFn();
    }
    setValueState(newValue);
  };

  useEffect(() => {
    if (!hasInitialized.current && options?.length > 0) {
      if (defaultCustomValue) {
        setValueState(defaultCustomValue);
        field.onChange(defaultCustomValue[valueKey]);
      } else if (selectFirst && !field.value) {
        const firstOption = options[0];
        setValueState(firstOption);
        field.onChange(firstOption[valueKey]);
      }
      hasInitialized.current = true;
    }
  }, [defaultCustomValue, selectFirst, options, field, valueKey]);

  // useEffect(() => {
  //   if (defaultCustomValue) {
  //     setValueState(defaultCustomValue);
  //     field.onChange(defaultCustomValue[valueKey]);
  //   }
  // }, [defaultCustomValue]);

  useEffect(() => {
    if (field.value) {
      setValueState(
        multiple
          ? options?.filter((opt) => field?.value?.includes(opt[valueKey]))
          : options?.find((opt) => opt[valueKey] === field.value) || null
      );
    } else {
      setValueState([]);
    }
  }, [field.value, options, multiple]);

  // useEffect(() => {
  //   if (
  //     selectFirst &&
  //     options?.length > 0 &&
  //     !field.value &&
  //     !hasInitialized.current
  //   ) {
  //     const firstOption = options[0];
  //     field.onChange(firstOption[valueKey]);
  //     setValueState(firstOption);
  //     hasInitialized.current = true;
  //   }
  // }, [selectFirst, options, field, valueKey]);

  const dir =
    i18n.language === "ku" || i18n?.language === "ar" ? "rtl" : i18n.dir();

  return (
    <Controller
      rules={required ? { required: t("required") } : rules}
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        field: { onChange, ...restFields }, // Same method like ...register,
        fieldState: { error },
      }) => (
        <Autocomplete
          dir={dir}
          {...restFields}
          size="small"
          renderInput={(params) => (
            <TextField
              dir={dir}
              {...params}
              label={rules && rules.required ? `${t(label)} *` : t(label)}
              error={!!error}
              helperText={error?.message}
              variant={variant || "filled"}
              size="small"
            />
          )}
          options={options || []}
          getOptionLabel={(option) => {
            return option?.name ?? "";
          }}
          // change it to id to ensure always get unique key value
          getOptionKey={(option) => option.id ?? option.name}
          //If your options are objects,
          // you must provide the isOptionEqualToValue prop to ensure correct selection and highlighting.
          isOptionEqualToValue={(option, value) =>
            option[valueKey] === value[valueKey]
          }
          // value={valueState} // Make sure the value is correctly mapped
          value={multiple ? valueState ?? [] : valueState ?? null}
          onChange={handleChange}
          filterOptions={handleFilterOptions}
          popupIcon={
            loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <ArrowDropDown /> // Replace with your desired icon for the arrow
            )
          }
          {...rest}
          disableClearable={!field.value}
          ListboxComponent={VirtualizedListbox}
          multiple={multiple}
          defaultValue={selectFirst ? options?.[0] : ""}
        />
      )}
    />
  );
};

export default AutoCompleteComponent;
