import { Home, Landmark, FilePlus2, User, PhoneCall } from "lucide-react";

export const SERVICE_MENU_DATA = {
  citizen: [
    "Property Tax",
    "Water Tax",
    "Birth Certificate",
    "Death Certificate",
    "Marriage Certificate",
    "Grievance Redressal",
    "Direct Benefit Transfer",
  ],
  business: [
    "Online Building Permissions",
    "Online Tenders",
    "Fire NOC",
    "Hawkers Management",
  ],
  other: ["TDR Proposal Received", "Vendor Form"],
};

export const NAV_LINKS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Available Services", href: "/citizen-services", icon: Landmark },
  {
    name: "PMC Services",
    href: "/services/new",
    icon: FilePlus2,
    type: "mega-menu",
    data: SERVICE_MENU_DATA,
  },
  { name: "About ", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: PhoneCall },
];
