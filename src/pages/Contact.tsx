import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
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
      alert(t("contactPage.form.web3forms_key_missing"));
      return;
    }
    const payload = {
      access_key,
      subject: t("contactPage.form.subject"),
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
        alert(t("contactPage.form.success"));
        setFormData({ name: "", phone: "", email: "", serviceType: "", message: "" });
      } else {
        alert(t("contactPage.form.error"));
      }
    } catch (_) {
      alert(t("contactPage.form.network_error"));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 reveal-in">{t("contactPage.header.title")}</h1>
          <p className="text-xl text-slate-300 reveal-delay-1 reveal-in">{t("contactPage.header.subtitle")}</p>
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
                <CardTitle className="text-lg">{t("contactPage.cards.phone.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-semibold text-slate-900">
                  +7 (701) 122-24-77
                </CardDescription>
                <CardDescription className="text-sm">{t("contactPage.cards.phone.hours")}</CardDescription>
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
                <CardDescription className="text-sm">{t("contactPage.cards.email.response")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal reveal-delay-2">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">{t("contactPage.cards.address.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-semibold text-slate-900">
                  {t("contactPage.cards.address.city")}
                </CardDescription>
                <CardDescription className="text-sm">
                  {t("contactPage.cards.address.street")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow reveal reveal-delay-3">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">{t("contactPage.cards.hours.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-semibold text-slate-900">
                  {t("contactPage.cards.hours.weekdays")}
                </CardDescription>
                <CardDescription className="text-sm">{t("contactPage.cards.hours.weekend")}</CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="border-none shadow-lg reveal">
              <CardHeader>
                <CardTitle className="text-2xl">{t("contactPage.form.title")}</CardTitle>
                <CardDescription>{t("contactPage.form.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t("contactPage.form.name_label")}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t("contactPage.form.name_placeholder")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">{t("contactPage.form.phone_label")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={t("contactPage.form.phone_placeholder")}
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
                    <Label htmlFor="message">{t("contactPage.form.message_label")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder={t("contactPage.form.message_placeholder")}
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    <Send className="w-4 h-4 mr-2" />
                    {t("contactPage.form.submit")}
                  </Button>
                  <div className="flex gap-3">
                    <div>
                      <div className="text-sm text-slate-600">{t("contactPage.form.footnote")}</div>
                    </div>
                  </div>  
                </form>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="space-y-6">
              <Card className="border-none shadow-lg reveal reveal-delay-1">
                <CardHeader>
                  <CardTitle className="text-2xl">{t("contactPage.why.title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold mb-1">{t("contactPage.why.points.exp.title")}</div>
                      <div className="text-sm text-slate-600">{t("contactPage.why.points.exp.desc")}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold mb-1">{t("contactPage.why.points.solutions.title")}</div>
                      <div className="text-sm text-slate-600">{t("contactPage.why.points.solutions.desc")}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold mb-1">{t("contactPage.why.points.production.title")}</div>
                      <div className="text-sm text-slate-600">{t("contactPage.why.points.production.desc")}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold mb-1">{t("contactPage.why.points.quality.title")}</div>
                      <div className="text-sm text-slate-600">{t("contactPage.why.points.quality.desc")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-gradient-to-br from-orange-600 to-orange-700 text-white reveal reveal-delay-2">
                <CardHeader>
                  <CardTitle className="text-2xl">{t("contactPage.urgent.title")}</CardTitle>
                  <CardDescription className="text-orange-100">{t("contactPage.urgent.subtitle")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-orange-50">{t("contactPage.urgent.body")}</p>
                    <div className="flex items-center gap-3 text-2xl font-bold">
                      <Phone className="w-6 h-6" />
                      +7 (701) 122-24-77
                    </div>
                    <p className="text-sm text-orange-100">{t("contactPage.cards.hours.weekdays")}</p>
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
