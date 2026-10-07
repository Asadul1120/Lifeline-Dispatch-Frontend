"use client";

import { useState } from "react";
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

import { useAdminAuditLogs } from "@/hooks/admin-management.hook";
import type { AdminFilters } from "@/types/admin-management.type";

import {
  AdminPanel,
  AdminPagination,
  EmptyState,
  QueryMessage,
} from "./admin-shared";

export default function AdminAuditLogs({ userId }: { userId?: string }) {
  const [filters, setFilters] = useState<AdminFilters>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const query = useAdminAuditLogs(filters, userId);
  const result = query.data?.data;
  const prefix = userId || "all";

  return (
    <AdminPanel
      title={userId ? "User activity history" : "Audit log directory"}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);

          const dateFrom = String(form.get("dateFrom") || "");
          const dateTo = String(form.get("dateTo") || "");

          if (dateFrom && dateTo && dateFrom > dateTo) {
            toast.error("Start date must be before the end date.");
            return;
          }

          setFilters({
            page: 1,
            limit: 10,
            search: String(form.get("search") || "").trim() || undefined,
            action: String(form.get("action") || "").trim() || undefined,
            entity: String(form.get("entity") || "").trim() || undefined,
            dateFrom: dateFrom || undefined,
            dateTo: dateTo || undefined,
            sortBy: "createdAt",
            sortOrder: String(form.get("sortOrder")),
          });
        }}
        className="space-y-4 rounded-xl bg-slate-50 p-4"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "search", label: "Search", type: "text" },
            { name: "action", label: "Action", type: "text" },
            { name: "entity", label: "Entity", type: "text" },
            { name: "dateFrom", label: "From", type: "date" },
            { name: "dateTo", label: "To", type: "date" },
          ].map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={`${prefix}-${field.name}`}>{field.label}</Label>
              <Input
                id={`${prefix}-${field.name}`}
                name={field.name}
                type={field.type}
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
              defaultValue="desc"
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
            type="reset"
            variant="outline"
            onClick={() =>
              setFilters({
                page: 1,
                limit: 10,
                sortBy: "createdAt",
                sortOrder: "desc",
              })
            }
            className="h-10 px-4"
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
  );
}
