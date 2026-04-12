export const smallBusiness = {
  sbMeta: {
    title: "Komplette Website für Kleinunternehmen | Jakob Lingel" as string,
    description:
      "Professionelle Website für 500 €. Alles inklusive: Design, Hosting, Domain, Updates & Rechtliches. Für Selbstständige und kleine Unternehmen in Aalen und Umgebung." as string,
  },
  sbHero: {
    headline: "Komplette Website" as string,
    price: "500 €" as string,
    subheadline: "einmalig" as string,
    description:
      "Alles aus einer Hand: Design, Hosting, Domain, Updates & Rechtliches. Für Selbstständige und kleine Unternehmen in Aalen und Umgebung." as string,
    cta: "Jetzt beraten lassen" as string,
  },
  sbIncludes: {
    title: "Das ist inklusive" as string,
    items: {
      design: {
        title: "Komplettes Design" as string,
        description:
          "Maßgeschneiderte Website, perfekt für Ihr Geschäft" as string,
      },
      hosting: {
        title: "Hosting & Domain" as string,
        description:
          "Inklusive Domain, SSL-Zertifikat & schnellem Hosting in Deutschland" as string,
      },
      updates: {
        title: "Updates & Rechtliches" as string,
        description:
          "Monatliche Updates, Sicherheit & DSGVO-konforme Datenschutzerklärung" as string,
      },
    },
  },
  sbPricing: {
    title: "Preise" as string,
    newWebsite: {
      name: "Neue Website" as string,
      price: "500 €" as string,
      priceSubtext: "einmalig" as string,
      monthly: "+ 15 €/Monat" as string,
      description: "Perfekt für Neueinsteiger" as string,
      features: [
        "Komplettes Design nach Ihren Wünschen" as string,
        "Domain & Hosting inklusive" as string,
        "SSL-Zertifikat & Sicherheit" as string,
        "DSGVO-konforme Datenschutzerklärung" as string,
        "Monatliche Updates" as string,
      ] as string[],
      cta: "Anfragen" as string,
    },
    rebuild: {
      name: "Website-Relaunch" as string,
      price: "300 €" as string,
      priceSubtext: "einmalig" as string,
      monthly: "+ 15 €/Monat" as string,
      description: "Modernisierung bestehender Seiten" as string,
      features: [
        "Neues, modernes Design" as string,
        "Übernahme bestehender Inhalte" as string,
        "Mobile-Optimierung" as string,
        "Performance-Verbesserung" as string,
        "Monatliche Updates" as string,
      ] as string[],
      cta: "Anfragen" as string,
    },
  },
  sbCta: {
    headline: "Bereit für Ihre neue Website?" as string,
    description:
      "In 15 Minuten klären wir Ihre Wünsche – unverbindlich und kostenlos." as string,
    button: "Termin vereinbaren" as string,
  },
};

export type SmallBusinessTranslations = typeof smallBusiness;
