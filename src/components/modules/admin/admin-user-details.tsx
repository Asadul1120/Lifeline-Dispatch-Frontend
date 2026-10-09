"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, History, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

import { useGetMe, useAdminUser, useChangeUserStatus } from "@/hooks";

import { cn, getMessage } from "@/lib/utils";

import AdminAuditLogs from "./admin-audit-logs";

import {
  AdminPage,
  AdminPanel,
  InfoItem,
  QueryMessage,
  StatusBadge,
} from "./admin-shared";

export default function AdminUserDetails() {
  const { id } = useParams<{ id: string }>();

  const query = useAdminUser(id);
  const currentUser = useGetMe();
  const mutation = useChangeUserStatus();

  const [status, setStatus] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const user = query.data?.data;

  const isOwnAccount = currentUser.data?.data?.id === id;
  const isCheckingAccount = currentUser.isPending;

  const handleStatusUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !user ||
      !status ||
      status === user.status ||
      mutation.isPending ||
      isOwnAccount ||
      isCheckingAccount
    ) {
      return;
    }

    mutation.mutate(
      {
        userId: id,
        status,
      },
      {
        onSuccess: () => {
          setStatus("");
          toast.success("Account status updated successfully.");
        },
        onError: (error) => {
          toast.error(getMessage(error, "Could not update account."));
        },
      },
    );
  };

  return (
    <AdminPage
      title="User details"
      description="Profile information, account access and recorded activity."
      action={
        <Link
          href="/dashboard/admin/users"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-10 gap-2 px-4",
          )}
        >
          <ArrowLeft className="size-4" />
          All users
        </Link>
      }
    >
      <QueryMessage
        loading={query.isPending}
        error={query.error}
        retry={() => void query.refetch()}
      />

      {query.isSuccess && user && (
        <>
          <div className="grid items-start gap-6 lg:grid-cols-[320px_1fr]">
            {/* User profile */}
            <AdminPanel>
              <div className="py-4 text-center">
                <div className="mx-auto flex size-20 items-center justify-center overflow-hidden rounded-2xl bg-emerald-100 text-3xl font-bold text-emerald-800">
                  {user.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt={user.name}
                      width={80}
                      height={80}
                      className="size-full object-cover"
                    />
                  ) : (
                    user.name.slice(0, 1).toUpperCase()
                  )}
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  {user.name}
                </h2>

                <p className="mt-2 break-all text-sm text-slate-500">
                  {user.email}
                </p>

                <div className="mt-4 flex justify-center gap-2">
                  <StatusBadge status={user.role} />
                  <StatusBadge status={user.status} />
                </div>
              </div>

              <div className="space-y-3 border-t border-slate-100 pt-5">
                <InfoItem
                  label="Email verification"
                  value={
                    <StatusBadge
                      status={user.emailVerified ? "VERIFIED" : "UNVERIFIED"}
                    />
                  }
                />

                <InfoItem
                  label="Joined"
                  value={new Date(user.createdAt).toLocaleDateString("en-BD")}
                />
              </div>
            </AdminPanel>

            <div className="space-y-6">
              {/* Account status management */}
              <AdminPanel
                title="Account access"
                action={<ShieldCheck className="size-5 text-emerald-700" />}
              >
                {isOwnAccount ? (
                  <p className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
                    This is your account. You cannot change your own status.
                  </p>
                ) : (
                  <form
                    onSubmit={handleStatusUpdate}
                    className="flex flex-col gap-4 sm:flex-row sm:items-end"
                  >
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="account-status">Account status</Label>

                      <NativeSelect
                        id="account-status"
                        value={status || user.status}
                        onChange={(event) => setStatus(event.target.value)}
                        disabled={mutation.isPending || isCheckingAccount}
                        className="h-11 w-full"
                      >
                        <NativeSelectOption value="ACTIVE">
                          Active
                        </NativeSelectOption>

                        <NativeSelectOption value="SUSPENDED">
                          Suspended
                        </NativeSelectOption>

                        <NativeSelectOption value="BANNED">
                          Banned
                        </NativeSelectOption>
                      </NativeSelect>
                    </div>

                    <Button
                      type="submit"
                      disabled={
                        !status ||
                        status === user.status ||
                        mutation.isPending ||
                        isCheckingAccount
                      }
                      className="h-11 rounded-xl bg-emerald-700 px-5 hover:bg-emerald-800"
                    >
                      {mutation.isPending ? "Saving..." : "Update status"}
                    </Button>
                  </form>
                )}
              </AdminPanel>

              {/* Patient information */}
              {user.patient && (
                <AdminPanel title="Patient information">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <InfoItem label="Phone" value={user.patient.phone} />

                    <InfoItem
                      label="Blood group"
                      value={user.patient.bloodGroup}
                    />

                    <InfoItem label="Address" value={user.patient.address} />

                    <InfoItem
                      label="Emergency contact"
                      value={user.patient.emergencyContact}
                    />
                  </div>
                </AdminPanel>
              )}

              {/* Driver information */}
              {user.driver && (
                <AdminPanel title="Driver information">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <InfoItem
                      label="License"
                      value={user.driver.licenseNumber}
                    />

                    <InfoItem
                      label="Experience"
                      value={`${user.driver.experience} years`}
                    />

                    <InfoItem label="Phone" value={user.driver.contactNumber} />

                    <InfoItem
                      label="Location"
                      value={user.driver.currentLocation}
                    />

                    <InfoItem
                      label="Application"
                      value={
                        <StatusBadge status={user.driver.applicationStatus} />
                      }
                    />

                    <InfoItem
                      label="Available for dispatch"
                      value={user.driver.isAvailable ? "Yes" : "No"}
                    />
                  </div>
                </AdminPanel>
              )}
            </div>
          </div>

          {/* Activity History */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowHistory((previous) => !previous)}
            aria-expanded={showHistory}
            aria-controls="admin-user-activity"
            className="h-10 gap-2 rounded-xl px-4"
          >
            <History className="size-4" />

            {showHistory ? "Hide activity history" : "View activity history"}
          </Button>

          {showHistory && (
            <div id="admin-user-activity">
              <Suspense
                fallback={
                  <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
                    Loading activity history...
                  </div>
                }
              >
                <AdminAuditLogs userId={id} />
              </Suspense>
            </div>
          )}
        </>
      )}
    </AdminPage>
  );
}
