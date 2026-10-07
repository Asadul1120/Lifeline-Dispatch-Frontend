"use client";

import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

import {
  useAdminUsers,
  useAdminUser,
  useManagedAmbulance,
  useCreateAdminAmbulance,
  useUpdateAdminAmbulance,
  useChangeAmbulanceStatus,
} from "@/hooks";

import type {
  AdminFilters,
  ManagedAmbulance,
} from "@/types";

import { getMessage } from "@/lib/utils";
import {
  AdminPagination,
  InfoItem,
  QueryMessage,
  StatusBadge,
} from "./admin-shared";

const ambulanceTypes = ["BASIC", "ICU", "CARDIAC", "VENTILATOR"];

export function CreateAmbulanceDialog({
  ambulances,
}: {
  ambulances: ManagedAmbulance[];
}) {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const [filters, setFilters] = useState<AdminFilters>({
    role: "DRIVER",
    status: "ACTIVE",
    page: 1,
    limit: 10,
  });

  const usersQuery = useAdminUsers(filters);
  const userQuery = useAdminUser(open ? userId : "");
  const mutation = useCreateAdminAmbulance();

  const result = usersQuery.data?.data;
  const selectedUser = userQuery.data?.data;
  const driver = selectedUser?.driver;

  const alreadyAssigned = ambulances.some(
    (ambulance) => ambulance.driverId === driver?.id,
  );

  const canCreate =
    userQuery.isSuccess &&
    selectedUser?.role === "DRIVER" &&
    selectedUser.status === "ACTIVE" &&
    selectedUser.emailVerified &&
    driver?.applicationStatus === "APPROVED" &&
    !alreadyAssigned;

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!mutation.isPending) {
          setOpen(value);
          if (!value) setUserId("");
        }
      }}
    >
      <DialogTrigger
        render={
          <Button className="h-10 gap-2 rounded-xl bg-emerald-700 px-4 hover:bg-emerald-800" />
        }
      >
        <Plus className="size-4" />
        Add ambulance
      </DialogTrigger>

      <DialogContent
        showCloseButton={!mutation.isPending}
        className="max-h-[90svh] overflow-y-auto rounded-2xl sm:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl">Add ambulance</DialogTitle>
          <DialogDescription>
            Register a vehicle for an approved driver.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);

              setFilters({
                role: "DRIVER",
                status: "ACTIVE",
                page: 1,
                limit: 10,
                search: String(form.get("search") || "").trim() || undefined,
              });

              setUserId("");
            }}
            className="flex gap-2"
          >
            <Input
              name="search"
              aria-label="Search driver"
              placeholder="Search driver name or email"
              disabled={mutation.isPending}
              className="h-10"
            />
            <Button
              type="submit"
              variant="outline"
              disabled={mutation.isPending}
              className="h-10 px-4"
            >
              Search
            </Button>
          </form>

          <QueryMessage
            loading={usersQuery.isPending}
            error={usersQuery.error}
            retry={() => void usersQuery.refetch()}
          />

          {usersQuery.isSuccess && result && (
            <div className="space-y-3">
              <Label htmlFor="new-ambulance-driver">Driver</Label>
              <NativeSelect
                id="new-ambulance-driver"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                disabled={mutation.isPending}
                className="h-11 w-full"
              >
                <NativeSelectOption value="">Choose a driver</NativeSelectOption>
                {result.data.map((user) => (
                  <NativeSelectOption key={user.id} value={user.id}>
                    {user.name} — {user.email}
                  </NativeSelectOption>
                ))}
              </NativeSelect>

              {result.data.length === 0 && (
                <p className="text-sm text-slate-500">No drivers found.</p>
              )}

              <AdminPagination
                page={filters.page || 1}
                hasNextPage={result.pagination.hasNextPage}
                loading={usersQuery.isFetching || mutation.isPending}
                onChange={(page) => {
                  setFilters({ ...filters, page });
                  setUserId("");
                }}
              />
            </div>
          )}

          {userId && (
            <QueryMessage
              loading={userQuery.isPending}
              error={userQuery.error}
              retry={() => void userQuery.refetch()}
            />
          )}

          {userQuery.isSuccess && selectedUser && (
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">{selectedUser.name}</p>
                <StatusBadge status={driver?.applicationStatus || "UNAVAILABLE"} />
              </div>
              {!canCreate && (
                <p className="mt-2 text-sm text-amber-700">
                  {alreadyAssigned
                    ? "This driver already has an ambulance."
                    : "An active, verified and approved driver is required."}
                </p>
              )}
            </div>
          )}

          <form
            onSubmit={(event) => {
              event.preventDefault();

              if (!canCreate || !driver || mutation.isPending) return;

              const formElement = event.currentTarget;
              const form = new FormData(formElement);
              const vehicleNumber = String(form.get("vehicleNumber")).trim();

              if (vehicleNumber.length < 3) {
                toast.error("Enter a valid vehicle number.");
                return;
              }

              mutation.mutate(
                {
                  driverId: driver.id,
                  vehicleNumber,
                  type: String(form.get("type")),
                  location: String(form.get("location") || "").trim(),
                },
                {
                  onSuccess: () => {
                    toast.success("Ambulance added successfully.");
                    formElement.reset();
                    setUserId("");
                    setOpen(false);
                  },
                  onError: (error) => {
                    toast.error(getMessage(error, "Could not add ambulance."));
                  },
                },
              );
            }}
            className="space-y-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-vehicle-number">Vehicle number</Label>
                <Input
                  id="new-vehicle-number"
                  name="vehicleNumber"
                  required
                  minLength={3}
                  maxLength={50}
                  disabled={mutation.isPending}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-vehicle-type">Type</Label>
                <NativeSelect
                  id="new-vehicle-type"
                  name="type"
                  disabled={mutation.isPending}
                  className="h-11 w-full"
                >
                  {ambulanceTypes.map((type) => (
                    <NativeSelectOption key={type} value={type}>
                      {type}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="new-vehicle-location">Location</Label>
                <Input
                  id="new-vehicle-location"
                  name="location"
                  maxLength={255}
                  disabled={mutation.isPending}
                  className="h-11"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={mutation.isPending}
                onClick={() => setOpen(false)}
                className="h-10 px-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!canCreate || mutation.isPending}
                className="h-10 bg-emerald-700 px-5 hover:bg-emerald-800"
              >
                {mutation.isPending ? "Creating..." : "Create ambulance"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AmbulanceDetailsDialog({
  ambulanceId,
}: {
  ambulanceId: string;
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const query = useManagedAmbulance(open ? ambulanceId : "");
  const updateMutation = useUpdateAdminAmbulance();
  const statusMutation = useChangeAmbulanceStatus();

  const ambulance = query.data?.data;
  const saving = updateMutation.isPending || statusMutation.isPending;

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!saving) {
          setOpen(value);
          if (!value) setEditing(false);
        }
      }}
    >
      <DialogTrigger
        render={<Button variant="outline" className="h-9 rounded-lg px-3" />}
      >
        View / edit
      </DialogTrigger>

      <DialogContent
        showCloseButton={!saving}
        className="max-h-[90svh] overflow-y-auto rounded-2xl sm:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl">
            {ambulance?.vehicleNumber || "Ambulance details"}
          </DialogTitle>
          <DialogDescription>
            Vehicle information, driver details and availability.
          </DialogDescription>
        </DialogHeader>

        <QueryMessage
          loading={query.isPending}
          error={query.error}
          retry={() => void query.refetch()}
        />

        {query.isSuccess && ambulance && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <StatusBadge status={ambulance.status} />
              <Button
                type="button"
                variant="outline"
                disabled={saving}
                onClick={() => setEditing(!editing)}
                className="h-9 gap-2 px-3"
              >
                <Pencil className="size-4" />
                {editing ? "View details" : "Edit information"}
              </Button>
            </div>

            {!editing ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoItem label="Vehicle number" value={ambulance.vehicleNumber} />
                <InfoItem label="Type" value={ambulance.type} />
                <InfoItem label="Location" value={ambulance.location} />
                <InfoItem label="Driver" value={ambulance.driver.user.name} />
                <InfoItem label="Driver email" value={ambulance.driver.user.email} />
                <InfoItem
                  label="Driver availability"
                  value={ambulance.driver.isAvailable ? "Available" : "Unavailable"}
                />
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (saving) return;

                  const form = new FormData(event.currentTarget);
                  const vehicleNumber = String(form.get("vehicleNumber")).trim();

                  if (vehicleNumber.length < 3) {
                    toast.error("Enter a valid vehicle number.");
                    return;
                  }

                  updateMutation.mutate(
                    {
                      ambulanceId,
                      data: {
                        vehicleNumber,
                        type: String(form.get("type")),
                        location: String(form.get("location") || "").trim(),
                      },
                    },
                    {
                      onSuccess: () => {
                        toast.success("Vehicle information updated.");
                        setEditing(false);
                      },
                      onError: (error) => {
                        toast.error(getMessage(error, "Could not update vehicle."));
                      },
                    },
                  );
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor={`${ambulanceId}-number`}>Vehicle number</Label>
                  <Input
                    id={`${ambulanceId}-number`}
                    name="vehicleNumber"
                    defaultValue={ambulance.vehicleNumber}
                    required
                    minLength={3}
                    maxLength={50}
                    disabled={saving}
                    className="h-11"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`${ambulanceId}-type`}>Type</Label>
                    <NativeSelect
                      id={`${ambulanceId}-type`}
                      name="type"
                      defaultValue={ambulance.type}
                      disabled={saving}
                      className="h-11 w-full"
                    >
                      {ambulanceTypes.map((type) => (
                        <NativeSelectOption key={type} value={type}>
                          {type}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`${ambulanceId}-location`}>Location</Label>
                    <Input
                      id={`${ambulanceId}-location`}
                      name="location"
                      defaultValue={ambulance.location || ""}
                      maxLength={255}
                      disabled={saving}
                      className="h-11"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={saving}
                  className="h-10 bg-emerald-700 px-5 hover:bg-emerald-800"
                >
                  {updateMutation.isPending ? "Saving..." : "Save changes"}
                </Button>
              </form>
            )}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (saving || ambulance.status === "BUSY") return;

                const form = new FormData(event.currentTarget);
                const status = String(form.get("status"));

                if (status === ambulance.status) {
                  toast.error("Select a different status.");
                  return;
                }

                statusMutation.mutate(
                  { ambulanceId, status },
                  {
                    onSuccess: () => toast.success("Availability updated."),
                    onError: (error) => {
                      toast.error(getMessage(error, "Could not update availability."));
                    },
                  },
                );
              }}
              className="space-y-3 border-t pt-5"
            >
              <Label htmlFor={`${ambulanceId}-status`}>Availability</Label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <NativeSelect
                  key={ambulance.status}
                  id={`${ambulanceId}-status`}
                  name="status"
                  defaultValue={ambulance.status}
                  disabled={saving || ambulance.status === "BUSY"}
                  className="h-10 w-full"
                >
                  <NativeSelectOption value="AVAILABLE">Available</NativeSelectOption>
                  <NativeSelectOption value="MAINTENANCE">Maintenance</NativeSelectOption>
                  <NativeSelectOption value="BUSY" disabled>Busy</NativeSelectOption>
                </NativeSelect>

                <Button
                  type="submit"
                  variant="outline"
                  disabled={saving || ambulance.status === "BUSY"}
                  className="h-10 px-4"
                >
                  {statusMutation.isPending ? "Updating..." : "Update status"}
                </Button>
              </div>

              {ambulance.status === "BUSY" && (
                <p className="text-xs leading-5 text-amber-700">
                  This ambulance is assigned to a request. Complete its trip
                  before changing availability.
                </p>
              )}
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}