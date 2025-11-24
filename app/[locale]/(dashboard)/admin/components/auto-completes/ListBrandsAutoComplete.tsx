import { FieldValues } from "react-hook-form";
// import { ColorSpan } from "../../global.style";

import { useListBrandsDropdownQuery } from "@/graphql/queries/dropdowns/dropdown.generated";
import AutoCompleteComponent, {
  IProps as AutoCompleteComponentIProps,
} from "../form/AutoCompleteComponent";
import { Brand } from "@/graphql/types";

//
const ListBrandsAutoComplete = <T extends FieldValues>({
  name,
  label,
  control,
  rules,
  skip,
  input,
  onChangeFn,
  excludeId,
  selectDefaultBranch,
  ...rest
}: Omit<AutoCompleteComponentIProps<T>, "options" | "loading" | "valueKey"> & {
  skip?: boolean;
  onChangeFn?: (selectedObject?: any) => void;
  input?: any;
  excludeId?: number | string;
  selectDefaultBranch?: boolean;
}) => {
  const { data, loading } = useListBrandsDropdownQuery({
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
      options={data?.brandsDropdown as Brand[]}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option.id}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "4px 12px", // 🔥 Make sure padding is applied
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

export default ListBrandsAutoComplete;
