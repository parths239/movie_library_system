"use client";

import { useState, useEffect, useTransition } from "react";
import { usePathname } from "next/navigation";

const LoadingSpinner = () => {
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    startTransition(() => {
      setTimeout(() => setLoading(false), 500); // Simulated delay
    });
  }, [pathname]);

  return (
    loading && (
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 
                   bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/EXPORT-BG.png')" }} // Ensure the image exists in `/public/images/`
      >
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  );
};

export default LoadingSpinner;