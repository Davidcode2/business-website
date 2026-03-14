export const legal = {
  impressum: {
    title: "Legal Notice" as string,
    provider: "Service Provider" as string,
    name: "Jakob Lingel" as string,
    address: "Address" as string,
    contact: "Contact" as string,
    email: "Email" as string,
    responsible: "Responsible for content" as string,
    disclaimer: "Disclaimer" as string,
    disclaimerText:
      "Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content." as string,
  },
  relatedServices: {
    title: "Other Services" as string,
  },
};

export type LegalTranslations = typeof legal;
