"use client";

import Link from "next/link";
import type { FormEvent } from "react";

import { useAllAdminRequests } from "@/hooks";
import {
  positivePage,
  useAdminUrlParams,
  validChoice,
} from "@/hooks/use-admin-url-params";

import type { AdminFilters } from "@/types";
import { AdminPagination, QueryMessage } from "./admin-ui";
import styles from "./admin.module.css";

const statuses = [
  "PENDING",
  "ASSIGNED",
  "ON_THE_WAY",
  "PICKED_UP",
  "COMPLETED",
  "CANCELLED",
] as const;

const priorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

const sorts = [
  "createdAt",
  "updatedAt",
  "priority",
  "status",
  "emergencyType",
] as const;

const orders = ["asc", "desc"] as const;

export default function AdminRequestHistory() {
  const { searchParams, updateParams } = useAdminUrlParams();

  const filters: AdminFilters = {
    page: positivePage(searchParams.get("page")),
    limit: 10,
    search: searchParams.get("search")?.trim().slice(0, 100) || undefined,
    status: validChoice(searchParams.get("status"), statuses) || undefined,
    priority:
      validChoice(searchParams.get("priority"), priorities) || undefined,
    sortBy: validChoice(searchParams.get("sortBy"), sorts, "createdAt"),
    sortOrder: validChoice(searchParams.get("sortOrder"), orders, "desc"),
  };

  const query = useAllAdminRequests(filters);
  const result = query.data?.data;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const get = (key: string) => String(form.get(key) || "").trim();

    updateParams({
      page: null,
      search: get("search").slice(0, 100) || null,
      status: validChoice(get("status"), statuses) || null,
      priority: validChoice(get("priority"), priorities) || null,
      sortBy:
        validChoice(get("sortBy"), sorts, "createdAt") === "createdAt"
          ? null
          : get("sortBy"),
      sortOrder: get("sortOrder") === "asc" ? "asc" : null,
    });
  }

  return (
    <section className={styles.panel}>
      <h2>All emergency requests</h2>

      <form key={searchParams.toString()} onSubmit={submit}>
        <div className={styles.grid}>
          <label>
            Search patient, location or emergency
            <input
              name="search"
              maxLength={100}
              defaultValue={filters.search || ""}
            />
          </label>

          <label>
            Status
            <select name="status" defaultValue={filters.status || ""}>
              <option value="">All statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>

          <label>
            Priority
            <select name="priority" defaultValue={filters.priority || ""}>
              <option value="">All priorities</option>
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sort by
            <select name="sortBy" defaultValue={filters.sortBy}>
              <option value="createdAt">Date</option>
              <option value="updatedAt">Updated date</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
              <option value="emergencyType">Emergency</option>
            </select>
          </label>

          <label>
            Order
            <select name="sortOrder" defaultValue={filters.sortOrder}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>
        </div>

        <div className={styles.row}>
          <button type="submit">Apply filters</button>

          <button
            type="button"
            onClick={() =>
              updateParams({
                page: null,
                search: null,
                status: null,
                priority: null,
                sortBy: null,
                sortOrder: null,
              })
            }
          >
            Reset
          </button>
        </div>
      </form>

      <QueryMessage
        loading={query.isPending}
        error={query.error}
        retry={() => void query.refetch()}
      />

      {query.isSuccess && result && (
        <>
          <p>Total requests: {result.pagination.total}</p>

          {result.data.length === 0 ? (
            <p>No matching requests on this page.</p>
          ) : (
            <div className={styles.scroll}>
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Emergency</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>

                <tbody>
                  {result.data.map((request) => (
                    <tr key={request.id}>
                      <td>{request.patient.name}</td>

                      <td>
                        {request.emergencyType}
                        <p className={styles.muted}>{request.pickupLocation}</p>
                      </td>

                      <td>{request.priority}</td>
                      <td>{request.status}</td>

                      <td>
                        <Link
                          href={`/dashboard/admin/emergency-requests/${request.id}`}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {result.pagination.total > 0 &&
            (filters.page || 1) > result.pagination.totalPages && (
              <button
                type="button"
                onClick={() =>
                  updateParams({
                    page: result.pagination.totalPages,
                  })
                }
              >
                Go to last page
              </button>
            )}

          <AdminPagination
            page={filters.page || 1}
            hasNextPage={result.pagination.hasNextPage}
            loading={query.isFetching}
            onChange={(page) =>
              updateParams({
                page: page === 1 ? null : page,
              })
            }
          />
        </>
      )}
    </section>
  );
}
