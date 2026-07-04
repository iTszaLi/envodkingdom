// Dedicated hero photography for individual services. Keys are the service id
// (see SERVICE_META in service-data.ts). Services without an entry keep their
// gradient banner/hero. Imported via the Vite @assets alias so the build emits
// hashed, optimizable asset URLs.
import ocean from "@assets/image_1783175444439.webp";
import air from "@assets/image_1783175451933.webp";
import gcc from "@assets/T1_1783175639406.webp";
import customs from "@assets/image_1783174016086.webp";
import warehousing from "@assets/image_1783175755090.webp";
import freightForwarding from "@assets/image_1783175872287.webp";
import projectCargo from "@assets/image_1783174152080.webp";
import exhibition from "@assets/image_1783173229953.webp";
import medicalPharma from "@assets/image_1783176444016.webp";
import breakbulk from "@assets/image_1783176090687.webp";
import oog from "@assets/image_1783176354422.webp";
import ataCarnet from "@assets/image_1783173712084.webp";

/** Service id → dedicated hero image URL. */
export const SERVICE_IMAGES: Record<number, string> = {
  1: ocean, // Ocean Freight
  2: air, // Air Freight
  3: gcc, // GCC Transportation
  4: customs, // Customs Clearance
  5: warehousing, // Warehousing & Distribution
  6: freightForwarding, // Freight Forwarding
  8: projectCargo, // Project Cargo Logistics
  11: exhibition, // Exhibition & Event Logistics
  12: medicalPharma, // Medical & Pharma Logistics
  15: breakbulk, // Breakbulk Shipping
  17: oog, // Oversized / OOG Cargo
  19: ataCarnet, // ATA Carnet Processing
};
