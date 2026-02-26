import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { getNearbyVendors } from "../../api/vendor.api";

const makePinIcon = (bgColor, borderColor) =>
  L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:18px;height:18px;">
        <span style="
          position:absolute;
          inset:0;
          border-radius:9999px;
          background:${bgColor};
          border:2px solid ${borderColor};
          box-shadow:0 0 0 4px rgba(255,255,255,0.85);
        "></span>
      </div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  });

const userIcon = makePinIcon("#2563eb", "#1d4ed8");
const vendorIcon = makePinIcon("#16a34a", "#15803d");

const NearbyVendorsMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [error, setError] = useState("");

  const center = useMemo(() => {
    if (!userLocation) return [17.385, 78.4867];
    return [userLocation.lat, userLocation.lng];
  }, [userLocation]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setUserLocation({ lat, lng });
        setLoadingLocation(false);

        setLoadingVendors(true);
        setError("");
        try {
          const res = await getNearbyVendors(lat, lng);
          setVendors(res.data?.vendors || []);
        } catch (err) {
          setError(err.response?.data?.message || "Failed to fetch nearby vendors.");
        } finally {
          setLoadingVendors(false);
        }
      },
      (geoError) => {
        setLoadingLocation(false);
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setError("Location permission denied. Please allow location access to find nearby vendors.");
          return;
        }
        setError("Unable to detect your location. Please try again.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  if (loadingLocation) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Detecting your location...
      </div>
    );
  }

  if (error && !userLocation) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={true}
          className="h-[420px] w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {userLocation && (
            <>
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                <Popup>
                  <div className="text-sm font-medium">Your Location</div>
                </Popup>
              </Marker>

              <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={10000}
                pathOptions={{ color: "#2563eb", fillColor: "#60a5fa", fillOpacity: 0.15 }}
              />
            </>
          )}

          {vendors.map((vendor) => (
            <Marker
              key={vendor._id}
              position={[vendor.location.lat, vendor.location.lng]}
              icon={vendorIcon}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{vendor.name}</p>
                  <p className="text-slate-600">Distance: {vendor.distanceKm} km</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>{loadingVendors ? "Loading nearby vendors..." : `Nearby vendors: ${vendors.length}`}</span>
        <span>Radius: 10 km</span>
      </div>
    </div>
  );
};

export default NearbyVendorsMap;
