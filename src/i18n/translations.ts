export type Locale = "de" | "en";

export const translations = {
  de: {
    // Navigation
    nav: {
      services: "Services",
      about: "Über mich",
      contact: "Kontakt",
      home: "Startseite",
      impressum: "Impressum",
      toggleLanguage: "Sprache wechseln",
    },
    // Hero
    hero: {
      tagline: "Digital Solutions Provider",
      headline1: "Von der Idee zum",
      headline2: "Deployment",
      headline3: "in Rekordzeit",
      subheadline:
        "Sie haben eine Vision. Ich habe die Tools, um sie Wirklichkeit werden zu lassen. Maßgeschneiderte Websites, Onlineshops und Cloud-Infrastruktur—schnell geliefert.",
      ctaPrimary: "Lassen Sie uns sprechen",
      ctaSecondary: "Services erkunden",
    },
    // Services
    services: {
      sectionTagline: "Was ich anbiete",
      sectionTitle1: "Services gebaut für",
      sectionTitle2: "Ergebnisse",
      sectionDescription:
        "Vom Konzept bis zum Launch biete ich End-to-End Digital-Lösungen, die Geschäftswachstum fördern.",
      webDevelopment: {
        title: "Web Development & E-Commerce",
        description:
          "Websites und Shops, die verkaufen. Sauberer Code, schnelle Performance, nahtloser Checkout und außergewöhnliche User Experience—alles in einem Service.",
        learnMore: "Mehr erfahren",
      },
      aiEnablement: {
        title: "AI Enablement",
        description:
          "Seien Sie an der Spitze der durch KI ermöglichten Produktivität. Strategie, Implementierung und Training, um Ihr Geschäft mit Künstlicher Intelligenz zu transformieren.",
        learnMore: "Mehr erfahren",
      },
      cloudDevops: {
        title: "Cloud & DevOps",
        description:
          "Kubernetes-Deployment, CI/CD-Pipelines und skalierbare Infrastruktur. Ihre App bleibt immer online.",
        learnMore: "Mehr erfahren",
      },
      security: {
        title: "Security Consulting",
        description:
          "Schützen Sie Ihre digitalen Assets. Security Audits, Implementierung von Best Practices und kontinuierliches Monitoring.",
        learnMore: "Mehr erfahren",
      },
    },
    // Story/About
    story: {
      sectionTagline: "Der Unterschied",
      sectionTitle1: "Vom ersten Gespräch bis zum Live-Deployment—",
      sectionTitle2: "gemessen in Tagen, nicht Monaten",
      description:
        "Technologie sollte Ihr Geschäft bedienen, nicht komplizieren. Ich durchbreche den Lärm und liefere Lösungen, die funktionieren—schnell, zuverlässig und skalierbar.",
      valueProps: {
        noMeetings: {
          title: "Keine endlosen Meetings",
          description: "Direkte Kommunikation, schnelle Entscheidungen.",
        },
        noBloatedTeams: {
          title: "Keine aufgeblähten Teams",
          description: "Ein Experte, fokussiert auf Ihren Erfolg.",
        },
        justResults: {
          title: "Nur Ergebnisse",
          description: "Gemessen in Geschäftswert, nicht Stunden.",
        },
      },
      stats: {
        experience: "Jahre Erfahrung",
        projects: "Projekte umgesetzt",
        satisfaction: "Kundenzufriedenheit",
        support: "Support verfügbar",
      },
    },
    // Contact
    contact: {
      sectionTagline: "Kontakt aufnehmen",
      sectionTitle1: "Bereit, Ihre",
      sectionTitle2: "Vision zum Leben zu erwecken?",
      description:
        "Lassen Sie uns über Ihr Projekt sprechen. Keine Verpflichtungen, nur ein Gespräch darüber, was möglich ist.",
      buttonText: "Kontakt aufnehmen",
      emailHint: "Klicken Sie, um E-Mail-Adresse anzuzeigen",
      trustedTech: "Vertraute Technologien",
    },
    // Footer
    footer: {
      tagline: "Digital Solutions Provider",
      copyright: "Alle Rechte vorbehalten.",
    },
    // Service Pages - Web Development
    webDevelopment: {
      meta: {
        title: "Web Development & E-Commerce | Jakob Lingel",
        description:
          "Websites und Shops, die verkaufen. Sauberer Code, schnelle Performance, nahtloser Checkout und außergewöhnliche User Experience.",
      },
      tagline: "Gebaut für Ergebnisse",
      heroDescription:
        "Ihre Website sollte Ihr bester Verkäufer sein—24/7 arbeitend, um Besucher anzuziehen, zu begeistern und zu konvertieren. Ich baue schnelle, responsive Websites und hochkonvertierende E-Commerce-Shops, die echte Geschäftsergebnisse liefern.",
      problem: {
        headline: "Kostet Ihre Website Sie Kunden?",
        description:
          "Jeden Tag verlieren langsame Ladezeiten, veraltete Designs und unhandliche E-Commerce-Erfahrungen potenzielle Kunden an Ihre Konkurrenz. Ihre Website sollte Ihr bester Verkäufer sein—kein Risiko.",
        painPoints: [
          "53% der Besucher verlassen Ihre Seite, wenn sie länger als 3 Sekunden lädt—Kosten für Kunden, bevor sie Ihr Angebot überhaupt sehen",
          "Hoher Warenkorbabbruch durch komplizierte Checkout-Flows und schlechte mobile Erfahrung",
          "Veraltetes Design, das Ihr Geschäft unprofessionell wirken lässt im Vergleich zur Konkurrenz",
          "Technische Kopfschmerzen, die teure Entwickler für jede kleine Änderung erfordern",
        ],
      },
      solution: {
        headline: "Websites, die verkaufen, Shops, die konvertieren",
        description:
          "Ich baue digitale Erlebnisse, die Geschäftsergebnisse liefern. Jede Website und jeder Shop wird handgefertigt für Performance, optimiert für Konversionen und designed, um mit Ihrem Geschäft zu wachsen. Von Broschüren-Websites bis zum vollständigen E-Commerce—alles, was Sie brauchen.",
        features: {
          conversionFirst: {
            title: "Conversion-First Design",
            description:
              "Jedes Element ist darauf ausgelegt, Besucher zur Handlung zu führen. Klare CTAs, optimierte Flows und psychologische Trigger, die Browser zu Käufern machen.",
          },
          ecommerce: {
            title: "E-Commerce Excellence",
            description:
              "One-Page-Checkout, nahtlose Zahlungsintegration und smartes Inventarmanagement. Ihr Shop verkauft, während Sie schlafen.",
          },
          performance: {
            title: "Performance-optimiert",
            description:
              "Ladezeiten unter 2 Sekunden, die Besucher begeistern und Ihre Google-Rankings verbessern. Gebaut mit Astro für maximale Geschwindigkeit.",
          },
          mobileFirst: {
            title: "Mobile-First Experience",
            description:
              "Über 60% des Traffics ist mobil. Jedes Design ist touch-optimiert und responsive, um Kunden auf jedem Gerät zu erreichen.",
          },
        },
      },
      benefits: {
        headline: "Warum diese Websites konvertieren",
        items: {
          lightningFast: {
            title: "Blitzschnell",
            description:
              "Ladezeiten unter 2 Sekunden, die Besucher begeistern und Ihre Google-Rankings verbessern.",
          },
          highConverting: {
            title: "Hochkonvertierende Shops",
            description:
              "Optimierte Checkout-Flows, die Abbrüche reduzieren und Verkäufe maximieren.",
          },
          mobileOptimized: {
            title: "Mobile First",
            description:
              "Touch-optimierte Erlebnisse, die die 60%+ Kunden erreichen, die mobil browsen.",
          },
          seoReady: {
            title: "SEO Ready",
            description:
              "Sauberer Code und optimierte Struktur, um Ihnen zu helfen, höher in den Suchergebnissen zu ranken.",
          },
          secure: {
            title: "Sicher & compliant",
            description:
              "HTTPS, Security Headers und DSGVO-Konformität von Tag eins in jede Website eingebaut.",
          },
          fastDelivery: {
            title: "Schnelle Lieferung",
            description:
              "Die meisten Projekte starten in 4-6 Wochen. Holen Sie sich Ihre neue Website schneller als traditionelle Agenturen.",
          },
        },
      },
      process: {
        headline: "Vom Konzept zur Live-Seite",
        description:
          "Ein bewährter Prozess, der Ergebnisse liefert ohne den typischen Overhead von Agenturen.",
        steps: {
          discovery: {
            number: "1",
            title: "Discovery & Strategie",
            description:
              "Wir besprechen Ihre Ziele, Zielgruppe und wichtige Anforderungen. Ich erstelle ein klares Angebot mit Zeitplan und Preis—keine Überraschungen.",
          },
          design: {
            number: "2",
            title: "Design & Entwicklung",
            description:
              "Ich erstelle ein Custom Design und baue Ihre Website mit sauberem, wartbarem Code. Regelmäßige Updates halten Sie auf dem Laufenden.",
          },
          review: {
            number: "3",
            title: "Review & Feinschliff",
            description:
              "Wir reviewen die Website zusammen, nehmen Feinschliffe vor und stellen sicher, dass alles Ihren Erwartungen entspricht, bevor wir live gehen.",
          },
          launch: {
            number: "4",
            title: "Launch & Support",
            description:
              "Ihre Website geht live mit Monitoring. Ich biete Training und kontinuierlichen Support, um dauerhaften Erfolg zu gewährleisten.",
          },
        },
      },
      cta: {
        headline: "Bereit für eine Website, die funktioniert?",
        description:
          "Lassen Sie uns über Ihr Projekt sprechen und sehen, wie eine maßgeschneiderte Website Ihre Online-Präsenz transformieren kann. Keine Verpflichtung, nur ein Gespräch über Ihre Ziele.",
        buttonText: "Projekt starten",
      },
    },
    // Service Pages - AI Enablement
    aiEnablement: {
      meta: {
        title: "AI Enablement | Jakob Lingel",
        description:
          "Strategie, Implementierung und Training für KI-Transformation. Optimieren Sie Prozesse und erschließen Sie neue Möglichkeiten mit Künstlicher Intelligenz.",
      },
      tagline: "KI-Transformation",
      heroDescription:
        "Künstliche Intelligenz ist kein Hype mehr—sie ist ein Wettbewerbsvorteil. Ich helfe Unternehmen, KI-Technologien zu verstehen, zu implementieren und zu nutzen, um Prozesse zu optimieren und neue Möglichkeiten zu erschließen.",
    },
    // Service Pages - Cloud & DevOps
    cloudDevops: {
      meta: {
        title: "Cloud & DevOps | Jakob Lingel",
        description:
          "Kubernetes-Deployment, CI/CD-Pipelines und skalierbare Infrastruktur. Ihre Anwendungen bleiben immer online.",
      },
      tagline: "Infrastruktur, die skaliert",
      heroDescription:
        "Moderne Anwendungen brauchen moderne Infrastruktur. Ich designe und implementiere Cloud-native Lösungen, die mit Ihrem Geschäft wachsen, automatisierte Deployments ermöglichen und 99.9% Uptime garantieren.",
    },
    // Service Pages - Security
    security: {
      meta: {
        title: "Security Consulting | Jakob Lingel",
        description:
          "Schützen Sie Ihre digitalen Assets. Security Audits, Best Practices und kontinuierliches Monitoring für Ihre Infrastruktur.",
      },
      tagline: "Schutz für Ihre Assets",
      heroDescription:
        "In einer Welt zunehmender Cyber-Bedrohungen ist Security kein Luxus mehr, sondern eine Notwendigkeit. Ich helfe Unternehmen, ihre digitale Infrastruktur zu sichern, Compliance-Anforderungen zu erfüllen und ein Sicherheitsbewusstsein zu schaffen.",
    },
    // Related Services
    relatedServices: {
      title: "Weitere Services",
    },
    // Impressum
    impressum: {
      title: "Impressum",
      provider: "Diensteanbieter",
      name: "Jakob Lingel",
      address: "Adresse",
      contact: "Kontakt",
      email: "E-Mail",
      responsible: "Verantwortlich für den Inhalt",
      disclaimer: "Haftungsausschluss",
      disclaimerText:
        "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
    },
  },
  en: {
    // Navigation
    nav: {
      services: "Services",
      about: "About",
      contact: "Contact",
      home: "Home",
      impressum: "Legal Notice",
      toggleLanguage: "Toggle language",
    },
    // Hero
    hero: {
      tagline: "Digital Solutions Provider",
      headline1: "From idea to",
      headline2: "deployment",
      headline3: "in record time",
      subheadline:
        "You have a vision. I have the tools to make it real. Custom websites, webshops, and cloud infrastructure—delivered fast.",
      ctaPrimary: "Let's talk",
      ctaSecondary: "Explore services",
    },
    // Services
    services: {
      sectionTagline: "What I offer",
      sectionTitle1: "Services built for",
      sectionTitle2: "results",
      sectionDescription:
        "From concept to launch, I provide end-to-end digital solutions that drive business growth.",
      webDevelopment: {
        title: "Web Development & E-Commerce",
        description:
          "Websites and shops that sell. Clean code, fast performance, seamless checkout, and exceptional user experience—everything in one service.",
        learnMore: "Learn more",
      },
      aiEnablement: {
        title: "AI Enablement",
        description:
          "Be at the forefront of the productivity enabled by AI. Strategy, implementation, and training to transform your business with artificial intelligence.",
        learnMore: "Learn more",
      },
      cloudDevops: {
        title: "Cloud & DevOps",
        description:
          "Kubernetes deployment, CI/CD pipelines, and scalable infrastructure. Your app stays online, always.",
        learnMore: "Learn more",
      },
      security: {
        title: "Security Consulting",
        description:
          "Protect your digital assets. Security audits, best practices implementation, and ongoing monitoring.",
        learnMore: "Learn more",
      },
    },
    // Story/About
    story: {
      sectionTagline: "The difference",
      sectionTitle1: "From first call to live deployment—",
      sectionTitle2: "measured in days, not months",
      description:
        "Technology should serve your business, not complicate it. I cut through the noise and deliver solutions that work—fast, reliable, and built to scale.",
      valueProps: {
        noMeetings: {
          title: "No endless meetings",
          description: "Direct communication, quick decisions.",
        },
        noBloatedTeams: {
          title: "No bloated teams",
          description: "One expert, focused on your success.",
        },
        justResults: {
          title: "Just results",
          description: "Measured in business value, not hours.",
        },
      },
      stats: {
        experience: "Years experience",
        projects: "Projects delivered",
        satisfaction: "Client satisfaction",
        support: "Support available",
      },
    },
    // Contact
    contact: {
      sectionTagline: "Get in touch",
      sectionTitle1: "Ready to bring your",
      sectionTitle2: "vision to life?",
      description:
        "Let's discuss your project. No obligations, just a conversation about what's possible.",
      buttonText: "Get in touch",
      emailHint: "Click to reveal email address",
      trustedTech: "Trusted technologies",
    },
    // Footer
    footer: {
      tagline: "Digital Solutions Provider",
      copyright: "All rights reserved.",
    },
    // Service Pages - Web Development
    webDevelopment: {
      meta: {
        title: "Web Development & E-Commerce | Jakob Lingel",
        description:
          "Websites and shops that sell. Clean code, fast performance, seamless checkout, and exceptional user experience.",
      },
      tagline: "Built for Results",
      heroDescription:
        "Your website should be your best salesperson—working 24/7 to attract, engage, and convert visitors. I build fast, responsive websites and high-converting e-commerce stores that drive real business results.",
      problem: {
        headline: "Is your website costing you customers?",
        description:
          "Every day, slow loading times, outdated designs, and clunky e-commerce experiences drive potential customers straight to your competitors. Your website should be your best salesperson—not a liability.",
        painPoints: [
          "53% of visitors leave if your site takes more than 3 seconds to load—costing you customers before they even see your offer",
          "High cart abandonment from complicated checkout flows and poor mobile experience",
          "Outdated design that makes your business look unprofessional compared to competitors",
          "Technical headaches requiring expensive developers for every small change",
        ],
      },
      solution: {
        headline: "Websites that sell, stores that convert",
        description:
          "I build digital experiences that drive business results. Every website and shop is hand-crafted for performance, optimized for conversions, and designed to grow with your business. From brochure sites to full e-commerce—everything you need.",
        features: {
          conversionFirst: {
            title: "Conversion-First Design",
            description:
              "Every element is designed to guide visitors toward action. Clear CTAs, streamlined flows, and psychological triggers that turn browsers into buyers.",
          },
          ecommerce: {
            title: "E-Commerce Excellence",
            description:
              "One-page checkout, seamless payment integration, and smart inventory management. Your store sells while you sleep.",
          },
          performance: {
            title: "Performance Optimized",
            description:
              "Sub-2 second load times that keep visitors engaged and improve your Google rankings. Built with Astro for maximum speed.",
          },
          mobileFirst: {
            title: "Mobile-First Experience",
            description:
              "Over 60% of traffic is mobile. Every design is touch-optimized and responsive, capturing customers on any device.",
          },
        },
      },
      benefits: {
        headline: "Why these websites convert",
        items: {
          lightningFast: {
            title: "Lightning Fast",
            description:
              "Sub-2 second load times that keep visitors engaged and boost your Google rankings.",
          },
          highConverting: {
            title: "High-Converting Stores",
            description:
              "Optimized checkout flows that reduce abandonment and maximize sales.",
          },
          mobileOptimized: {
            title: "Mobile First",
            description:
              "Touch-optimized experiences that capture the 60%+ of customers browsing on mobile.",
          },
          seoReady: {
            title: "SEO Ready",
            description:
              "Clean code and optimized structure to help you rank higher in search results.",
          },
          secure: {
            title: "Secure & Compliant",
            description:
              "HTTPS, security headers, and GDPR compliance built into every site from day one.",
          },
          fastDelivery: {
            title: "Fast Delivery",
            description:
              "Most projects launch in 4-6 weeks. Get your new site selling faster than traditional agencies.",
          },
        },
      },
      process: {
        headline: "From concept to live site",
        description:
          "A proven process that delivers results without the typical agency overhead.",
        steps: {
          discovery: {
            number: "1",
            title: "Discovery & Strategy",
            description:
              "We discuss your goals, target audience, and key requirements. I provide a clear proposal with timeline and pricing—no surprises.",
          },
          design: {
            number: "2",
            title: "Design & Development",
            description:
              "I create a custom design and build your site with clean, maintainable code. Regular updates keep you in the loop.",
          },
          review: {
            number: "3",
            title: "Review & Refine",
            description:
              "We review the site together, make refinements, and ensure everything meets your expectations before launch.",
          },
          launch: {
            number: "4",
            title: "Launch & Support",
            description:
              "Your site goes live with monitoring in place. I provide training and ongoing support to ensure continued success.",
          },
        },
      },
      cta: {
        headline: "Ready for a website that works?",
        description:
          "Let's discuss your project and see how a custom-built website can transform your online presence. No obligation, just a conversation about your goals.",
        buttonText: "Start Your Project",
      },
    },
    // Service Pages - AI Enablement
    aiEnablement: {
      meta: {
        title: "AI Enablement | Jakob Lingel",
        description:
          "Strategy, implementation, and training for AI transformation. Optimize processes and unlock new possibilities with Artificial Intelligence.",
      },
      tagline: "AI Transformation",
      heroDescription:
        "Artificial Intelligence is no longer hype—it is a competitive advantage. I help businesses understand, implement, and leverage AI technologies to optimize processes and unlock new possibilities.",
    },
    // Service Pages - Cloud & DevOps
    cloudDevops: {
      meta: {
        title: "Cloud & DevOps | Jakob Lingel",
        description:
          "Kubernetes deployment, CI/CD pipelines, and scalable infrastructure. Your applications stay online, always.",
      },
      tagline: "Infrastructure that scales",
      heroDescription:
        "Modern applications need modern infrastructure. I design and implement cloud-native solutions that grow with your business, enable automated deployments, and guarantee 99.9% uptime.",
    },
    // Service Pages - Security
    security: {
      meta: {
        title: "Security Consulting | Jakob Lingel",
        description:
          "Protect your digital assets. Security audits, best practices, and continuous monitoring for your infrastructure.",
      },
      tagline: "Protection for your assets",
      heroDescription:
        "In a world of increasing cyber threats, security is no longer a luxury but a necessity. I help businesses secure their digital infrastructure, meet compliance requirements, and build security awareness.",
    },
    // Related Services
    relatedServices: {
      title: "Other Services",
    },
    // Impressum
    impressum: {
      title: "Legal Notice",
      provider: "Service Provider",
      name: "Jakob Lingel",
      address: "Address",
      contact: "Contact",
      email: "Email",
      responsible: "Responsible for content",
      disclaimer: "Disclaimer",
      disclaimerText:
        "Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content.",
    },
  },
} as const;

export type Translations = typeof translations;
export type TranslationKey = keyof Translations["de"];

export function getTranslations(locale: Locale): Translations["de"] {
  return translations[locale];
}

export function getCurrentLocale(pathname: string): Locale {
  if (pathname.startsWith("/en/") || pathname === "/en") {
    return "en";
  }
  return "de";
}
