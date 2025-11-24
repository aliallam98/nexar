"use client";

import { StaffForm } from "../_components/StaffForm";
import PageSection from "../../components/PageSection";
import { useStaffCreateBreadcrumbLabels } from "./_hooks/useStaffCreateBreadcrumbLabels";
import { useCreateUserMutation } from "@/graphql/mutations/user/create.generated";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function StaffCreatePage() {
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
            role: data.role || "ADMIN",
          },
        },
      });

      toast.success("Staff member created successfully");
      router.push("/admin/staff");
    } catch (error) {
      console.error("Error creating staff member:", error);
      toast.error("Error creating staff member");
    }
  };

  const breadcrumbsLabels = useStaffCreateBreadcrumbLabels();

  return (
    <PageSection breadcrumbs={breadcrumbsLabels}>
      <StaffForm onSubmit={onSubmit} loading={loading} />
    </PageSection>
  );
}
