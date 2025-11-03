import { Building2, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-white">
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
              <span>{t("brand.name")}</span>
            </div>
            <p className="text-sm">{t("footer.company_description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("footer.navigation")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-orange-500 transition-colors">
                  {t("footer.links.home")}
                </Link>
              </li>
              <li>
                <Link to="/works" className="hover:text-orange-500 transition-colors">
                  {t("footer.links.works")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-500 transition-colors">
                  {t("footer.links.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("footer.contacts")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>+7 (701) 122-24-77</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>assenitoo@mail.ru</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>{t("contactPage.cards.address.city")},</span>
                <span>{t("contactPage.cards.address.street")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center">
          <p>© {currentYear} {t("brand.name")}. {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
