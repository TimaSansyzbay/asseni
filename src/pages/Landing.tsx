import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, CheckCircle2, Users, Award, Phone, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const access_key = import.meta.env.VITE_WEB3FORMS_KEY as string;
    if (!access_key) {
      alert("Не настроен ключ Web3Forms (VITE_WEB3FORMS_KEY)");
      return;
    }
    const payload = {
      access_key,
      subject: "Новая заявка: Главная страница",
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    };
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data && data.success) {
        alert("Спасибо! Ваша заявка отправлена.");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        alert("Ошибка отправки. Попробуйте позже.");
      }
    } catch (_) {
      alert("Ошибка сети. Попробуйте позже.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djhoOHYtOGgtOHptMCAxNnY4aDh2LThoLTh6bS0xNiAwdjhoOHYtOGgtOHptMC0xNnY4aDh2LThoLTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight reveal-on-scroll">
              Строительная компания <span className="text-orange-500">Asseni</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto reveal-on-scroll reveal-delay-1">
              Профессиональное строительство и ремонт любой сложности. Качество, надежность и индивидуальный подход к каждому проекту.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 reveal-on-scroll reveal-delay-2">
              <Button 
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-6"
                onClick={() => navigate("/contact")}
              >
                Получить консультацию
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-white text-black hover:bg-slate-900 hover:text-white"
                onClick={() => navigate("/works")}
              >
                Наши проекты
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 reveal-on-scroll">Почему выбирают нас</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal-on-scroll">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Опыт работы</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Более 30 лет успешной работы в строительной отрасли
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal-on-scroll reveal-delay-1">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Гарантия качества</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Официальная гарантия на все виды выполненных работ
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal-on-scroll reveal-delay-2">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Профессионалы</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Команда квалифицированных специалистов с большим опытом
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal-on-scroll reveal-delay-3">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Лучшие цены</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Конкурентные цены без скрытых платежей и переплат
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 reveal-on-scroll">Наши услуги</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                {
                    title: "Строительство и реконструкция",
                    description: `
                Проектирование, строительство и капитальный ремонт зданий и сооружений любого назначения — административных, жилых и промышленных объектов.
                    `,
                },
                {
                    title: "Электромонтаж и связь",
                    description: `
                Строительство линий электропередачи (ВЛЭ), трансформаторных подстанций, кабельных линий электроснабжения и волоконно-оптических линий связи.
                    `,
                },
                {
                    title: "Автоматизация и системы учёта",
                    description: `
                Разработка и внедрение автоматических систем управления технологическими процессами, АСКУЭ и систем мониторинга безопасности.
                    `,
                },
                {
                    title: "Промышленное производство",
                    description: `
                Сборка шкафов управления, блок-боксов и металлоконструкций различной сложности на современном оборудовании.
                    `,
                },
                {
                    title: "Инновационные решения и инфраструктура",
                    description: `
                Строительство и монтаж светофорных объектов, внедрение систем «умное освещение», IoT и комплексная автоматизация городской инфраструктуры.
                    `,
                },
                {
                    title: "Продажи и лицензии",
                    description: `
                Оптовые поставки стеновых панелей Мультиплит и КИП-оборудования.  
                Компания имеет лицензии I категории на строительно-монтажные, проектные и изыскательские работы.
                    `,
                },
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow reveal-on-scroll">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-orange-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="reveal-on-scroll">
              <div className="text-5xl font-bold mb-2">55+</div>
              <div className="text-lg text-orange-100">Завершенных проектов</div>
            </div>
            <div className="reveal-on-scroll reveal-delay-1">
              <div className="text-5xl font-bold mb-2">30+</div>
              <div className="text-lg text-orange-100">Лет на рынке</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 reveal-on-scroll">Свяжитесь с нами</h2>
            <p className="text-lg text-slate-600 reveal-on-scroll reveal-delay-1">
              Оставьте заявку и наш менеджер свяжется с вами в ближайшее время
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg reveal-on-scroll">
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <div className="font-semibold">Телефон</div>
                    <div className="text-slate-600">+7 (701) 122-24-77</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-slate-600">assenitoo@mail.ru</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <div className="font-semibold">Адрес</div>
                    <div className="text-slate-600">г. Караганда, ул. Пригородная, д. 1б</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg reveal-on-scroll reveal-delay-1">
              <CardHeader>
                <CardTitle>Форма обратной связи</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@mail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Расскажите о вашем проекте..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
