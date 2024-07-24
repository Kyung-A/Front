"use client";
import { useEffect, useCallback, useRef, useState } from "react";

export default function My() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);

  const initMap = useCallback(() => {
    if (window.google && !map) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        const curLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        const map = new window.google.maps.Map(mapRef.current, {
          center: curLocation,
          zoom: 13,
        });

        setMap(map);
      });
    }
  }, []);

  useEffect(() => {
    window.initMap = initMap;

    if (typeof window !== undefined) {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.defer = true;
        document.head.appendChild(script);
      } else {
        initMap();
      }
    }

    return () => {
      window.initMap = null;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      id="map"
      className="min-h-[calc(100vh-144px)] w-full"
    ></div>
  );
}
