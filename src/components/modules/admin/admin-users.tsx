"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Search, Users } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAdminUsers } from "@/hooks";
import type { AdminFilters } from "@/types";
import { cn } from "@/lib/utils";

import {
  AdminPage,
  AdminPanel,
  AdminPagination,
  EmptyState,
  QueryMessage,
  StatusBadge,
} from "./admin-shared";
import Image from "next/image";

export default function AdminUsers() {
  const [filters, setFilters] = useState<AdminFilters>({
    page: 1,
    limit: 10,
  });

  const query = useAdminUsers(filters);
  const result = query.data?.data;

  return (
    <AdminPage
      title="Users"
      description="Find accounts, view complete profiles and manage access."
    >
      <AdminPanel
        title="Account directory"
        action={<Users className="size-5 text-emerald-700" />}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);

            setFilters({
              page: 1,
              limit: 10,
              search: String(form.get("search") || "").trim() || undefined,
              role: String(form.get("role") || "") || undefined,
              status: String(form.get("status") || "") || undefined,
            });
          }}
          className="grid gap-4 rounded-xl bg-slate-50 p-4 md:grid-cols-[2fr_1fr_1fr_auto]"
        >
          <div className="space-y-2">
            <Label htmlFor="user-search">Search</Label>
            <Input
              id="user-search"
              name="search"
              placeholder="Name or email"
              className="h-10 rounded-lg bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-role">Role</Label>
            <NativeSelect id="user-role" name="role" className="h-10 w-full">
              <NativeSelectOption value="">All roles</NativeSelectOption>
              <NativeSelectOption value="PATIENT">Patient</NativeSelectOption>
              <NativeSelectOption value="DRIVER">Driver</NativeSelectOption>
              <NativeSelectOption value="ADMIN">Admin</NativeSelectOption>
            </NativeSelect>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-status">Status</Label>
            <NativeSelect
              id="user-status"
              name="status"
              className="h-10 w-full"
            >
              <NativeSelectOption value="">All statuses</NativeSelectOption>
              <NativeSelectOption value="ACTIVE">Active</NativeSelectOption>
              <NativeSelectOption value="SUSPENDED">
                Suspended
              </NativeSelectOption>
              <NativeSelectOption value="BANNED">Banned</NativeSelectOption>
            </NativeSelect>
          </div>

          <Button
            type="submit"
            className="h-10 self-end rounded-lg bg-emerald-700 px-4 hover:bg-emerald-800"
          >
            <Search className="size-4" />
            Search
          </Button>
        </form>

        <QueryMessage
          loading={query.isPending}
          error={query.error}
          retry={() => void query.refetch()}
        />

        {query.isSuccess && result && (
          <>
            <p className="text-sm text-slate-500">
              {result.pagination.total} matching accounts
            </p>

            {result.data.length === 0 ? (
              <EmptyState message="No accounts match your search." />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {result.data.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-emerald-50 font-semibold text-emerald-700">
                            {user.imageUrl ? (
                              <Image
                                src={user.imageUrl}
                                alt={user.name}
                                width={40}
                                height={40}
                                className="size-full object-cover"
                              />
                            ) : (
                              user.name.slice(0, 1).toUpperCase()
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {user.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={user.role} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={user.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href={`/dashboard/admin/users/${user.id}`}
                          className={cn(
                            buttonVariants({ variant: "outline" }),
                            "h-9 gap-2 rounded-lg px-3",
                          )}
                        >
                          Details
                          <ArrowUpRight className="size-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <AdminPagination
              page={filters.page || 1}
              hasNextPage={result.pagination.hasNextPage}
              loading={query.isFetching}
              onChange={(page) => setFilters({ ...filters, page })}
            />
          </>
        )}
      </AdminPanel>
    </AdminPage>
  );
}
