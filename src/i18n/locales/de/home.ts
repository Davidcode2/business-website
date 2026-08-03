export const home = {
  hero: {
    tagline: "Software · Cloud · KI — aus dem Ostalbkreis" as string,
    headline1: "Software, die" as string,
    headline2: "funktioniert." as string,
    headline3: "Ohne Umwege." as string,
    subheadline:
      "Ich bin Software-Ingenieur aus dem Ostalbkreis und baue Websites, Shops, Cloud-Infrastruktur und KI-Integrationen — persönlich, pragmatisch und mit klarem Ergebnis. Ein Ansprechpartner von der ersten Idee bis zum laufenden Betrieb." as string,
    ctaPrimary: "Gespräch vereinbaren" as string,
    ctaSecondary: "Leistungen ansehen" as string,
  },
  services: {
    sectionTagline: "Leistungen" as string,
    sectionTitle1: "Vier Bereiche." as string,
    sectionTitle2: " Ein Anspruch: messbarer Nutzen." as string,
    sectionDescription:
      "Ich begleite Sie von der ersten Analyse bis zum laufenden Betrieb — mit Lösungen, die Ihre Prozesse spürbar vereinfachen und zuverlässig laufen." as string,
    webDevelopment: {
      title: "Web, Shop & Maßgeschneiderte Software" as string,
      description:
        "Individuelle Websites, hochkonvertierende Onlineshops und intelligente Software, die Ihre Arbeitsabläufe automatisiert. Von kundenorientierten Lösungen bis zu internen Tools, die die Produktivität steigern—entwickelt für echten geschäftlichen Impact." as string,
      learnMore: "Details ansehen" as string,
    },
    aiEnablement: {
      title: "KI-Integration & Training" as string,
      description:
        "Transformieren Sie die Art und Weise, wie Ihr Team arbeitet, durch praxisnahe KI-Integration. Sie erhalten funktionierende Lösungen plus praktisches Training—damit Ihre Mitarbeiter KI auch langfristig selbstständig nutzen können. Nachweisbare Produktivitätsgewinne, nicht nur Versprechen." as string,
      learnMore: "Details ansehen" as string,
    },
    cloudDevops: {
      title: "Cloud-Infrastruktur & DevOps" as string,
      description:
        "Kosteneffiziente und zuverlässige Infrastruktur aus der Region Ostalbkreis: Automatisierte Deployment-Prozesse, skalierbare Architekturen und durchgängige Sicherheitskonzepte." as string,
      learnMore: "Details ansehen" as string,
    },
    security: {
      title: "IT-Security & Compliance" as string,
      description:
        "Umfassende IT-Sicherheit nach industrieerprobten Standards: Systematische Audits, DSGVO-konforme Prozesse und kontinuierliches Sicherheitsmanagement für Ihre digitalen Assets." as string,
      learnMore: "Details ansehen" as string,
    },
  },
  story: {
    sectionTagline: "Warum ich" as string,
    sectionTitle1: "Kein Projektmanager, keine Warteschleife — Sie sprechen direkt mit dem, der es baut." as string,
    sectionTitle2: "" as string,
    description:
      "Ich setze Ihre Anforderungen pragmatisch und effizient um: ohne überflüssige Prozesse, ohne endlos lange Abstimmungsschleifen. Was ich verspreche, liefere ich — getestet, dokumentiert und so gebaut, dass es auch in drei Jahren noch läuft." as string,
    valueProps: {
      noMeetings: {
        title: "Direkte Kommunikation" as string,
        description:
          "Kurze Entscheidungswege. Sie erreichen mich persönlich — keine Ticketsysteme, keine Zwischenstationen." as string,
      },
      noBloatedTeams: {
        title: "Ein Experte für alles" as string,
        description:
          "Von der Architektur bis zum Deployment: ein Kopf, der das ganze System kennt und Verantwortung trägt." as string,
      },
      justResults: {
        title: "Ergebnisse statt Stundenzettel" as string,
        description:
          "Gemessen wird am Nutzen für Ihr Geschäft — nicht an verbrauchten Stunden oder bunten Statusreports." as string,
      },
    },
    stats: {
      experience: "Jahre Berufserfahrung" as string,
      projects: "Erfolgreich umgesetzte Projekte" as string,
      satisfaction: "Entwickelt & gehostet in Deutschland" as string,
      support: "1 Ansprechpartner" as string,
    },
  },
  contact: {
    sectionTagline: "Kontakt" as string,
    sectionTitle1: "Erzählen Sie mir von Ihrem Projekt — unverbindlich." as string,
    sectionTitle2: "" as string,
    description:
      "In einem kostenlosen Erstgespräch klären wir, was Sie brauchen und ob ich der Richtige dafür bin. Kein Verkaufsdruck, keine Verpflichtung." as string,
    buttonText: "Kontakt aufnehmen" as string,
    emailHint: "Klicken Sie, um Kontakt aufzunehmen" as string,
    trustedTech: "Technologie-Stack" as string,
    form: {
      name: "Name" as string,
      namePlaceholder: "Ihr Name" as string,
      email: "E-Mail" as string,
      emailPlaceholder: "ihre@email.de" as string,
      message: "Nachricht" as string,
      messagePlaceholder: "Beschreiben Sie Ihr Projekt..." as string,
      submit: "Nachricht senden" as string,
      sending: "Wird gesendet..." as string,
      successMessage:
        "Vielen Dank! Ich werde mich so schnell wie möglich bei Ihnen melden." as string,
      errorMessage:
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut." as string,
    },
  },
};

export type HomeTranslations = typeof home;
