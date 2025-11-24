"use client";
import { useUserQuery } from "@/graphql/queries/user/user.generated";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FullScreenLoading } from "../../../components/FullScreenLoading";
import PageSection from "../../../components/PageSection";
import { StaffForm } from "../../_components/StaffForm";
import { toast } from "sonner";
import { useUpdateUserMutation } from "@/graphql/mutations/user/update.generated";

export default function StaffEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [updateUser, { loading: updateLoading }] = useUpdateUserMutation();

  const { data, loading } = useUserQuery({
    fetchPolicy: "no-cache",
    variables: {
      id: id as string,
    },
  });

  const defaultValuesForForm = {
    email: data?.user?.email || "",
    name: data?.user?.name,
    phone: data?.user?.phone,
    image: data?.user?.image,
    role: data?.user?.role || "ADMIN",
    isActive: data?.user?.isActive ?? true,
  };

  const onSubmit = async (formData: any) => {
    try {
      const result = await updateUser({
        variables: {
          id: id as string,
          input: {
            name: formData.name,
            phone: formData.phone,
            image: formData.image,
            isActive: formData.isActive,
          },
        },
      });

      toast.success("Staff member updated successfully");
      router.push("/admin/staff");
    } catch (error) {
      console.error("Error updating staff member:", error);
      toast.error("Error updating staff member");
    }
  };

  if (loading) return <FullScreenLoading />;

  return (
    <PageSection>
      <StaffForm 
        defaultValues={defaultValuesForForm} 
        onSubmit={onSubmit} 
        loading={updateLoading}
        isEdit={true}
      />
    </PageSection>
  );
}
