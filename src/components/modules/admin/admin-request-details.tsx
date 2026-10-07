"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useAdminRequestDetails } from "@/hooks";
import { AdminScreen, QueryMessage } from "./admin-ui";
import styles from "./admin.module.css";

export default function AdminRequestDetails() {
  const { id } = useParams<{ id: string }>();
  const query = useAdminRequestDetails(id);
  const request = query.data?.data;

  return (
    <AdminScreen title="Emergency request details">
      <p>
        <Link href="/dashboard/admin/emergency-requests">Back to requests</Link>
      </p>

      <QueryMessage
        loading={query.isPending}
        error={query.error}
        retry={() => void query.refetch()}
      />

      {query.isSuccess && request && (
        <>
          <section className={styles.panel}>
            <h2>{request.emergencyType}</h2>
            <p>Patient: {request.patient.name}</p>
            <p>Email: {request.patient.email}</p>
            <p>Pickup: {request.pickupLocation}</p>
            <p>Destination: {request.destination || "Not provided"}</p>
            <p>Priority: {request.priority}</p>
            <p>Status: {request.status}</p>
            <p>
              Requested: {new Date(request.createdAt).toLocaleString("en-BD")}
            </p>

            {request.status === "PENDING" && (
              <p>
                <Link href="/dashboard/admin/emergency-requests">
                  Open pending requests to assign an ambulance
                </Link>
              </p>
            )}
          </section>

          <section className={styles.panel}>
            <h2>Assigned ambulance</h2>

            {request.ambulance ? (
              <>
                <p>Vehicle: {request.ambulance.vehicleNumber}</p>
                <p>Type: {request.ambulance.type}</p>
                <p>Driver: {request.ambulance.driver.user.name}</p>
                <p>Email: {request.ambulance.driver.user.email}</p>
              </>
            ) : (
              <p>No ambulance assigned.</p>
            )}
          </section>

          <section className={styles.panel}>
            <h2>Trip</h2>

            {request.trip ? (
              <>
                <p>Status: {request.trip.status}</p>
                <p>
                  Started:{" "}
                  {request.trip.startTime
                    ? new Date(request.trip.startTime).toLocaleString("en-BD")
                    : "Not started"}
                </p>
                <p>
                  Ended:{" "}
                  {request.trip.endTime
                    ? new Date(request.trip.endTime).toLocaleString("en-BD")
                    : "Not ended"}
                </p>
              </>
            ) : (
              <p>No trip has been created.</p>
            )}
          </section>

          <section className={styles.panel}>
            <h2>Payment</h2>

            {request.payment ? (
              <>
                <p>Amount: BDT {request.payment.amount}</p>
                <p>Status: {request.payment.status}</p>
                <p>Gateway: {request.payment.gateway}</p>
                <p>
                  Transaction:{" "}
                  {request.payment.transactionId || "Not available"}
                </p>
              </>
            ) : (
              <p>No payment record.</p>
            )}
          </section>
        </>
      )}
    </AdminScreen>
  );
}
