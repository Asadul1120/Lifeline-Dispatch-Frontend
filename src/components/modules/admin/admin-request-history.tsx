"use client";

import Link from "next/link";
import { useState } from "react";

import { useAllAdminRequests } from "@/hooks";
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
];

export default function AdminRequestHistory() {
  const [filters, setFilters] = useState<AdminFilters>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const query = useAllAdminRequests(filters);
  const result = query.data?.data;

  return (
    <section className={styles.panel}>
      <h2>All emergency requests</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);

          setFilters({
            page: 1,
            limit: 10,
            search: String(form.get("search") || "").trim() || undefined,
            status: String(form.get("status") || "") || undefined,
            priority: String(form.get("priority") || "") || undefined,
            sortBy: String(form.get("sortBy")),
            sortOrder: String(form.get("sortOrder")),
          });
        }}
      >
        <div className={styles.grid}>
          <label>
            Search patient, location or emergency
            <input name="search" />
          </label>

          <label>
            Status
            <select name="status">
              <option value="">All statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>

          <label>
            Priority
            <select name="priority">
              <option value="">All priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </label>

          <label>
            Sort by
            <select name="sortBy">
              <option value="createdAt">Date</option>
              <option value="priority">Priority</option>
            </select>
          </label>

          <label>
            Order
            <select name="sortOrder" defaultValue="desc">
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>
        </div>

        <div className={styles.row}>
          <button type="submit">Apply filters</button>
          <button
            type="reset"
            onClick={() =>
              setFilters({
                page: 1,
                limit: 10,
                sortBy: "createdAt",
                sortOrder: "desc",
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
            <p>No matching requests.</p>
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
                        <p className={styles.muted}>
                          {request.pickupLocation}
                        </p>
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

          <AdminPagination
            page={filters.page || 1}
            hasNextPage={result.pagination.hasNextPage}
            loading={query.isFetching}
            onChange={(page) => setFilters({ ...filters, page })}
          />
        </>
      )}
    </section>
  );
}