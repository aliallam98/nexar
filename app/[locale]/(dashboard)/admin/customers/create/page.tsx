"use client";

import { CustomerForm } from "../_components/CustomerForm";
import PageSection from "../../components/PageSection";
import { useCustomerCreateBreadcrumbLabels } from "./_hooks/useCustomerCreateBreadcrumbLabels";
import { useCreateUserMutation } from "@/graphql/mutations/user/create.generated";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CustomersCreatePage() {
  const [createUser, { loading }] = useCreateUserMutation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const result = await createUser({
        variables: {
          input: {
            email: data.email,
            password: data.password,
            name: data.name,
            phone: data.phone,
            image: data.image,
            role: "CUSTOMER", // Auto-set to CUSTOMER
          },
        },
      });

      toast.success("Customer created successfully");
      router.push("/admin/customers");
    } catch (error) {
      console.error("Error creating customer:", error);
      toast.error("Error creating customer");
    }
  };

  const breadcrumbsLabels = useCustomerCreateBreadcrumbLabels();

  return (
    <PageSection breadcrumbs={breadcrumbsLabels}>
      <CustomerForm onSubmit={onSubmit} loading={loading} />
    </PageSection>
  );
}
