"use client";

import type { FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

import { useAdminAuditLogs } from "@/hooks";

import { positivePage, useAdminUrlParams } from "@/hooks/use-admin-url-params";

import type { AdminFilters } from "@/types";

import {
  AdminPanel,
  AdminPagination,
  EmptyState,
  QueryMessage,
} from "./admin-shared";

const auditKeys = [
  "auditPage",
  "auditSearch",
  "auditAction",
  "auditEntity",
  "auditDateFrom",
  "auditDateTo",
  "auditOrder",
] as const;

export default function AdminAuditLogs({ userId }: { userId?: string }) {
  const { searchParams, updateParams } = useAdminUrlParams();

  const filters: AdminFilters = {
    page: positivePage(searchParams.get("auditPage")),
    limit: 10,
    search: searchParams.get("auditSearch")?.trim().slice(0, 100) || undefined,
    action: searchParams.get("auditAction")?.trim().slice(0, 100) || undefined,
    entity: searchParams.get("auditEntity")?.trim().slice(0, 100) || undefined,
    dateFrom: searchParams.get("auditDateFrom") || undefined,
    dateTo: searchParams.get("auditDateTo") || undefined,
    sortBy: "createdAt",
    sortOrder: searchParams.get("auditOrder") === "asc" ? "asc" : "desc",
  };

  const query = useAdminAuditLogs(filters, userId);

  const result = query.data?.data;
  const prefix = userId || "all";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const get = (key: string) => String(form.get(key) || "").trim();

    const from = get("dateFrom");
    const to = get("dateTo");

    if (from && to && from > to) {
      toast.error("Start date must be before the end date.");
      return;
    }

    updateParams({
      auditPage: null,
      auditSearch: get("search").slice(0, 100) || null,
      auditAction: get("action").slice(0, 100) || null,
      auditEntity: get("entity").slice(0, 100) || null,
      auditDateFrom: from || null,
      auditDateTo: to || null,
      auditOrder: get("sortOrder") === "asc" ? "asc" : null,
    });
  }

  return (
    <AdminPanel
      title={userId ? "User activity history" : "Audit log directory"}
    >
      <form
        key={searchParams.toString()}
        onSubmit={submit}
        className="space-y-4 rounded-xl bg-slate-50 p-4"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "search",
              label: "Search",
              type: "text",
              value: filters.search,
            },
            {
              name: "action",
              label: "Action",
              type: "text",
              value: filters.action,
            },
            {
              name: "entity",
              label: "Entity",
              type: "text",
              value: filters.entity,
            },
            {
              name: "dateFrom",
              label: "From",
              type: "date",
              value: filters.dateFrom,
            },
            {
              name: "dateTo",
              label: "To",
              type: "date",
              value: filters.dateTo,
            },
          ].map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={`${prefix}-${field.name}`}>{field.label}</Label>

              <Input
                id={`${prefix}-${field.name}`}
                name={field.name}
                type={field.type}
                defaultValue={field.value || ""}
                maxLength={100}
                className="h-10 bg-white"
              />
            </div>
          ))}

          <div className="space-y-2">
            <Label htmlFor={`${prefix}-order`}>Order</Label>

            <NativeSelect
              id={`${prefix}-order`}
              name="sortOrder"
              defaultValue={filters.sortOrder}
              className="h-10 w-full"
            >
              <NativeSelectOption value="desc">Newest first</NativeSelectOption>

              <NativeSelectOption value="asc">Oldest first</NativeSelectOption>
            </NativeSelect>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            className="h-10 bg-emerald-700 px-4 hover:bg-emerald-800"
          >
            Apply filters
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-10 px-4"
            onClick={() =>
              updateParams(
                Object.fromEntries(auditKeys.map((key) => [key, null])),
              )
            }
          >
            Reset
          </Button>
        </div>
      </form>

      <QueryMessage
        loading={query.isPending}
        error={query.error}
        retry={() => void query.refetch()}
      />

      {query.isSuccess && result && (
        <>
          <p className="text-sm text-slate-500">
            {result.pagination.total} recorded activities
          </p>

          {result.data.length === 0 ? (
            <EmptyState message="No matching activity found." />
          ) : (
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {result.data.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="py-4">
                        <p className="font-semibold">{log.user.name}</p>

                        <p className="mt-1 text-xs text-slate-500">
                          {log.user.email}
                        </p>
                      </TableCell>

                      <TableCell className="max-w-64 whitespace-normal">
                        {log.action.replaceAll("_", " ")}
                      </TableCell>

                      <TableCell>
                        <p>{log.entity}</p>

                        {log.entityId && (
                          <p className="mt-1 max-w-48 break-all whitespace-normal text-xs text-slate-400">
                            {log.entityId}
                          </p>
                        )}
                      </TableCell>

                      <TableCell>
                        {new Date(log.createdAt).toLocaleString("en-BD")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {result.pagination.total > 0 &&
            (filters.page || 1) > result.pagination.totalPages && (
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  updateParams({
                    auditPage: result.pagination.totalPages,
                  })
                }
              >
                Go to last page
              </Button>
            )}

          <AdminPagination
            page={filters.page || 1}
            hasNextPage={result.pagination.hasNextPage}
            loading={query.isFetching}
            onChange={(page) =>
              updateParams({
                auditPage: page === 1 ? null : page,
              })
            }
          />
        </>
      )}
    </AdminPanel>
  );
}
