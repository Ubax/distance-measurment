function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function getCoordiantes(rootElementId) {
    let latitiude = toRadians(
        document.querySelector(`${rootElementId} .latitude`).value
    );
    if (
        document.querySelector(`${rootElementId} .latitude_direction`).value ==
        "S"
    )
        latitiude *= -1;
    let longtitude = toRadians(
        document.querySelector(`${rootElementId}  .longtitude`).value
    );
    if (
        document.querySelector(`${rootElementId}  .longtitude_direction`)
            .value == "W"
    )
        longtitude *= -1;
    return { latitiude, longtitude };
}

function calcDistance(from, to) {
    const R = 6371;
    let dLatitude = to.latitiude - from.latitiude;
    let dLongtitude = to.longtitude - from.longtitude;
    let a =
        Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
        Math.cos(from.latitiude) *
        Math.cos(to.latitiude) *
        Math.sin(dLongtitude / 2) *
        Math.sin(dLongtitude / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
