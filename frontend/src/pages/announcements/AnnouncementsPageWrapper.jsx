// FIX: Use curly braces { } for named import because the source file does not have a default export.
import { Announcement } from "../../components/features/announcements/AnnouncementsPage";

// Default export (usually for your Router)
export default function AnnouncementsPage() {
  return <Announcement />;
}

// Named export (so Home.jsx can import { Announcement } from this file)
export { Announcement };
