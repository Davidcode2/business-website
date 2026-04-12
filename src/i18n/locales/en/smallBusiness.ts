export const smallBusiness = {
  sbMeta: {
    title: "Complete Website for Small Business | Jakob Lingel" as string,
    description:
      "Professional website for €500. Everything included: Design, hosting, domain, updates & legal. For freelancers and small businesses in Aalen and surrounding areas." as string,
  },
  sbHero: {
    headline: "Complete Website" as string,
    price: "€500" as string,
    subheadline: "one-time" as string,
    description:
      "Everything handled: Design, hosting, domain, updates & legal. For freelancers and small businesses in Aalen and surrounding areas." as string,
    cta: "Get free consultation" as string,
  },
  sbIncludes: {
    title: "What's included" as string,
    items: {
      design: {
        title: "Complete Design" as string,
        description:
          "Custom website, perfectly tailored to your business" as string,
      },
      hosting: {
        title: "Hosting & Domain" as string,
        description:
          "Includes domain, SSL certificate & fast hosting in Germany" as string,
      },
      updates: {
        title: "Updates & Legal" as string,
        description:
          "Monthly updates, security & GDPR-compliant privacy policy" as string,
      },
    },
  },
  sbPricing: {
    title: "Pricing" as string,
    newWebsite: {
      name: "New Website" as string,
      price: "€500" as string,
      priceSubtext: "one-time" as string,
      monthly: "+ €15/month" as string,
      description: "Perfect for new businesses" as string,
      features: [
        "Complete design to your specifications" as string,
        "Domain & hosting included" as string,
        "SSL certificate & security" as string,
        "GDPR-compliant privacy policy" as string,
        "Monthly updates" as string,
      ] as string[],
      cta: "Inquire now" as string,
    },
    rebuild: {
      name: "Website Refresh" as string,
      price: "€300" as string,
      priceSubtext: "one-time" as string,
      monthly: "+ €15/month" as string,
      description: "Modernize your existing site" as string,
      features: [
        "Fresh, modern design" as string,
        "Existing content migration" as string,
        "Mobile optimization" as string,
        "Performance improvements" as string,
        "Monthly updates" as string,
      ] as string[],
      cta: "Inquire now" as string,
    },
  },
  sbCta: {
    headline: "Ready for your new website?" as string,
    description:
      "Let's discuss your needs in 15 minutes – free and no obligation." as string,
    button: "Schedule a call" as string,
  },
};

export type SmallBusinessTranslations = typeof smallBusiness;
