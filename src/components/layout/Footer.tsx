import { Building2, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-white">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span>Asseni</span>
            </div>
            <p className="text-sm">
              Профессиональное строительство и ремонт любой сложности с 2014 года.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-orange-500 transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/works" className="hover:text-orange-500 transition-colors">
                  Наши работы
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-500 transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Услуги</h3>
            <ul className="space-y-2 text-sm">
              <li>Строительство домов</li>
              <li>Ремонт квартир</li>
              <li>Коммерческие объекты</li>
              <li>Фасадные работы</li>
              <li>Кровельные работы</li>
              <li>Дизайн интерьера</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Контакты</h3>
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
                <span>г. Караганда, ул. Пригородная, д. 1б</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center">
          <p>© {currentYear} Asseni. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
