export const useCustomerCreateBreadcrumbLabels = () => {
  return [
    {
      label: "dashboard",
      href: "/admin",
    },
    {
      label: "customersList",
      href: "/admin/customers",
    },
    {
      label: "create",
      href: "/admin/customers/create",
    },
  ];
};
