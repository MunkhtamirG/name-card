"use client";

import Head from "next/head";
import Image from "next/image";
import { saveAs } from "file-saver";
import { FaFacebook, FaMailBulk, FaMailchimp } from "react-icons/fa";
import { FaViber } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { EmailOutlined, Web } from "@mui/icons-material";
import NameCard from "./components/NameCard";

export default function Home() {
  const contactDetails = {
    name: "Х.Одмаа",
    position: "Админ",
    viber: "89502747",
    email: "info.diamond@remax.mn",
    web: "https://remax.mn/diamond",
    phone: "+97689502747",
    workNumber: "+97677327711",
    facebook: "https://www.facebook.com/remaxdiamond.mn",
    photo: "/IMG_0324.JPG", // Place your photo in the public folder
  };

  const generateVCard = () => {
    const vCardData = `
      BEGIN:VCARD
      VERSION:3.0
      FN:${contactDetails.name}
      TEL;TYPE=WORK,VOICE:${contactDetails.phone}
      EMAIL;TYPE=PREF,INTERNET:${contactDetails.email}
      URL:${contactDetails.socialLinks.linkedin}
      END:VCARD
    `;
    const blob = new Blob([vCardData], { type: "text/vcard" });
    saveAs(blob, `${contactDetails.name}.vcf`);
  };

  return (
    <>
      <Head>
        <title>{contactDetails.name} - Name Card</title>
        <meta name="description" content="Name card with contact details" />
      </Head>
      <div></div>
    </>
  );
}
