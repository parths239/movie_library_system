"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


interface UserProps {
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
}

const IDCard: React.FC<UserProps> = ({
  fullName,
  email,
  universityId,
  universityCard,
}) => {
  return (
    <div className="bg-gradient-to-b from-[#232839] to-[#12141D] p-6 rounded-xl shadow-xl w-[350px] mx-auto h-[38%]">
      {/* Top Section */}
      <div className="relative bg-[#2A2F3D] rounded-t-xl p-6">
        {/* Profile Image */}
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white font-bold text-lg">{fullName}</p>
            <p className="text-gray-300 text-sm">{email}</p>
            <p className="text-green-400 text-xs mt-1">✅ Verified Student</p>
          </div>
        </div>

        {/* University Info */}
        <div className="mt-4">
          <p className="text-gray-400 text-sm">University</p>
          <p className="text-white font-bold text-lg">JSM University</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-400 text-sm">University id</p>
          <p className="text-white font-bold text-lg">{universityId}</p>
        </div>
      </div>

      {/* Bottom Section */}
        {/* Details Section */}
        
          {/* <IKImage
            path={universityCard}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt="Book cover"
            className="rounded-sm object-fill"
            loading="lazy"
            lqip={{ active: true }}
            width={300}
            height={250}
          /> */}
    </div>
  );
};

export default IDCard;
