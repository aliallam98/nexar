import { FieldValues } from "react-hook-form";
// import { ColorSpan } from "../../global.style";

import { useListCategoriesDropdownQuery } from "@/graphql/queries/dropdowns/dropdown.generated";
import AutoCompleteComponent, {
  IProps as AutoCompleteComponentIProps,
} from "../form/AutoCompleteComponent";
import { Category } from "@/graphql/types";

const ListCategoriesAutoComplete = <T extends FieldValues>({
  name,
  label,
  control,
  rules,
  skip,
  input,
  onChangeFn,
  parentId,
  ...rest
}: Omit<AutoCompleteComponentIProps<T>, "options" | "loading" | "valueKey"> & {
  skip?: boolean;
  onChangeFn?: (selectedObject?: any) => void;
  input?: any;
  parentId?: string;
}) => {
  const { data, loading } = useListCategoriesDropdownQuery({
    skip: skip,
    fetchPolicy: "no-cache",
    nextFetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,

    // variables: {
    //   input: {
    //     ...input,
    //   },
    // },
  });

  return (
    <AutoCompleteComponent
      rules={rules}
      control={control}
      label={label}
      name={name}
      options={data?.categoriesDropdown as Category[]}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option.id}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "4px 12px",
            boxSizing: "border-box",
          }}
        >
          {/* <ColorSpan>{option?.code}</ColorSpan> */}
          <span>{option?.name}</span>
        </li>
      )}
      getOptionKey={(option) => option.id}
      loading={loading}
      valueKey="id"
      onChangeFn={onChangeFn}
      {...rest}
    />
  );
};

export default ListCategoriesAutoComplete;
