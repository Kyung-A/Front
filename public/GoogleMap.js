window.initMap = function () {};

function loadScript(src, position, id) {
  if (!window.google) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script.id = id;
    position.appendChild(script);
  }
}

const src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
loadScript(src, document.body, "google-maps-api");
