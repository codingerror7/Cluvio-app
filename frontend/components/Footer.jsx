import React from "react";
import { Layers, Mail, Share2, ExternalLink } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Share2 className="w-4 h-4" />, href: "#" },
    { icon: <Mail className="w-4 h-4" />, href: "#" },
    { icon: <ExternalLink className="w-4 h-4" />, href: "#" }
  ];

  return (
    <footer className="relative border-t border-white/[0.06] bg-black overflow-hidden">

  {/* Ambient Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/5 blur-[120px]" />
  </div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">

    <div className="grid lg:grid-cols-12 gap-16">

      {/* Brand */}
      <div className="lg:col-span-5">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <Layers className="w-5 h-5 text-white" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">
              Cluvio
            </h3>

            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
              Club Management System
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-text-muted max-w-md">
          Cluvio helps student clubs, communities, and organizations
          manage members, events, registrations, and communication
          from one unified workspace.
        </p>

      </div>

      {/* Links */}
      <div className="lg:col-span-3">

        <h4 className="text-sm font-semibold text-white mb-5">
          Navigation
        </h4>

        <ul className="space-y-4">

          {[
            "Home",
            "Features",
            "How It Works",
            "Contact"
          ].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="
                  text-sm
                  text-text-muted
                  hover:text-white
                  transition-colors
                  duration-300
                "
              >
                {item}
              </a>
            </li>
          ))}

        </ul>
      </div>

      {/* Contact */}
      <div className="lg:col-span-4">

        <h4 className="text-sm font-semibold text-white mb-5">
          Contact
        </h4>

        <p className="text-sm text-text-muted leading-relaxed mb-6">
          Questions, partnerships, or support requests?
          We'd love to hear from you.
        </p>

        <a
          href="mailto:hello@cluvio.edu"
          className="
            inline-flex
            items-center
            text-white
            font-medium
            hover:text-brand-primary
            transition-colors
          "
        >
          hello@cluvio.edu
        </a>

        <div className="flex items-center gap-3 mt-8">

          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              className="
                w-10
                h-10
                rounded-xl
                border
                border-white/[0.08]
                bg-white/[0.02]
                flex
                items-center
                justify-center
                text-text-muted
                hover:text-white
                hover:border-brand-primary/30
                hover:bg-white/[0.04]
                transition-all
                duration-300
              "
            >
              {social.icon}
            </a>
          ))}

        </div>
      </div>

    </div>

    {/* Divider */}
    <div className="mt-16 pt-8 border-t border-white/[0.06]">

      <div className="flex flex-col md:flex-row items-center justify-between gap-5">

        <p className="text-xs text-text-muted">
          © {currentYear} Cluvio. All rights reserved.
        </p>

        <div className="flex items-center gap-6">

          <a
            href="#"
            className="text-xs text-text-muted hover:text-white transition-colors"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="text-xs text-text-muted hover:text-white transition-colors"
          >
            Terms of Service
          </a>

        </div>

      </div>

    </div>

  </div>
</footer>
  );
};

export default Footer;
