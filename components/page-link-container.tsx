"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const pageLinks = [
  {
    name: "Google",
    image: "/google.png",
    link: "https://www.google.pl/",
  },
  {
    name: "Gmail",
    image: "/gmail.png",
    link: "https://mail.google.com/",
  },
  {
    name: "Mapy Google",
    image: "/maps.png",
    link: "https://www.google.pl/maps/",
  },
  {
    name: "Dysk Google",
    image: "/drive.png",
    link: "https://drive.google.com/",
  },
  {
    name: "Github",
    image: "/github.png",
    link: "https://github.com/andrzej-herman?tab=repositories",
  },
  {
    name: "Azure",
    image: "/azure.png",
    link: "https://portal.azure.com/",
  },
  {
    name: "AWS",
    image: "/aws.png",
    link: "https://eu-north-1.console.aws.amazon.com/console/home?region=eu-north-1#",
  },
  {
    name: "Firebase",
    image: "/firebase.png",
    link: "https://console.firebase.google.com/",
  },
  {
    name: "YouTube",
    image: "/youtube.png",
    link: "https://www.youtube.com/",
  },
  {
    name: "Netflix",
    image: "/netflix.png",
    link: "https://www.netflix.com/browse",
  },
  {
    name: "Canal Plus Online",
    image: "/canal.png",
    link: "https://www.canalplus.com/pl/",
  },
  {
    name: "Facebook",
    image: "/facebook.png",
    link: "https://www.facebook.com/",
  },
  {
    name: "Onet",
    image: "/onet.png",
    link: "https://www.onet.pl/",
  },
  {
    name: "Wirtualny Dziekanat",
    image: "/san.png",
    link: "https://dziekanat.spoleczna.pl/",
  },
  {
    name: "Orange",
    image: "/orange.png",
    link: "https://www.orange.pl/twojekonto/zaloguj",
  },
  {
    name: "Plus",
    image: "/plus.png",
    link: "https://ssl.plusgsm.pl/ebok-web/basic/loginStep1.action?brandId=Postpaid",
  },
];

const PageLinkContainer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("herman");
  const onMouseEnter = (name: string) => {
    setDisplayText(name);
    setIsHovered(true);
  };
  const onMouseLeave = () => setIsHovered(false);

  const color = isHovered
    ? "text-white opacity-60 pt-4 font-medium text-lg tracking-tight"
    : "text-[#1F1F1F] pt-4 font-medium text-lg tracking-tight";

  return (
    <>
      <div className="pt-10 flex max-w-[300px] items-center justify-center flex-wrap">
        {pageLinks.map((p) => (
          <div
            key={p.name}
            className="opacity-60 m-[3px] hover:opacity-100"
            onMouseEnter={() => onMouseEnter(p.name)}
            onMouseLeave={onMouseLeave}
          >
            <Link href={p.link} target="_blank">
              <Image width="60" height="60" src={p.image} alt={p.name} />
            </Link>
          </div>
        ))}
      </div>
      <p className={color}>{displayText}</p>
    </>
  );
};

export default PageLinkContainer;
