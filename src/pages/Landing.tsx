import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, CheckCircle2, Users, Award, Phone, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      alert(t("landing.form.web3forms_key_missing"));
      return;
    }
    const payload = {
      access_key,
      subject: t("landing.form.subject"),
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
        alert(t("landing.form.success"));
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        alert(t("landing.form.error"));
      }
    } catch (_) {
      alert(t("landing.form.network_error"));
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
              {t("landing.hero.title_1")} <span className="text-orange-500">{t("brand.name")}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto reveal-on-scroll reveal-delay-1">
              {t("landing.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 reveal-on-scroll reveal-delay-2">
              <Button 
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-6"
                onClick={() => navigate("/contact")}
              >
                {t("landing.hero.cta_consult")}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-white text-black hover:bg-slate-900 hover:text-white"
                onClick={() => navigate("/works")}
              >
                {t("landing.hero.cta_projects")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 reveal-on-scroll">{t("landing.features.title")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal-on-scroll">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">{t("landing.features.items.experience.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t("landing.features.items.experience.desc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal-on-scroll reveal-delay-1">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">{t("landing.features.items.quality.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t("landing.features.items.quality.desc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal-on-scroll reveal-delay-2">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">{t("landing.features.items.team.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t("landing.features.items.team.desc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal-on-scroll reveal-delay-3">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">{t("landing.features.items.pricing.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t("landing.features.items.pricing.desc")}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Supporting Image Blocks */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="grid md:grid-cols-2 gap-8 items-center reveal-on-scroll">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img src="/image1.jpeg" alt="support-1" className="w-full h-[360px] object-cover" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-slate-900">{t("landing.support.block1.title")}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{t("landing.support.block1.desc")}</p>
              <div className="flex gap-4 pt-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-orange-600" />
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-orange-600" />
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center reveal-on-scroll">
            <div className="order-2 md:order-1 space-y-4">
              <h3 className="text-3xl font-bold text-slate-900">{t("landing.support.block2.title")}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{t("landing.support.block2.desc")}</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  t("landing.services.items.build.title"),
                  t("landing.services.items.electro.title"),
                  t("landing.services.items.automation.title"),
                  t("landing.services.items.industry.title"),
                ].map((chip, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">{chip}</span>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 overflow-hidden rounded-2xl shadow-lg">
              <img src="/image2.jpeg" alt="support-2" className="w-full h-[360px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 reveal-on-scroll">{t("landing.services.title")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                {
                    title: t("landing.services.items.build.title"),
                    description: t("landing.services.items.build.desc"),
                },
                {
                    title: t("landing.services.items.electro.title"),
                    description: t("landing.services.items.electro.desc"),
                },
                {
                    title: t("landing.services.items.automation.title"),
                    description: t("landing.services.items.automation.desc"),
                },
                {
                    title: t("landing.services.items.industry.title"),
                    description: t("landing.services.items.industry.desc"),
                },
                {
                    title: t("landing.services.items.innovation.title"),
                    description: t("landing.services.items.innovation.desc"),
                },
                {
                    title: t("landing.services.items.sales.title"),
                    description: t("landing.services.items.sales.desc"),
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
              <div className="text-lg text-orange-100">{t("landing.stats.projects")}</div>
            </div>
            <div className="reveal-on-scroll reveal-delay-1">
              <div className="text-5xl font-bold mb-2">30+</div>
              <div className="text-lg text-orange-100">{t("landing.stats.years")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 reveal-on-scroll">{t("landing.contact.title")}</h2>
            <p className="text-lg text-slate-600 reveal-on-scroll reveal-delay-1">{t("landing.contact.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg reveal-on-scroll">
              <CardHeader>
                <CardTitle>{t("landing.contact.info.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <div className="font-semibold">{t("landing.contact.info.phone")}</div>
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
                    <div className="font-semibold">{t("landing.contact.info.address")}</div>
                    <div className="text-slate-600">{t("contactPage.cards.address.city")}</div>
                    <div className="text-slate-600">{t("contactPage.cards.address.street")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg reveal-on-scroll reveal-delay-1">
              <CardHeader>
                <CardTitle>{t("landing.form.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t("landing.form.name_label")}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t("landing.form.name_placeholder")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("landing.form.phone_label")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={t("landing.form.phone_placeholder")}
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
                    <Label htmlFor="message">{t("landing.form.message_label")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("landing.form.message_placeholder")}
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    {t("landing.form.submit")}
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
