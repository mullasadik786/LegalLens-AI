import { CarrierTrackingInfo, ShipmentStatus } from '../../src/types/ecommerce';

// Real-world simulated carrier data repository
export const CARRIER_RECORDS: Record<string, CarrierTrackingInfo> = {
  // Scenario A: DELIVERED
  'FDX-992014-DELIV': {
    trackingNumber: 'FDX-992014-DELIV',
    carrier: 'FedEx',
    status: 'DELIVERED',
    currentLocation: 'Springfield, OR',
    deliveredAt: '2026-09-15 14:22 PST',
    proofDetails: {
      deliveredTo: 'Front Porch / Mailbox Enclosure',
      signedBy: 'Direct Release (Photo Captured on file: IMG_8821.jpg)',
      locationNote: 'Placed behind porch pillar safely out of street view'
    },
    history: [
      { timestamp: '2026-09-13 08:00', location: 'Portland, OR Hub', status: 'In Transit', detail: 'Departed shipping facility' },
      { timestamp: '2026-09-15 06:15', location: 'Springfield, OR Depot', status: 'Out for Delivery', detail: 'Loaded onto local delivery vehicle' },
      { timestamp: '2026-09-15 14:22', location: 'Springfield, OR', status: 'Delivered', detail: 'Left at front porch' }
    ]
  },

  // Scenario B: IN-TRANSIT / DELAYED
  'UPS-339102-TRANS': {
    trackingNumber: 'UPS-339102-TRANS',
    carrier: 'UPS',
    status: 'IN-TRANSIT',
    currentLocation: 'Boise Sorting Facility, ID',
    estimatedDelivery: 'September 24, 2026 by end of day',
    history: [
      { timestamp: '2026-09-19 11:30', location: 'Seattle Logistics Center', status: 'Origin Scan', detail: 'Package received from merchant' },
      { timestamp: '2026-09-20 22:45', location: 'Boise Sorting Facility, ID', status: 'In Transit', detail: 'Weather delay noted in mountain pass corridor. Shipment re-routed via northern transit lane.' }
    ]
  },

  // Scenario C: LOST
  'USPS-884019-LOST': {
    trackingNumber: 'USPS-884019-LOST',
    carrier: 'USPS',
    status: 'LOST',
    currentLocation: 'Chicago International Distribution Center (Last scanned 12 days ago)',
    exceptionReason: 'Courier Investigation #USPS-INV-9920 closed: Parcel declared officially unrecoverable/lost in sorting conveyor incident.',
    history: [
      { timestamp: '2026-09-06 14:10', location: 'San Francisco, CA', status: 'Accepted', detail: 'Package accepted at post office' },
      { timestamp: '2026-09-09 03:22', location: 'Chicago Distribution Center', status: 'Exception', detail: 'Sorting equipment jam report logged' },
      { timestamp: '2026-09-17 09:00', location: 'National Claims Bureau', status: 'Lost', detail: 'Official Carrier Declaration: Shipment declared LOST' }
    ]
  },

  // Scenario C: EXCEPTION
  'DHL-552091-EXCP': {
    trackingNumber: 'DHL-552091-EXCP',
    carrier: 'DHL',
    status: 'EXCEPTION',
    currentLocation: 'East Coast Transit Hub',
    exceptionReason: 'Severe transit vehicle incident. Freight contents sustained total structural loss. Carrier notice issued to merchant for full settlement.',
    history: [
      { timestamp: '2026-09-03 09:15', location: 'Boston Origin Depot', status: 'Departed', detail: 'En route to hub' },
      { timestamp: '2026-09-05 16:40', location: 'Interstate Hub 4', status: 'Exception', detail: 'Carrier officially confirmed consignment lost due to transit accident' }
    ]
  }
};

/**
 * TOOL 2: check_shipping_carrier_api
 * Fetches the real-time physical status of the shipment from the carrier API.
 */
export async function checkShippingCarrierApiTool(params: {
  tracking_number: string;
}): Promise<{
  success: boolean;
  carrierFound: boolean;
  trackingInfo?: CarrierTrackingInfo;
  error?: string;
}> {
  const normalizedTracking = (params.tracking_number || '').trim().toUpperCase();
  const info = CARRIER_RECORDS[normalizedTracking];

  if (!info) {
    return {
      success: false,
      carrierFound: false,
      error: `Tracking number "${normalizedTracking}" not found in carrier systems.`
    };
  }

  return {
    success: true,
    carrierFound: true,
    trackingInfo: info
  };
}
