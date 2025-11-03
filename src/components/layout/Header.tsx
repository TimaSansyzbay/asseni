import { Button } from "@/components/ui/button";
import { Building2, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [logoError, setLogoError] = useState(false);

  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/works", label: t("nav.works") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            {!logoError ? (
              <img
                src="/logo.png"
                alt={t("brand.name")}
                className="w-10 h-10 object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            )}
            <span className="text-slate-900">{t("brand.name")}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                  isActive(item.path) ? "text-orange-600" : "text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Language */}
          <div className="hidden md:flex items-center gap-3">
            <div>
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <Link to="/contact">{t("cta.request_call")}</Link>
              </Button>
            </div>
            <select
              aria-label="Language"
              className="border rounded-md px-2 py-1 text-sm"
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              <option value="kz">KZ</option>
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-base font-medium transition-colors hover:text-orange-600 ${
                    isActive(item.path) ? "text-orange-600" : "text-slate-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="bg-orange-600 hover:bg-orange-700 w-full">
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  {t("cta.request_call")}
                </Link>
              </Button>
              <select
                aria-label="Language"
                className="border rounded-md px-2 py-2 text-base"
                value={i18n.language}
                onChange={(e) => {
                  i18n.changeLanguage(e.target.value);
                  setMobileMenuOpen(false);
                }}
              >
                <option value="kz">KZ</option>
                <option value="ru">RU</option>
                <option value="en">EN</option>
              </select>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
