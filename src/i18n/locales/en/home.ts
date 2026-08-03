export const home = {
  hero: {
    tagline: "Software · Cloud · AI — from the Ostalbkreis" as string,
    headline1: "Software that" as string,
    headline2: "works." as string,
    headline3: "No detours." as string,
    subheadline:
      "I'm a software engineer from the Ostalbkreis region, building websites, shops, cloud infrastructure and AI integrations — personal, pragmatic, with a clear result. One point of contact from first idea to running operation." as string,
    ctaPrimary: "Let's talk" as string,
    ctaSecondary: "View services" as string,
  },
  services: {
    sectionTagline: "Services" as string,
    sectionTitle1: "Four areas." as string,
    sectionTitle2: " One standard: measurable value." as string,
    sectionDescription:
      "I support you from first analysis to running operation — with solutions that noticeably simplify your processes and run reliably." as string,
    webDevelopment: {
      title: "Web, Shop & Tailor-Made Software" as string,
      description:
        "Custom websites, high-converting shops, and intelligent software that automates your workflows. From customer-facing solutions to internal tools that boost productivity—built for real business impact." as string,
      learnMore: "Learn more" as string,
    },
    aiEnablement: {
      title: "AI Enablement & Training" as string,
      description:
        "Transform how your team works with practical AI integration. You get working solutions plus hands-on training—so your people can leverage AI independently long after the project ends. Measurable productivity gains, not just promises." as string,
      learnMore: "Learn more" as string,
    },
    cloudDevops: {
      title: "Cloud & DevOps" as string,
      description:
        "Cost-efficient and reliable infrastructure from the Ostalbkreis region: Automated deployments, scalable architecture, and comprehensive security." as string,
      learnMore: "Learn more" as string,
    },
    security: {
      title: "Security Consulting" as string,
      description:
        "Protect your digital assets. Security audits, best practices implementation, and ongoing monitoring." as string,
      learnMore: "Learn more" as string,
    },
  },
  story: {
    sectionTagline: "Why me" as string,
    sectionTitle1: "No project manager, no ticket queue — you talk directly to the person building it." as string,
    sectionTitle2: "" as string,
    description:
      "I implement your requirements pragmatically and efficiently: no unnecessary processes, no endless alignment loops. What I promise, I deliver — tested, documented, and built to still run in three years." as string,
    valueProps: {
      noMeetings: {
        title: "Direct communication" as string,
        description: "Short decision paths. You reach me personally — no ticket systems, no intermediaries." as string,
      },
      noBloatedTeams: {
        title: "One expert for everything" as string,
        description: "From architecture to deployment: one person who knows the whole system and takes responsibility." as string,
      },
      justResults: {
        title: "Results over timesheets" as string,
        description: "Measured by value for your business — not hours burned or colorful status reports." as string,
      },
    },
    stats: {
      experience: "Years experience" as string,
      projects: "Projects delivered" as string,
      satisfaction: "Developed & hosted in Germany" as string,
      support: "Single point of contact" as string,
    },
  },
  contact: {
    sectionTagline: "Contact" as string,
    sectionTitle1: "Tell me about your project — no strings attached." as string,
    sectionTitle2: "" as string,
    description:
      "In a free intro call we'll figure out what you need and whether I'm the right fit. No sales pressure, no obligation." as string,
    buttonText: "Get in touch" as string,
    emailHint: "Click to reveal email address" as string,
    trustedTech: "Trusted technologies" as string,
    form: {
      name: "Name" as string,
      namePlaceholder: "Your name" as string,
      email: "Email" as string,
      emailPlaceholder: "your@email.com" as string,
      message: "Message" as string,
      messagePlaceholder: "Describe your project..." as string,
      submit: "Send message" as string,
      sending: "Sending..." as string,
      successMessage:
        "Thank you! I'll get back to you as soon as possible." as string,
      errorMessage: "An error occurred. Please try again later." as string,
    },
  },
};

export type HomeTranslations = typeof home;
