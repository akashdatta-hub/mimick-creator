import { Wifi } from "lucide-react";

const NotificationBanner = () => {
  return (
    <div className="w-full bg-notification text-white px-4 py-2">
      <div className="flex items-center justify-center space-x-2">
        <Wifi className="w-4 h-4" />
        <span className="text-sm font-medium">
          🎉 Offline Mode is here! You can now play without an internet connection.
        </span>
      </div>
    </div>
  );
};

export default NotificationBanner;