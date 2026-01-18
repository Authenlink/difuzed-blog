"use client";

import { FaGlobe } from "react-icons/fa";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="footer">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Vous avez aimé ces <span className="text-primary">articles</span>?
        </h1>
        <p className="text-muted-foreground md:mt-10 my-5 text-center">
          Découvrez comment nous pouvons vous aider à{" "}
          <span className="text-primary">développer</span> votre présence en
          ligne
        </p>

        {/* Bouton vers le site web */}
        <Button
          onClick={() => {
            window.open("https://www.difuzed.io", "_blank");
          }}
          size="lg"
        >
          <FaGlobe />
          Visiter notre site web
        </Button>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-4">
        <p className="md:text-base text-sm md:font-normal font-light text-muted-foreground">
          Copyright © 2025 Difuzed
        </p>
        <a
          href="https://www.difuzed.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          difuzed.io
        </a>
      </div>
    </footer>
  );
};

export default Footer;
