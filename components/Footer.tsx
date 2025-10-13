"use client";

import { FaGlobe } from "react-icons/fa";
import MagicButton from "./ui/magicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="footer">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Vous avez aimé ces <span className="text-primary">articles</span>?
        </h1>
        <p className="text-muted-foreground md:mt-10 my-5 text-center">
          Découvrez comment nous pouvons vous aider à{" "}
          <span className="text-primary">développer</span> votre présence en ligne
        </p>

        {/* Bouton vers le site web */}
        <MagicButton
          title="Visiter notre site web"
          icon={<FaGlobe />}
          position="right"
          handleClick={() => {
            window.open("https://www.authenlink.com", "_blank");
          }}
        />
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-4">
        <p className="md:text-base text-sm md:font-normal font-light text-muted-foreground">
          Copyright © 2024 Authenlink
        </p>
        <a
          href="https://www.authenlink.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          authenlink.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
