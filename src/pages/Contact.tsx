import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
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
      subject: "Новая заявка: Контакты",
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      serviceType: formData.serviceType,
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
        setFormData({ name: "", phone: "", email: "", serviceType: "", message: "" });
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

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, serviceType: value });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 reveal-in">Контакты</h1>
          <p className="text-xl text-slate-300 reveal-delay-1 reveal-in">
            Свяжитесь с нами удобным для вас способом
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-semibold text-slate-900">
                  +7 (701) 122-24-77
                </CardDescription>
                <CardDescription className="text-sm">
                  Звоните с 9:00 до 18:00
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal reveal-delay-1">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-semibold text-slate-900">
                  assenitoo@mail.ru
                </CardDescription>
                <CardDescription className="text-sm">
                  Ответим в течение 24 часов
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal reveal-delay-2">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Адрес</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-semibold text-slate-900">
                  г. Караганда
                </CardDescription>
                <CardDescription className="text-sm">
                  улица Пригородная 1б
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal reveal-delay-3">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Режим работы</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-semibold text-slate-900">
                  Пн-Пт: 9:00 - 18:00
                </CardDescription>
                <CardDescription className="text-sm">
                  Сб-Вс: выходной
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="border-none shadow-lg reveal">
              <CardHeader>
                <CardTitle className="text-2xl">Форма обратной связи</CardTitle>
                <CardDescription>
                  Заполните форму и мы свяжемся с вами в ближайшее время
                </CardDescription>
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
                      placeholder="Введите ваше имя"
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
                    <Label htmlFor="serviceType">Интересующая услуга</Label>
                    <Select value={formData.serviceType} onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="construction">Строительство и реконструкция</SelectItem>
                        <SelectItem value="electrical">Электромонтаж и связь</SelectItem>
                        <SelectItem value="automation">Автоматизация и системы учёта</SelectItem>
                        <SelectItem value="production">Производство металлоконструкций</SelectItem>
                        <SelectItem value="infrastructure">Инновационные и инфраструктурные решения</SelectItem>
                        <SelectItem value="sales">Продажи и поставки</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Расскажите подробнее о вашем проекте..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    <Send className="w-4 h-4 mr-2" />
                    Отправить заявку
                  </Button>
                  <div className="flex gap-3">
                    <div>
                      <div className="text-sm text-slate-600">
                        👉 Мы нацелены на долговременное и взаимовыгодное сотрудничество, 
                        поэтому готовы рассмотреть эксклюзивные условия работы с вашим предприятием. 
                        Будем рады видеть вас в числе наших постоянных партнёров!
                      </div>
                    </div>
                  </div>  
                </form>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="space-y-6">
              <Card className="border-none shadow-lg reveal reveal-delay-1">
                <CardHeader>
                  <CardTitle className="text-2xl">Почему стоит выбрать нас?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold mb-1">30 лет опыта</div>
                      <div className="text-sm text-slate-600">
                        Более трёх десятилетий работы в сфере строительства и автоматизации промышленных процессов.
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold mb-1">Комплексные решения</div>
                      <div className="text-sm text-slate-600">
                        От проектирования и монтажа до пусконаладочных работ и внедрения систем автоматизации.
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold mb-1">Собственное производство</div>
                      <div className="text-sm text-slate-600">
                        Изготовление шкафов управления, металлоконструкций и оборудования на современном европейском оборудовании.
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold mb-1">Гарантия качества</div>
                      <div className="text-sm text-slate-600">
                        Официальная гарантия на все виды выполненных работ
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-gradient-to-br from-orange-600 to-orange-700 text-white reveal reveal-delay-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Срочная консультация</CardTitle>
                  <CardDescription className="text-orange-100">
                    Нужна помощь прямо сейчас?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-orange-50">
                      Позвоните нам и получите ответы на все ваши вопросы
                    </p>
                    <div className="flex items-center gap-3 text-2xl font-bold">
                      <Phone className="w-6 h-6" />
                      +7 (701) 122-24-77
                    </div>
                    <p className="text-sm text-orange-100">
                      Работаем с понедельника по пятницу с 9:00 до 18:00
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
