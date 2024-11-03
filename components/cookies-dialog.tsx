"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CookiesDialog = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("cookieConsent");
    if (!cookieChoice) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    // Add your cookie setting logic here
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
    // Add your cookie clearing logic here
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 max-w-sm bg-white p-4 shadow-lg rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="text-sm text-gray-700">
          We use cookies to enhance your experience. By continuing to visit this
          site, you agree to our use of cookies.
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleDecline}>
            Decline
          </Button>
          <Button onClick={handleAccept}>Accept</Button>
        </div>
      </div>
    </div>
  );
};

export default CookiesDialog;
