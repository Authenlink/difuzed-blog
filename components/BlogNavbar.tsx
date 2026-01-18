"use client";

import { useState } from "react";
import { ThemeToggle } from "./ui/ThemeToggle";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "./ui/resizable-navbar";
import Image from "next/image";
import Link from "next/link";

const navItems = [{ name: "Accueil", link: "/" }];

export function BlogNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop Navbar */}
      <NavBody>
        {/* Logo */}
        <Link
          href="/"
          className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
        >
          <Image
            src="/difuzed.png"
            alt="logo"
            width={30}
            height={30}
            priority
          />
          <span className="font-medium text-foreground">Difuzed</span>
        </Link>

        {/* Nav Items */}
        <NavItems items={navItems} />

        {/* Right side buttons */}
        <div className="relative z-20 flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* CTA Button */}
          <NavbarButton
            variant="dark"
            href="https://www.difuzed.io"
            target="_blank"
          >
            Website
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navbar */}
      <MobileNav>
        <MobileNavHeader>
          {/* Logo Mobile */}
          <Link
            href="/"
            className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
          >
            <Image
              src="/authenlink.png"
              alt="AuthenLink Logo"
              width={25}
              height={25}
              className="rounded-full"
            />
            <span className="font-bold text-lg text-foreground">
              AuthenLink Blog
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Mobile */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <MobileNavToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </MobileNavHeader>

        {/* Mobile Menu */}
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
          <NavbarButton
            variant="dark"
            href="https://www.authenlink.com"
            target="_blank"
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            Website
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
