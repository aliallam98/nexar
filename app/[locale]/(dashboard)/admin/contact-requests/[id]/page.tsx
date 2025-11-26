"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// MUI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Select,
  MenuItem,
  TextField,
  Grid,
  Divider,
  Avatar,
  Stack,
  FormControl,
  InputLabel,
  CircularProgress,
  IconButton,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";

import {
  GET_CONTACT_REQUEST,
  UPDATE_CONTACT_REQUEST_STATUS,
  ASSIGN_CONTACT_REQUEST,
  ADD_CONTACT_REQUEST_NOTES,
} from "@/graphql/operations/contactRequest.operations";
import { GET_USERS } from "@/graphql/operations/user.operations";
import PageSection from "../../components/PageSection";
import { useContactRequestListBreadcrumbIcons } from "../_hooks/useContactRequestListBreadcrumbIcons";
import { useContactRequestListBreadcrumbLabels } from "../_hooks/useContactRequestListBreadcrumbLabels";

export default function ContactRequestDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const breadcrumbsLabels = useContactRequestListBreadcrumbLabels();
  const icons = useContactRequestListBreadcrumbIcons();
  
  const { data, loading, error } = useQuery(GET_CONTACT_REQUEST, {
    variables: { id: params.id },
    onCompleted: (data) => {
      if (data?.contactRequest?.notes) {
        setNotes(data.contactRequest.notes);
      }
    }
  });

  const { data: usersData } = useQuery(GET_USERS, {
    variables: { pagination: { page: 1, perPage: 100 } }
  });

  const [updateStatus, { loading: updatingStatus }] = useMutation(UPDATE_CONTACT_REQUEST_STATUS);
  const [assignUser, { loading: assigning }] = useMutation(ASSIGN_CONTACT_REQUEST);
  const [saveNotes, { loading: savingNotes }] = useMutation(ADD_CONTACT_REQUEST_NOTES);

  const handleStatusChange = async (event: any) => {
    const newStatus = event.target.value;
    try {
      await updateStatus({
        variables: {
          input: {
            id: params.id,
            status: newStatus,
          },
        },
      });
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleAssign = async (event: any) => {
    const userId = event.target.value;
    try {
      await assignUser({
        variables: {
          input: {
            id: params.id,
            assignedToId: userId === "unassigned" ? "" : userId,
          },
        },
      });
      toast.success("Request assigned successfully");
    } catch (error) {
      toast.error("Failed to assign user");
    }
  };

  const handleSaveNotes = async () => {
    try {
      await saveNotes({
        variables: {
          input: {
            id: params.id,
            notes,
          },
        },
      });
      toast.success("Notes saved successfully");
    } catch (error) {
      toast.error("Failed to save notes");
    }
  };

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ p: 4, textAlign: "center", color: "error.main" }}>Error: {error.message}</Box>;
  if (!data?.contactRequest) return <Box sx={{ p: 4, textAlign: "center" }}>Request not found</Box>;

  const request = data.contactRequest;

  // Extend breadcrumbs for detail page
  const breadcrumbs = [
    { label: breadcrumbsLabels.dashboard, to: "/admin" },
    { label: breadcrumbsLabels.contactRequests, to: "/admin/contact-requests" },
    { label: request.name },
  ];

  const pageIcons = [
    {
      id: "dashboard",
      component: icons.dashboard,
    },
    {
      id: "contactRequests",
      component: icons.contactRequests,
    }
  ];

  return (
    <PageSection
      breadcrumbs={breadcrumbs}
      icons={pageIcons}
      isLoading={loading}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={4}>
          <IconButton onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" fontWeight="bold">
              Request Details
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: {request.id} • Created {format(new Date(parseInt(request.createdAt)), "PPP p")}
            </Typography>
          </Box>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={request.status}
              label="Status"
              onChange={handleStatusChange}
              disabled={updatingStatus}
            >
              <MenuItem value="NEW">New</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="RESOLVED">Resolved</MenuItem>
              <MenuItem value="ARCHIVED">Archived</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              <Card>
                <CardHeader title="Message" />
                <Divider />
                <CardContent>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: "action.hover" }}>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                      {request.message}
                    </Typography>
                  </Paper>
                </CardContent>
              </Card>

              <Card>
                <CardHeader title="Internal Notes" />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    placeholder="Add internal notes for your team..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSaveNotes}
                      disabled={savingNotes}
                    >
                      {savingNotes ? "Saving..." : "Save Notes"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              <Card>
                <CardHeader title="Contact Info" />
                <Divider />
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="bold">
                        NAME
                      </Typography>
                      <Typography variant="body1">{request.name}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="bold">
                        CATEGORY
                      </Typography>
                      <Typography variant="body1">{request.category}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="bold">
                        PHONE
                      </Typography>
                      <Typography variant="body1">{request.phone}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader title="Assignment" />
                <Divider />
                <CardContent>
                  <Stack spacing={2}>
                    <Paper variant="outlined" sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar src={request.assignedTo?.image}>
                        <PersonIcon />
                      </Avatar>
                      <Box sx={{ overflow: "hidden" }}>
                        <Typography variant="body2" fontWeight="bold" noWrap>
                          {request.assignedTo?.name || "Unassigned"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {request.assignedTo?.email || "No admin assigned"}
                        </Typography>
                      </Box>
                    </Paper>

                    <FormControl fullWidth size="small">
                      <InputLabel>Assign to...</InputLabel>
                      <Select
                        value={request.assignedToId || "unassigned"}
                        label="Assign to..."
                        onChange={handleAssign}
                        disabled={assigning}
                      >
                        <MenuItem value="unassigned">Unassigned</MenuItem>
                        {usersData?.users?.items.map((user: any) => (
                          <MenuItem key={user.id} value={user.id}>
                            {user.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </PageSection>
  );
}
