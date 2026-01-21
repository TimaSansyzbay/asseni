import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, CheckCircle2, Users, Award, Phone, Mail, MapPin, ArrowUpRight, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "@/components/projects/projects";

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
      <section className="px-4 lg:px-8 py-4">
        <div className="container mx-auto max-w-7xl">
          <div className="relative rounded-3xl overflow-hidden bg-slate-800 min-h-[600px] lg:min-h-[650px] flex flex-col">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/hero-bg.png')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/30 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-end justify-between px-6 lg:px-12 py-8 lg:py-16 gap-8">
              {/* Left Side - Headline & CTA */}
              <div className="flex flex-col justify-end h-full max-w-xl space-y-6 order-2 lg:order-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight reveal-on-scroll">
                  {t("landing.hero.title_headline")}
                </h1>

                {/* CTA Button with Reviews */}
                <div className="flex items-center gap-4 flex-wrap reveal-on-scroll reveal-delay-1">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-slate-100 text-slate-900 rounded-full pl-6 pr-3 py-6 h-auto flex items-center gap-3 text-base font-medium shadow-lg"
                    onClick={() => navigate("/contact")}
                  >
                    {t("landing.hero.cta_consult")}
                    <span className="bg-orange-500 rounded-full p-2">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </span>
                  </Button>

                  {/* Reviews Badge */}
                  <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">G</div>
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">C</div>
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white">2G</div>
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <span>★★★★★</span>
                        <span className="font-semibold text-slate-900">5.0</span>
                      </div>
                      <div className="text-slate-600 text-xs">55+ {t("landing.hero.reviews")}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form Card */}
              <div className="w-full lg:w-auto lg:min-w-[380px] order-1 lg:order-2 reveal-on-scroll reveal-delay-2">
                <Card className="border-none shadow-2xl bg-white/98 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-center text-slate-900">
                      {t("landing.hero.form_title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("landing.form.name_placeholder")}
                        className="h-12 bg-slate-50 border-slate-200"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t("landing.hero.phone_placeholder")}
                        className="h-12 bg-slate-50 border-slate-200"
                      />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("landing.hero.email_placeholder")}
                        className="h-12 bg-slate-50 border-slate-200"
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("landing.form.message_placeholder")}
                        rows={3}
                        className="bg-slate-50 border-slate-200 resize-none"
                      />
                    </div>
                    <Button
                      onClick={handleSubmit}
                      className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl"
                    >
                      {t("landing.hero.get_quote")}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 px-4 lg:px-8 bg-slate-100">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-10 reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {t("landing.featured.title")}
            </h2>
            <Button
              variant="outline"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 h-auto font-medium flex items-center gap-2"
              onClick={() => navigate("/works")}
            >
              {t("landing.featured.view_all")}
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Featured Project Cards - Using the 4 most recent projects */}
            {[
              { image: "/project-1.png", project: projects.find(p => p.id === 52) }, // BI Group
              { image: "/project-2.png", project: projects.find(p => p.id === 55) }, // Транстелеком
              { image: "/project-3.png", project: projects.find(p => p.id === 51) }, // Транстелеком
              { image: "/project-4.png", project: projects.find(p => p.id === 50) }, // Управление строительства
            ].map((item, index) => (
              <div
                key={index}
                className={`group cursor-pointer reveal-on-scroll ${index > 0 ? `reveal-delay-${index}` : ''}`}
                onClick={() => navigate("/works")}
              >
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Project Image */}
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.project?.client || "Project"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info Overlay at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-lg truncate">
                          {item.project?.client ? t(`projects.${item.project.id}.client`, { defaultValue: item.project.client }).split(" ").slice(0, 2).join(" ") : "Project"}
                        </div>
                        <div className="text-slate-300 text-xs flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.project?.year}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {item.project?.workTypes[0] ? t(`projects.${item.project.id}.workTypes.0`, { defaultValue: item.project.workTypes[0] }).slice(0, 15) + (item.project.workTypes[0].length > 15 ? '...' : '') : ''}
                          </span>
                        </div>
                      </div>
                      <button className="bg-orange-500 hover:bg-orange-600 rounded-lg p-2 ml-3 transition-colors">
                        <ArrowUpRight className="w-4 h-4 text-slate-900" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 lg:px-8 bg-slate-100">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="reveal-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t("landing.features.title")}
              </h2>
              <p className="text-slate-600 text-lg mb-10">
                {t("landing.features.subtitle")}
              </p>

              {/* Feature Items */}
              <div className="space-y-6">
                {/* Feature 1 - Experience */}
                <div className="flex items-start gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{t("landing.features.items.experience.title")}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{t("landing.features.items.experience.desc")}</p>
                  </div>
                </div>

                {/* Feature 2 - Quality */}
                <div className="flex items-start gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-colors reveal-on-scroll reveal-delay-1">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{t("landing.features.items.quality.title")}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{t("landing.features.items.quality.desc")}</p>
                  </div>
                </div>

                {/* Feature 3 - Team */}
                <div className="flex items-start gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-colors reveal-on-scroll reveal-delay-2">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{t("landing.features.items.team.title")}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{t("landing.features.items.team.desc")}</p>
                  </div>
                </div>

                {/* Feature 4 - Pricing */}
                <div className="flex items-start gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-colors reveal-on-scroll reveal-delay-3">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{t("landing.features.items.pricing.title")}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{t("landing.features.items.pricing.desc")}</p>
                  </div>
                </div>
              </div>


            </div>

            {/* Right Side - Image */}
            <div className="reveal-on-scroll reveal-delay-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/features.png"
                  alt="Construction professional"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
              </div>
            </div>
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
