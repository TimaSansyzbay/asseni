import { Button } from "@/components/ui/button";
import { Building2, Menu, X, ArrowUpRight } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-bold text-xl">
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
            <span className="text-slate-900 text-xl font-semibold tracking-tight">
              {t("brand.name")}
            </span>
          </Link>

          {/* Desktop Navigation - Pill Style */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center bg-slate-100 rounded-full px-2 py-2 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop CTA + Language */}
          <div className="hidden md:flex items-center gap-4">
            <select
              aria-label="Language"
              className="border-0 bg-transparent text-sm font-medium text-slate-600 cursor-pointer focus:outline-none focus:ring-0"
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              <option value="kz">KZ</option>
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>
            <Button
              asChild
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-full pl-5 pr-2 py-3 h-auto flex items-center gap-2 text-sm font-medium"
            >
              <Link to="/contact">
                {t("cta.request_call")}
                <span className="bg-orange-500 rounded-full p-1.5 ml-1">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
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
          <div className="md:hidden py-4 border-t border-slate-100 animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 text-base font-medium rounded-xl transition-all ${
                    isActive(item.path)
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-slate-100">
                <Button
                  asChild
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-6 text-base font-medium flex items-center justify-center gap-2"
                >
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    {t("cta.request_call")}
                    <span className="bg-orange-500 rounded-full p-1.5">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </span>
                  </Link>
                </Button>
              </div>
              <div className="flex justify-center pt-2">
                <select
                  aria-label="Language"
                  className="border rounded-lg px-4 py-2 text-base bg-slate-50"
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
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
