export const getDistance = (humanCoord, carCoord) => {
  let R = 6371e3;
  let phi1 = (humanCoord[0] * Math.PI) / 180;
  let phi2 = (carCoord[0] * Math.PI) / 180;
  let dphi = ((carCoord[0] - humanCoord[0]) * Math.PI) / 180;
  let dlambda = ((carCoord[1] - humanCoord[1]) * Math.PI) / 180;
  let a =
    Math.pow(Math.sin(dphi / 2), 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.pow(Math.sin(dlambda / 2), 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
};
