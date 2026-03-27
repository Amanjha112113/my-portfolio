import { useState, useEffect } from "react";
import "./styles/CookieBanner.css";

const CookieBanner = () => {
  const [showCookie, setShowCookie] = useState(() => {
    // Show banner only if consent not previously given
    return !localStorage.getItem("cookieConsent");
  });

  useEffect(() => {
    // Ensure banner visibility respects stored consent on mount
    if (localStorage.getItem("cookieConsent")) {
      setShowCookie(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowCookie(false);
  };
  
  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowCookie(false);
  };

  if (!showCookie) return null;

  return (
    <div className="cookie-banner-wrapper">
      <div className="cookie-banner">
        <p className="cookie-text">
          This website uses cookies and similar technologies to ensure functionality, evaluate website usage, and to serve marketing content. Visit our <a href="/cookie-policy" className="cookie-link">Cookie Policy</a> and <a href="/privacy-policy" className="cookie-link">Privacy Policy</a> for more information.
        </p>
        <div className="cookie-actions">
          <button className="cookie-reject" onClick={handleReject}>Reject Cookies</button>
          <button className="cookie-accept" onClick={handleAccept}>Accept Cookies</button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
