import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  CreditCard,
  Smartphone,
} from "lucide-react";
import React from "react";

// Newsletter Hero Section Component (matches your HTML design exactly)

// Footer Link Component
const FooterLink = ({
  href,
  children,
  className = "",
  title,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}) => {
  return (
    <Link
      href={href}
      className={`hover:text-gray-300 transition-colors duration-200 ${className}`}
      title={title}
    >
      {children}
    </Link>
  );
};

// Footer Section Component
const FooterSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div>
      <h3 className="font-semibold mb-4 text-lg">{title}</h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
};

// Shop Links Component
const ShopLinks = () => {
  const shopLinks = [
    { href: "/collections", label: "Collections" },
    { href: "/products", label: "New Arrivals" },
    { href: "/sale", label: "Sale" },
  ];

  return (
    <FooterSection title="Shop">
      {shopLinks.map((link) => (
        <li key={link.href}>
          <FooterLink href={link.href}>{link.label}</FooterLink>
        </li>
      ))}
    </FooterSection>
  );
};

// Customer Care Links Component
const CustomerCareLinks = () => {
  const careLinks = [
    { href: "/contact", label: "Contact NeXar" },
    { href: "/shipping-returns", label: "Shipping & Returns" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About NeXar" },
  ];

  return (
    <FooterSection title="Customer Care">
      {careLinks.map((link) => (
        <li key={link.href}>
          <FooterLink href={link.href}>{link.label}</FooterLink>
        </li>
      ))}
    </FooterSection>
  );
};

// Social Media Links Component (Icons Only)
const SocialMediaLinks = () => {
  const socialLinks = [
    {
      href: "https://instagram.com",
      label: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
    },
    {
      href: "https://facebook.com",
      label: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
    },
    {
      href: "https://youtube.com",
      label: "Youtube",
      icon: <Youtube className="w-6 h-6" />,
    },
    {
      href: "https://twitter.com",
      label: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
    },
  ];

  return (
    <FooterSection title="Follow Us">
      <div className="flex  gap-4">
        {socialLinks.map((link) => (
          <FooterLink
            key={link.href}
            href={link.href}
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200"
            title={link.label}
          >
            {link.icon}
          </FooterLink>
        ))}
      </div>
    </FooterSection>
  );
};

// Payment Methods Component
const PaymentMethods = () => {
  const paymentMethods = [
    {
      name: "Visa",
      icon: <CreditCard className="w-6 h-6" />,
      bgColor: "bg-blue-600",
    },
    {
      name: "MasterCard",
      icon: <CreditCard className="w-6 h-6" />,
      bgColor: "bg-red-600",
    },
    {
      name: "Vodafone Cash",
      icon: <Smartphone className="w-6 h-6" />,
      bgColor: "bg-red-500",
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-400">We Accept:</span>
      <div className="flex gap-2">
        {paymentMethods.map((method) => (
          <div
            key={method.name}
            className={`${method.bgColor} p-2 rounded flex items-center justify-center`}
            title={method.name}
          >
            {method.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

// Legal Links Component
const LegalLinks = () => {
  const legalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-conditions", label: "Terms & Conditions" },
    { href: "/cookie-policy", label: "Cookie Policy" },
  ];

  return (
    <ul className="flex flex-wrap gap-4 text-sm">
      {legalLinks.map((link, index) => (
        <li key={link.href}>
          <FooterLink
            href={link.href}
            className="text-gray-400 hover:text-white"
          >
            {link.label}
          </FooterLink>
          {index < legalLinks.length - 1 && (
            <span className="ml-4 text-gray-600">|</span>
          )}
        </li>
      ))}
    </ul>
  );
};

import { Logo } from "../Logo";

// Main Footer Component
const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-5 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Logo />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Experience the next generation of e-commerce. Built for speed, designed for growth.
            </p>
          </div>
          <ShopLinks />
          <CustomerCareLinks />
          <div className="space-y-6">
            <SocialMediaLinks />
            <div className="pt-4">
              <h3 className="font-semibold mb-4 text-lg">Secure Payments</h3>
              <PaymentMethods />
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NeXar. All rights reserved.
          </div>
          <LegalLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
