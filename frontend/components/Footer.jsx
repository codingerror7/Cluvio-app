import React from "react";
import { Layers, Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Twitter className="w-4 h-4" />, href: "#" },
    { icon: <Github className="w-4 h-4" />, href: "#" },
    { icon: <Linkedin className="w-4 h-4" />, href: "#" }
  ];

  return (
    <footer className="border-t border-border-custom bg-black py-16">
      <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Logo and Tagline */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              Cluvio
            </span>
          </div>
          <p className="text-xs text-text-muted max-w-sm leading-relaxed">
            A modern Club Management System. Elevate your organization, align your workspace, and coordinate effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2">
            {["Home", "Features", "How It Works", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                  className="text-xs text-text-muted hover:text-white transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Contact</h4>
          <p className="text-xs text-text-muted leading-relaxed">
            Have questions or need support? <br />
            Reach out at <a href="mailto:hello@cluvio.edu" className="text-white hover:underline">hello@cluvio.edu</a>
          </p>
          
          {/* Social icons */}
          <div className="flex items-center gap-3 pt-2">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="w-8 h-8 rounded-lg bg-white/5 border border-border-custom flex items-center justify-center text-text-muted hover:text-white hover:border-border-hover transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="w-full max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[11px] text-text-muted">
          &copy; {currentYear} Cluvio. All rights reserved.
        </span>
        <div className="flex items-center gap-6">
          {["Privacy Policy", "Terms of Service"].map((item) => (
            <a key={item} href="#" className="text-[11px] text-text-muted hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
