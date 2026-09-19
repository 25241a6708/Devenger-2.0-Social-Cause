import { divIcon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { categoryMeta, HYDERABAD, type ImpactLocation } from "@/lib/impact-data";

function makeMarker(color: string) {
  return divIcon({
    className: "impact-marker",
    html: `<span class="marker-pin" style="background:${color}"><span class="marker-dot"></span></span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30],
  });
}

export default function ImpactMap({
  items,
  onSelect,
  zoom = 13,
}: {
  items: ImpactLocation[];
  onSelect: (location: ImpactLocation) => void;
  zoom?: number;
}) {
  return (
    <MapContainer
      center={HYDERABAD}
      zoom={zoom}
      scrollWheelZoom
      className="h-full w-full"
      aria-label="Map of community needs, care homes and verified contributors"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      {items.map((location) => (
        <Marker
          key={location.id}
          position={location.position}
          icon={makeMarker(categoryMeta[location.category].color)}
          eventHandlers={{ click: () => onSelect(location) }}
        />
      ))}
    </MapContainer>
  );
}
