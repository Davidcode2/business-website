export const home = {
  hero: {
    tagline: "Digital Solutions Provider" as string,
    headline1: "From idea to" as string,
    headline2: "deployment" as string,
    headline3: "in record time" as string,
    subheadline:
      "You have a vision. I have the tools to make it real. Custom websites, webshops, and cloud infrastructure—delivered fast." as string,
    ctaPrimary: "Let's talk" as string,
    ctaSecondary: "Explore services" as string,
  },
  services: {
    sectionTagline: "What I offer" as string,
    sectionTitle1: "Services built for" as string,
    sectionTitle2: "results" as string,
    sectionDescription:
      "From concept to launch, I provide end-to-end digital solutions that drive business growth." as string,
    webDevelopment: {
      title: "Web Development & E-Commerce" as string,
      description:
        "Websites and shops that sell. Clean code, fast performance, seamless checkout, and exceptional user experience—everything in one service." as string,
      learnMore: "Learn more" as string,
    },
    aiEnablement: {
      title: "AI Enablement" as string,
      description:
        "Be at the forefront of the productivity enabled by AI. Strategy, implementation, and training to transform your business with artificial intelligence." as string,
      learnMore: "Learn more" as string,
    },
    cloudDevops: {
      title: "Cloud & DevOps" as string,
      description:
        "Kubernetes deployment, CI/CD pipelines, and scalable infrastructure. Your app stays online, always." as string,
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
    sectionTagline: "The difference" as string,
    sectionTitle1: "From first call to live deployment—" as string,
    sectionTitle2: "measured in days, not months" as string,
    description:
      "Technology should serve your business, not complicate it. I cut through the noise and deliver solutions that work—fast, reliable, and built to scale." as string,
    valueProps: {
      noMeetings: {
        title: "No endless meetings" as string,
        description: "Direct communication, quick decisions." as string,
      },
      noBloatedTeams: {
        title: "No bloated teams" as string,
        description: "One expert, focused on your success." as string,
      },
      justResults: {
        title: "Just results" as string,
        description: "Measured in business value, not hours." as string,
      },
    },
    stats: {
      experience: "Years experience" as string,
      projects: "Projects delivered" as string,
      satisfaction: "Client satisfaction" as string,
      support: "Support available" as string,
    },
  },
  contact: {
    sectionTagline: "Get in touch" as string,
    sectionTitle1: "Ready to bring your" as string,
    sectionTitle2: "vision to life?" as string,
    description:
      "Let's discuss your project. No obligations, just a conversation about what's possible." as string,
    buttonText: "Get in touch" as string,
    emailHint: "Click to reveal email address" as string,
    trustedTech: "Trusted technologies" as string,
  },
};

export type HomeTranslations = typeof home;
