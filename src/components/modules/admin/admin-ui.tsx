import type { ReactNode } from "react";
import { getMessage } from "@/lib/utils";
import styles from "./admin.module.css";

export function AdminScreen({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.page}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

export function QueryMessage({
  loading,
  error,
  retry,
}: {
  loading: boolean;
  error: unknown;
  retry: () => void;
}) {
  if (loading) {
    return <p role="status">Loading...</p>;
  }

  if (error) {
    return (
      <div role="alert" className={styles.row}>
        <p className={styles.error}>
          {getMessage(error, "Could not load information.")}
        </p>
        <button type="button" onClick={retry}>
          Retry
        </button>
      </div>
    );
  }

  return null;
}

export function AdminPagination({
  page,
  hasNextPage,
  loading,
  onChange,
}: {
  page: number;
  hasNextPage: boolean;
  loading: boolean;
  onChange: (page: number) => void;
}) {
  return (
    <div className={styles.row}>
      <button
        type="button"
        disabled={page <= 1 || loading}
        onClick={() => onChange(page - 1)}
      >
        Previous
      </button>

      <span>Page {page}</span>

      <button
        type="button"
        disabled={!hasNextPage || loading}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}