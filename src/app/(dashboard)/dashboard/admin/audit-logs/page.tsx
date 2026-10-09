import { Suspense } from "react";

import AdminAuditLogs from "@/components/modules/admin/admin-audit-logs";

import { AdminPage } from "@/components/modules/admin/admin-shared";

export default function AdminAuditLogsPage() {
  return (
    <AdminPage
      title="Activity history"
      description="Review recorded actions across your dispatch system."
    >
      <Suspense fallback={<p>Loading audit logs...</p>}>
        <AdminAuditLogs />
      </Suspense>
    </AdminPage>
  );
}
