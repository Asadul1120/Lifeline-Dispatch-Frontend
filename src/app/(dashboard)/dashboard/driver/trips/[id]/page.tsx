import DriverTripDetails from "@/components/modules/driver/driver-trip-details";

export default async function DriverTripDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DriverTripDetails tripId={id} />;
}
