
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.nomadyouth.com.az";

const pageSEO = {
  "/": {
    title: "Nomad Youth | Gənclər üçün inkişaf imkanları",
    description:
      "Nomad Youth — gənclər üçün könüllülük, beynəlxalq layihələr, Erasmus+, təcrübə, təlim və inkişaf imkanlarını bir platformada kəşf edin.",
  },

  "/opportunities": {
    title: "Nomad Youth | İmkanlar",
    description:
      "Azərbaycanda və xaricdə könüllülük, Erasmus+, təcrübə, təlim, mübadilə və digər gənclər üçün imkanları kəşf edin.",
  },

  "/about": {
    title: "Nomad Youth | Haqqımızda",
    description:
      "Nomad Youth platforması, missiyamız, fəaliyyətimiz və gənclərin inkişafı üçün yaratdığımız imkanlar haqqında məlumat əldə edin.",
  },

  "/contact": {
    title: "Nomad Youth | Əlaqə",
    description:
      "Nomad Youth komandası ilə əlaqə saxlayın. Suallarınız, təklifləriniz və əməkdaşlıq müraciətləriniz üçün bizə yazın.",
  },

  "/faq": {
    title: "Nomad Youth | Tez-tez verilən suallar",
    description:
      "Nomad Youth platformasının istifadəsi, imkanlara müraciət, qeydiyyat və üzvlük haqqında tez-tez verilən sualların cavabları.",
  },

  "/partnerships": {
    title: "Nomad Youth | Tərəfdaşlarımız",
    description:
        "Nomad Youth-un tərəfdaşları, əməkdaşlıq etdiyi təşkilatlar və gənclərin inkişafına töhfə verən qurumlarla tanış olun.",  },
};

function updateMeta(attribute, key, content) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function updateCanonical(url) {
  let canonical = document.head.querySelector(
    'link[rel="canonical"]'
  );

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
}

function SEOManager() {
  const location = useLocation();

  useEffect(() => {
    const pathname =
      location.pathname.replace(/\/+$/, "") || "/";

    const currentPage = pageSEO[pathname] || {
      title: "Nomad Youth | Gənclər üçün imkanlar",
      description:
        "Nomad Youth platformasında gənclər üçün könüllülük, beynəlxalq layihələr, təcrübə və inkişaf imkanlarını kəşf edin.",
    };

    const canonicalURL =
      `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

    document.title = currentPage.title;

    updateMeta(
      "name",
      "description",
      currentPage.description
    );

    updateCanonical(canonicalURL);

    updateMeta("property", "og:type", "website");
    updateMeta("property", "og:site_name", "Nomad Youth");
    updateMeta("property", "og:title", currentPage.title);
    updateMeta(
      "property",
      "og:description",
      currentPage.description
    );
    updateMeta("property", "og:url", canonicalURL);
    updateMeta("property", "og:locale", "az_AZ");

    updateMeta("name", "twitter:card", "summary");
    updateMeta("name", "twitter:title", currentPage.title);
    updateMeta(
      "name",
      "twitter:description",
      currentPage.description
    );

  }, [location.pathname]);

  return null;
}

export default SEOManager;
