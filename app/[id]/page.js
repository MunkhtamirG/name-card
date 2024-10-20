"use client";

import React from "react";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FaBriefcase, FaFacebook, FaPhoneAlt, FaViber } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";

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

  const generateVCard = () => {
    if (!user) return;

    // Manually construct the vCard string
    const vCardData = `
      BEGIN:VCARD
      VERSION:3.0
      FN:${user.name}
      ORG:REMAX/DIAMOND
      TITLE:${user.position}
      TEL;TYPE=WORK,VOICE:${user.workNumber}
      TEL;TYPE=CELL:${user.phone}
      EMAIL;TYPE=PREF,INTERNET:${user.email}
      URL:${user.web}
      END:VCARD
    `;

    // Encode the vCard data as a URI
    const encodedData = encodeURIComponent(vCardData.trim());
    const vCardUrl = `data:text/vcard;charset=utf-8,${encodedData}`;

    // Create a temporary anchor element and trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = vCardUrl;
    downloadLink.download = `${user.name}.vcf`;

    // Append the anchor to the body and trigger a click to download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up by removing the link
    downloadLink.remove();
  };

  return (
    <div className="bg h-screen p-8">
      {user ? (
        <div className="max-w-[425px] mx-auto">
          <Image
            src={user.photo}
            alt={user.name}
            width={100}
            height={100}
            priority={true}
            className="rounded-full border m-auto border-gray-300"
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

          <div className="bg-gray-300 rounded-lg p-4 mt-4 text-gray-800">
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

          <div className="bg-gray-300 rounded-lg p-4 mt-4 text-gray-800">
            <a
              href={`mailto:${user.email}`}
              className="flex items-center gap-4"
            >
              <MdEmail />
              <div>{user.email}</div>
            </a>
          </div>

          <div className="bg-gray-300 rounded-lg p-4 mt-4 text-gray-800">
            <a
              href={user.web}
              target="_blank"
              className="flex items-center gap-4"
              rel="noopener noreferrer"
            >
              <CiGlobe />
              <div>{user.web}</div>
            </a>
          </div>

          <button
            onClick={generateVCard}
            className="bg-[#003da5] rounded w-full mt-4 py-2"
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
