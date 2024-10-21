"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import {
  FaBriefcase,
  FaFacebook,
  FaPhoneAlt,
  FaViber,
  FaGlobe,
} from "react-icons/fa";

const data = [
  {
    id: "1",
    name: "Х.Одмаа",
    photo: "/IMG_0324.JPG",
    position: "Админ",
    phone: "+976 89502747",
    workNumber: "+976 77327711",
    web: "https://www.remax.mn/diamond",
    facebook: "https://www.facebook.com/remaxdiamond.mn",
    email: "info.diamond@remax.mn",
  },
  {
    id: "2",
    name: "Х.ASDASDAS",
    photo: "/download.jpeg",
    position: "Agent",
    phone: "+976 123123123",
    workNumber: "+123123123",
    web: "https://www.remax.mn/diamond",
    facebook: "https://www.facebook.com/remaxdiamond.mn",
    email: "info.diamond@remax.mn",
  },
];

const Page = ({ params }) => {
  const user = data.find((e) => e.id === params.id) || null;
  const [downloadLink, setDownloadLink] = useState("");

  const generateVCard = async () => {
    if (!user) return;

    // Fetch the image as a Blob
    const response = await fetch(`${window.location.origin}${user.photo}`);
    const imageBlob = await response.blob();

    // Convert the Blob to a base64 string
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result.split(",")[1];

      const vCardData = `
  BEGIN:VCARD
  VERSION:3.0
  FN:${user.name}
  PHOTO;ENCODING=b;TYPE=JPEG:${base64data}
  TEL;TYPE=WORK,VOICE:${user.workNumber}
  TEL;TYPE=CELL,VOICE:${user.phone}
  EMAIL:${user.email}
  URL:${user.web}
  END:VCARD
      `.trim();

      const blob = new Blob([vCardData], { type: "text/vcard" });
      const url = URL.createObjectURL(blob);

      // Try to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${user.name}.vcf`;
      a.click();
    };
  };
  return (
    <div className="bg h-screen p-8 flex justify-center items-center">
      {user ? (
        <div className="max-w-[425px]">
          <Image
            src={user.photo}
            alt={user.name}
            width={120}
            height={120}
            priority={true}
            className="rounded-full border mx-auto border-gray-400"
          />
          <div className="text-2xl font-bold">{user.name}</div>
          <div>{user.position}</div>
          <div className="text-gray-400 text-sm">REMAX/DIAMOND</div>

          <div className="flex justify-center gap-4 items-center mt-4">
            <a href={`tel:${user.phone}`} className="bg-[#e60e16] p-2 rounded">
              <FaPhoneAlt />
            </a>
            <a
              href={`viber://add?number=${user.phone}`}
              className="bg-[#e60e16] p-2 rounded"
            >
              <FaViber />
            </a>
            <a
              href={user.facebook}
              target="_blank"
              className="bg-[#e60e16] p-2 rounded"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
          </div>

          <div className="bg-gray-300 rounded-lg p-4 mt-4 text-gray-800 ">
            <a
              href={`tel:${user.workNumber}`}
              className="flex items-center gap-4"
            >
              <FaBriefcase />
              <div>{user.workNumber}</div>
            </a>
            <div className="border-b border-gray-500 rounded my-2"></div>
            <a href={`tel:${user.phone}`} className="flex items-center gap-4">
              <FaPhoneAlt />
              <div>{user.phone}</div>
            </a>
          </div>

          <div className="bg-gray-300 rounded-lg p-4 mt-4 text-gray-800 ">
            <a
              href={`mailto:${user.email}`}
              className="flex items-center gap-4"
            >
              <MdEmail />
              <div>{user.email}</div>
            </a>
          </div>

          <div className="bg-gray-300 rounded-lg p-4 mt-4 text-gray-800 ">
            <a
              href={user.web}
              target="_blank"
              className="flex items-center gap-4"
              rel="noopener noreferrer"
            >
              <FaGlobe />
              <div>{user.web}</div>
            </a>
          </div>

          <button
            onClick={generateVCard}
            className="bg-[#003da5] rounded w-full mt-4 py-2 font-bold text-white"
          >
            Хадгалах
          </button>
        </div>
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

export default Page;
