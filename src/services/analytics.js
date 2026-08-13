const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initAnalytics() {
  if (!GA_ID || typeof window === "undefined") return;

  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

  document.head.appendChild(script);
}

export function trackPageView(path) {
  if (!window.gtag || !GA_ID) return;

  window.gtag("config", GA_ID, {
    page_path: path,
  });
}

export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
  }
};

function opportunityParams(opportunity) {
  return {
    opportunity_id: opportunity?.id,
    opportunity_name: opportunity?.title,
    country: opportunity?.country,
    category: Array.isArray(opportunity?.category)
      ? opportunity.category.join(", ")
      : opportunity?.category,
  };
}

export const trackOpportunityClick = (opportunity) =>
  trackEvent("opportunity_click", opportunityParams(opportunity));

export const trackOpportunityView = (opportunity) =>
  trackEvent("opportunity_view", opportunityParams(opportunity));

export const trackOpportunitySave = (opportunity) =>
  trackEvent("opportunity_save", opportunityParams(opportunity));

export const trackOpportunityUnsave = (opportunity) =>
  trackEvent("opportunity_unsave", opportunityParams(opportunity));

export const trackOpportunityApply = (opportunity) =>
  trackEvent("opportunity_apply", opportunityParams(opportunity));


export const trackRegisterStart = () => trackEvent("register_start");

export const trackRegisterSuccess = (method) =>
  trackEvent("register_success", { method });

export const trackLoginSuccess = (method) =>
  trackEvent("login_success", { method });


export const trackServiceView = (service) =>
  trackEvent("service_view", {
    service_id: service?.id,
    service_name: service?.title,
  });

export const trackServiceClick = (service) =>
  trackEvent("service_click", {
    service_id: service?.id,
    service_name: service?.title,
  });