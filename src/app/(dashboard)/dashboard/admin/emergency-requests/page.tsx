import EmergencyDispatchList from "@/components/modules/admin/emergency-dispatch-list";
import AdminRequestHistory from "@/components/modules/admin/admin-request-history";
import { AdminScreen } from "@/components/modules/admin/admin-ui";

export default function AdminEmergencyRequestsPage() {
  return (
    <AdminScreen title="Emergency requests">
      <div className="mb-8">
        <EmergencyDispatchList />
      </div>

      <AdminRequestHistory />
    </AdminScreen>
  );
}
