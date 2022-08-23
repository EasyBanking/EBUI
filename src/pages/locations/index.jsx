import Nav from "../../components/nav";
import { Button, Container, Input, Text } from "@nextui-org/react";
import { useState } from "react";
import HttpClient from "../../Http-Client";
import { LoaderWrapper } from "../../components/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useRef } from "react";
import marker from "./map-marker.svg";

const iconPerson = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  iconSize: new L.Point(60, 75),
});

const getUserLocation = function () {
  return new Promise((res, rej) => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (pos) => {
          res([pos.coords.latitude, pos.coords.longitude]);
        },
        rej,
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      rej("windows doest not support geoLocation api");
    }
  });
};

export default function Locations() {
  const [loader, setLoader] = useState(false);
  const router = useNavigate();
  const [locations, setLocations] = useState([]);

  const [origin, setOrigin] = useState([]);

  const markerRef = useRef(null);

  const map = useRef(null);

  useEffect(() => {
    HttpClient.get("/location?geojson=1")
      .then(({ data }) => {
        setLocations(data?.locations);
        setLoader(true);
      })
      .catch((err) => {
        setLoader(true);
        router("/", { replace: true });
      });
  }, []);

  useEffect(() => {
    getUserLocation()
      .then((cords) => {
        setOrigin(cords);
      })
      .catch((err) => {
        router("/", { state: err.message });
      });
  }, []);

  if (!loader && !origin?.length) {
    return <LoaderWrapper />;
  }

  return (
    <section className="bg-light">
      <Nav />
      <Container sm>
        <section className="mt-5 min-h-screen">
          <Text className="text-center" h2>
            find our locations
          </Text>

          <div className="flex flex-col mb-2">
            <label>select a location</label>
            <select
              className="select select-bordered"
              onChange={(v) => {
                map?.current?.flyTo(v?.target?.value?.split(","));
              }}
            >
              {locations.map((l, i) => {
                return (
                  <option value={l?.geometry?.coordinates?.reverse()?.join()}>
                    {l?.properties?.addresse}
                  </option>
                );
              })}
            </select>
          </div>
          {origin.length ? (
            <MapContainer
              center={origin}
              ref={map}
              zoom={12}
              style={{ height: 400 }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {locations.map((l) => {
                return (
                  <Marker
                    icon={iconPerson}
                    ref={markerRef}
                    position={l?.geometry?.coordinates}
                  >
                    <Popup className="z-50">{l?.properties?.addresse}</Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          ) : null}
        </section>
      </Container>
    </section>
  );
}
