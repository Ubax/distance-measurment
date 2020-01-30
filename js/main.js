function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function toDegrees(radians) {
    return (radians / Math.PI) * 180;
}

function getCoordiantes(rootElementId) {
    let latitude = toRadians(
        document.querySelector(`${rootElementId} .latitude`).value
    );
    if (!latitude) return null;
    if (
        document.querySelector(`${rootElementId} .latitude_direction`).value ==
        "S"
    )
        latitude *= -1;
    let longtitude = toRadians(
        document.querySelector(`${rootElementId}  .longtitude`).value
    );
    if (!longtitude) return null;
    if (
        document.querySelector(`${rootElementId}  .longtitude_direction`)
            .value == "W"
    )
        longtitude *= -1;
    return { latitude, longtitude };
}

function calcDistance(from, to) {
    const R = 6371;
    let dLatitude = to.latitude - from.latitude;
    let dLongtitude = to.longtitude - from.longtitude;
    let a =
        Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
        Math.cos(from.latitude) *
        Math.cos(to.latitude) *
        Math.sin(dLongtitude / 2) *
        Math.sin(dLongtitude / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function avg(values) {
    return values.reduce((acc, current) => acc + current) / values.length
}

var markerFrom = null;
var markerTo = null;

document.querySelectorAll(".coordinates input").forEach(x => x.addEventListener("input", (e) => {
    let startingCoordinates = getCoordiantes("#starting_point");
    if (startingCoordinates === null) return;
    if (markerFrom === null) {
        markerFrom = L.marker([toDegrees(startingCoordinates.latitude), toDegrees(startingCoordinates.longtitude)]).addTo(map);
    } else {
        markerFrom.setLatLng(L.latLng(toDegrees(startingCoordinates.latitude), toDegrees(startingCoordinates.longtitude)))
    }
    let destinationCoordinates = getCoordiantes("#destination");

    let mapCoords = {}

    if (destinationCoordinates === null) {
        mapCoords = startingCoordinates;
    } else {
        if (markerTo === null) {
            markerTo = L.marker([toDegrees(destinationCoordinates.latitude), toDegrees(destinationCoordinates.longtitude)]).addTo(map);
        } else {
            markerTo.setLatLng(L.latLng(toDegrees(destinationCoordinates.latitude), toDegrees(destinationCoordinates.longtitude)))
        }
        mapCoords = {
            latitude: avg([toDegrees(startingCoordinates.latitude), toDegrees(destinationCoordinates.latitude)]),
            longtitude: avg([toDegrees(startingCoordinates.longtitude), toDegrees(destinationCoordinates.longtitude)])
        }
        let distance = parseInt(
            calcDistance(startingCoordinates, destinationCoordinates)
        );
        document.querySelector(
            "#result .distance .value"
        ).innerHTML = `${distance} km`;
    }

    map.panTo(
        new L.LatLng(
            mapCoords.latitude,
            mapCoords.longtitude
        )
    );


}))
