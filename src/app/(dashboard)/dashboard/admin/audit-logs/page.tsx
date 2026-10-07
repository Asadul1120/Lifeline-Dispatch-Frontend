import AdminAuditLogs from "@/components/modules/admin/admin-audit-logs";
import { AdminPage } from "@/components/modules/admin/admin-shared";

export default function AdminAuditLogsPage() {
  return (
    <AdminPage
      title="Activity history"
      description="Review recorded actions across your dispatch system."
    >
      <AdminAuditLogs />
    </AdminPage>
  );
}
