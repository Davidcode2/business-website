export const legal = {
  impressum: {
    title: "Impressum" as string,
    provider: "Diensteanbieter" as string,
    name: "Jakob Lingel" as string,
    address: "Adresse" as string,
    contact: "Kontakt" as string,
    email: "E-Mail" as string,
    responsible: "Verantwortlich für den Inhalt" as string,
    disclaimer: "Haftungsausschluss" as string,
    disclaimerText:
      "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich." as string,
  },
  relatedServices: {
    title: "Weitere Services" as string,
  },
};

export type LegalTranslations = typeof legal;
