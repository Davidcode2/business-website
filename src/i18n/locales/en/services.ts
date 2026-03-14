export const services = {
  webDevelopment: {
    meta: {
      title: "Web Development & E-Commerce | Jakob Lingel" as string,
      description:
        "Websites and shops that sell. Clean code, fast performance, seamless checkout, and exceptional user experience." as string,
    },
    tagline: "Built for Results" as string,
    heroDescription:
      "Your website should be your best salesperson—working 24/7 to attract, engage, and convert visitors. I build fast, responsive websites and high-converting e-commerce stores that drive real business results." as string,
    problem: {
      headline: "Is your website costing you customers?" as string,
      description:
        "Every day, slow loading times, outdated designs, and clunky e-commerce experiences drive potential customers straight to your competitors. Your website should be your best salesperson—not a liability." as string,
      painPoints: [
        "53% of visitors leave if your site takes more than 3 seconds to load—costing you customers before they even see your offer",
        "High cart abandonment from complicated checkout flows and poor mobile experience",
        "Outdated design that makes your business look unprofessional compared to competitors",
        "Technical headaches requiring expensive developers for every small change",
      ] as string[],
    },
    solution: {
      headline: "Websites that sell, stores that convert" as string,
      description:
        "I build digital experiences that drive business results. Every website and shop is hand-crafted for performance, optimized for conversions, and designed to grow with your business. From brochure sites to full e-commerce—everything you need." as string,
      features: {
        conversionFirst: {
          title: "Conversion-First Design" as string,
          description:
            "Every element is designed to guide visitors toward action. Clear CTAs, streamlined flows, and psychological triggers that turn browsers into buyers." as string,
        },
        ecommerce: {
          title: "E-Commerce Excellence" as string,
          description:
            "One-page checkout, seamless payment integration, and smart inventory management. Your store sells while you sleep." as string,
        },
        performance: {
          title: "Performance Optimized" as string,
          description:
            "Sub-2 second load times that keep visitors engaged and improve your Google rankings. Built with Astro for maximum speed." as string,
        },
        mobileFirst: {
          title: "Mobile-First Experience" as string,
          description:
            "Over 60% of traffic is mobile. Every design is touch-optimized and responsive, capturing customers on any device." as string,
        },
      },
    },
    benefits: {
      headline: "Why these websites convert" as string,
      items: {
        lightningFast: {
          title: "Lightning Fast" as string,
          description:
            "Sub-2 second load times that keep visitors engaged and boost your Google rankings." as string,
        },
        highConverting: {
          title: "High-Converting Stores" as string,
          description:
            "Optimized checkout flows that reduce abandonment and maximize sales." as string,
        },
        mobileOptimized: {
          title: "Mobile First" as string,
          description:
            "Touch-optimized experiences that capture the 60%+ of customers browsing on mobile." as string,
        },
        seoReady: {
          title: "SEO Ready" as string,
          description:
            "Clean code and optimized structure to help you rank higher in search results." as string,
        },
        secure: {
          title: "Secure & Compliant" as string,
          description:
            "HTTPS, security headers, and GDPR compliance built into every site from day one." as string,
        },
        fastDelivery: {
          title: "Fast Delivery" as string,
          description:
            "Most projects launch in 4-6 weeks. Get your new site selling faster than traditional agencies." as string,
        },
      },
    },
    process: {
      headline: "From concept to live site" as string,
      description:
        "A proven process that delivers results without the typical agency overhead." as string,
      steps: {
        discovery: {
          number: "1" as string,
          title: "Discovery & Strategy" as string,
          description:
            "We discuss your goals, target audience, and key requirements. I provide a clear proposal with timeline and pricing—no surprises." as string,
        },
        design: {
          number: "2" as string,
          title: "Design & Development" as string,
          description:
            "I create a custom design and build your site with clean, maintainable code. Regular updates keep you in the loop." as string,
        },
        review: {
          number: "3" as string,
          title: "Review & Refine" as string,
          description:
            "We review the site together, make refinements, and ensure everything meets your expectations before launch." as string,
        },
        launch: {
          number: "4" as string,
          title: "Launch & Support" as string,
          description:
            "Your site goes live with monitoring in place. I provide training and ongoing support to ensure continued success." as string,
        },
      },
    },
    cta: {
      headline: "Ready for a website that works?" as string,
      description:
        "Let's discuss your project and see how a custom-built website can transform your online presence. No obligation, just a conversation about your goals." as string,
      buttonText: "Start Your Project" as string,
    },
  },
  aiEnablement: {
    meta: {
      title: "AI Enablement | Jakob Lingel" as string,
      description:
        "Strategy, implementation, and training for AI transformation. Optimize processes and unlock new possibilities with Artificial Intelligence." as string,
    },
    tagline: "AI Transformation" as string,
    heroDescription:
      "Artificial Intelligence is no longer hype—it is a competitive advantage. I help businesses understand, implement, and leverage AI technologies to optimize processes and unlock new possibilities." as string,
  },
  cloudDevops: {
    meta: {
      title: "Cloud & DevOps | Jakob Lingel" as string,
      description:
        "Kubernetes deployment, CI/CD pipelines, and scalable infrastructure. Your applications stay online, always." as string,
    },
    tagline: "Infrastructure that scales" as string,
    heroDescription:
      "Modern applications need modern infrastructure. I design and implement cloud-native solutions that grow with your business, enable automated deployments, and guarantee 99.9% uptime." as string,
  },
  security: {
    meta: {
      title: "Security Consulting | Jakob Lingel" as string,
      description:
        "Protect your digital assets. Security audits, best practices, and continuous monitoring for your infrastructure." as string,
    },
    tagline: "Protection for your assets" as string,
    heroDescription:
      "In a world of increasing cyber threats, security is no longer a luxury but a necessity. I help businesses secure their digital infrastructure, meet compliance requirements, and build security awareness." as string,
  },
};

export type ServicesTranslations = typeof services;
