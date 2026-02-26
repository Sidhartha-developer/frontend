import UserLayout from "../../components/layout/UserLayout";
import NearbyVendorsMap from "../../components/maps/NearbyVendorsMap";

const NearbyVendorsPage = () => {
  return (
    <UserLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-1">Nearby Vendors</h1>
        <p className="text-sm text-gray-500">
          Find approved active vendors within 10 km of your current location.
        </p>
      </div>

      <NearbyVendorsMap />
    </UserLayout>
  );
};

export default NearbyVendorsPage;
