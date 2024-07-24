"use client";
import { useEffect, useCallback, useRef, useState } from "react";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);

  const initMap = useCallback(() => {
    if (window.google && !map) {
      const curLocation = {
        lat: 37.5665,
        lng: 126.978,
      };

      // navigator.geolocation.getCurrentPosition(function (pos) {
      //   const curLocation = {
      //     lat: pos.coords.latitude,
      //     lng: pos.coords.longitude,
      //   };
      // });

      const map = new window.google.maps.Map(mapRef.current, {
        center: curLocation,
        zoom: 13,
      });

      setMap(map);
    }
  }, [map]);

  useEffect(() => {
    const scriptId = "google-maps-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.defer = true;
      script.async = true;
      script.onerror = () => {
        console.error("Error: loading Google Maps script");
      };

      document.head.appendChild(script);

      script.onload = () => {
        if (window.google) initMap();
      };
    } else {
      if (window.google) initMap();
    }

    window.initMap = initMap;
    return () => {
      window.initMap = null;
    };
  }, [initMap]);

  return (
    <div
      ref={mapRef}
      id="map"
      className="min-h-[calc(100vh-144px)] w-full"
    ></div>
  );
}
