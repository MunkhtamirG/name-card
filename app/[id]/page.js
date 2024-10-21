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
    id: "odmaa",
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
    id: " ",
    name: "Д.Одонтуяа",
    photo: "/IMG_0317.JPG",
    position: "Агент",
    phone: "+976 95931575",
    workNumber: "+976 77327711",
    web: "https://www.remax.mn/diamond",
    facebook: "https://www.facebook.com/profile.php?id=61552809536526",
    email: "odontuya.da@remax.mn",
  },
  {
    id: "tamir",
    name: "М.Тамир",
    photo: "/IMG_0318.JPG",
    position: "Силвер агент",
    phone: "+976 95563773",
    workNumber: "+976 77327711",
    web: "https://www.remax.mn/diamond",
    facebook: "https://www.facebook.com/profile.php?id=61565561953663",
    email: "tamir.m@remax.mn",
    second: "Борлуулалт хариуцсан захирал",
  },
  {
    id: "azzaya",
    name: "Л.Аззаяа",
    photo: "/IMG_0316.JPG",
    position: "Агент",
    phone: "+976 90322379",
    workNumber: "+976 77327711",
    web: "https://www.remax.mn/diamond",
    facebook: "https://www.facebook.com/profile.php?id=61557408764228",
    email: "azzaya.l@remax.mn",
  },
  {
    id: "munkhzul",
    name: "Ч.Мөнхзул",
    photo: "/IMG_0315.JPG",
    position: "Агент",
    phone: "+976 90322379",
    workNumber: "+976 77327711",
    web: "https://www.remax.mn/diamond",
    facebook: "https://www.facebook.com/profile.php?id=61558756421546",
    email: "munkhzul.chi@remax.mn",
  },
];

const Page = ({ params }) => {
  const user = data.find((e) => e.id === params.id) || null;

  const generateVCard = () => {
    if (!user) return;

    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${user.name}
PHOTO;TYPE=JPEG;VALUE=URI:${window.location.origin}${user.photo}
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
            className="rounded-full border mx-auto border-gray-400 object-cover max-h-[120px]"
          />
          <div className="text-2xl font-bold">{user.name}</div>
          <div>{user.position}</div>
          {user.second && <div>{user.second}</div>}
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
