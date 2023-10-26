"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const pageLinks = [
  {
    name: "Google",
    imageLight: "/google-white.png",
    imageDark: "/google.png",
    link: "https://www.google.pl/",
  },
  {
    name: "Gmail",
    imageLight: "/gmail-white.png",
    imageDark: "/gmail.png",
    link: "https://mail.google.com/",
  },
  {
    name: "Mapy Google",
    imageLight: "/maps-white.png",
    imageDark: "/maps.png",
    link: "https://www.google.pl/maps/",
  },
  {
    name: "Dysk Google",
    imageLight: "/drive-white.png",
    imageDark: "/drive.png",
    link: "https://drive.google.com/",
  },
  {
    name: "Github",
    imageLight: "/github-white.png",
    imageDark: "/github.png",
    link: "https://github.com/andrzej-herman?tab=repositories",
  },
  {
    name: "Azure",
    imageLight: "/azure-white.png",
    imageDark: "/azure.png",
    link: "https://portal.azure.com/",
  },
  {
    name: "AWS",
    imageLight: "/aws-white.png",
    imageDark: "/aws.png",
    link: "https://eu-north-1.console.aws.amazon.com/console/home?region=eu-north-1#",
  },
  {
    name: "Firebase",
    imageLight: "/firebase-white.png",
    imageDark: "/firebase.png",
    link: "https://console.firebase.google.com/",
  },
  {
    name: "Webio",
    imageLight: "/webio-white.png",
    imageDark: "/webio.png",
    link: "https://panel.webio.pl/",
  },
  {
    name: "Vercel",
    imageLight: "/vercel-white.png",
    imageDark: "/vercel.png",
    link: "https://vercel.com/dashboard",
  },
  {
    name: "Clerk Auth",
    imageLight: "/clerk-white.png",
    imageDark: "/clerk.png",
    link: "https://dashboard.clerk.com/",
  },
  {
    name: "YouTube",
    imageLight: "/youtube-white.png",
    imageDark: "/youtube.png",
    link: "https://www.youtube.com/",
  },
  {
    name: "Netflix",
    imageLight: "/netflix-white.png",
    imageDark: "/netflix.png",
    link: "https://www.netflix.com/browse",
  },
  {
    name: "Canal Plus Online",
    imageLight: "/canal-white.png",
    imageDark: "/canal.png",
    link: "https://www.canalplus.com/pl/",
  },
  {
    name: "Facebook",
    imageLight: "/facebook-white.png",
    imageDark: "/facebook.png",
    link: "https://www.facebook.com/",
  },
  {
    name: "Onet",
    imageLight: "/onet-white.png",
    imageDark: "/onet.png",
    link: "https://www.onet.pl/",
  },
  {
    name: "Wirtualny Dziekanat",
    imageLight: "/san-white.png",
    imageDark: "/san.png",
    link: "https://dziekanat.spoleczna.pl/",
  },
  {
    name: "Allegro",
    imageLight: "/allegro-white.png",
    imageDark: "/allegro.png",
    link: "https://allegro.pl/",
  },
  {
    name: "OLX",
    imageLight: "/olx-white.png",
    imageDark: "/olx.png",
    link: "https://www.olx.pl/",
  },
  {
    name: "Orange",
    imageLight: "/orange-white.png",
    imageDark: "/orange.png",
    link: "https://www.orange.pl/twojekonto/zaloguj",
  },
  {
    name: "Plus",
    imageLight: "/plus-white.png",
    imageDark: "/plus.png",
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
    ? "dark:text-white opacity-80 dark:opacity-60 pt-3 font-medium text-base tracking-tight"
    : "text-white dark:text-[#1F1F1F] pt-3 font-medium text-base tracking-tight";

  return (
    <>
      <div className="pt-6 flex max-w-[350px] items-center justify-center flex-wrap">
        {pageLinks.map((p) => (
          <div
            key={p.name}
            className="opacity-70 dark:opacity-60 hover:opacity-100 dark:hover:opacity-100 m-[2px]"
            onMouseEnter={() => onMouseEnter(p.name)}
            onMouseLeave={onMouseLeave}
          >
            <Link href={p.link} target="_blank" className="dark:hidden">
              <Image width="45" height="45" src={p.imageLight} alt={p.name} />
            </Link>
            <Link href={p.link} target="_blank" className="hidden dark:block">
              <Image width="45" height="45" src={p.imageDark} alt={p.name} />
            </Link>
          </div>
        ))}
      </div>
      <p className={color}>{displayText}</p>
    </>
  );
};

export default PageLinkContainer;
