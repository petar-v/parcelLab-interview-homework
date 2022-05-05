import Tracking from "../parcelLab/types/tracking";

export const parsePayload = (payload: string): Tracking => {
  const split = payload.split("|");
  if (split.length < 4) {
    throw new Error("Not enough parameters");
  }

  const returned = split.length > 4 ? split[4] === "true" : false;
  const cancelled = split.length > 5 ? split[5] === "true" : false;
  const notificationsInactive = split.length > 6 ? split[6] === "true" : false;

  return {
    courier: split[0],
    trackingNumber: split[1],
    zipCode: split[2],
    destinationCountryIso3: split[3],
    returned: returned,
    cancelled: cancelled,
    notificationsInactive: notificationsInactive,
  };
};
