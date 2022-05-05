import Courier from "./courier";

interface Tracking {
  courier: Courier;
  trackingNumber: string;
  zipCode: string;
  destinationCountryIso3: string;
  returned?: boolean;
  cancelled?: boolean;
  notificationsInactive?: boolean;
}

export const trackingToJson = ({
  courier,
  trackingNumber,
  zipCode,
  destinationCountryIso3,
  returned,
  cancelled,
  notificationsInactive,
}: Tracking) =>
  JSON.stringify({
    payload: {
      tracking_number: trackingNumber,
      courier: courier,
      zip_code: zipCode,
      destination_country_iso3: destinationCountryIso3,
      return: returned,
      cancelled: cancelled,
      notificationsInactive: notificationsInactive,
    },
  });

export default Tracking;
