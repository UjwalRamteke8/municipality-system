import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitle = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    // This updates the text in the browser tab
    document.title = title
      ? `${title} | Municipal Corporation`
      : "Smart City Portal";
  }, [location, title]);

  return null; // This component doesn't render anything visible
};

export default PageTitle;
