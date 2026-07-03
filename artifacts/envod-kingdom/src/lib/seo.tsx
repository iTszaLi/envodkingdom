import { useEffect } from "react";

interface MetaTag {
  attr: "name" | "property";
  key: string;
  content: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  /** Absolute or root-relative canonical path, e.g. "/gallery". */
  canonicalPath?: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  /** One or more JSON-LD objects injected as <script type="application/ld+json">. */
  jsonLd?: Array<Record<string, unknown>>;
}

const MANAGED = "data-seo-managed";

function upsertMeta(attr: "name" | "property", key: string, content: string): HTMLMetaElement {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.setAttribute(MANAGED, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

function upsertCanonical(href: string): HTMLLinkElement {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    el.setAttribute(MANAGED, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return el;
}

/**
 * Imperatively manage document head tags for SEO. No external dependency.
 * Injected JSON-LD scripts are removed on unmount; meta/canonical tags persist
 * and are overwritten by the next page that mounts this hook.
 */
export function useSeo(config: SeoConfig): void {
  const { title, description, canonicalPath, image, imageAlt, type = "website", jsonLd } = config;

  useEffect(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const canonicalUrl = canonicalPath
      ? canonicalPath.startsWith("http")
        ? canonicalPath
        : `${origin}${canonicalPath}`
      : typeof window !== "undefined"
        ? window.location.href
        : "";

    const previousTitle = document.title;
    document.title = title;

    const metas: MetaTag[] = [
      { attr: "name", key: "description", content: description },
      { attr: "property", key: "og:title", content: title },
      { attr: "property", key: "og:description", content: description },
      { attr: "property", key: "og:type", content: type },
      { attr: "property", key: "og:url", content: canonicalUrl },
      { attr: "name", key: "twitter:card", content: image ? "summary_large_image" : "summary" },
      { attr: "name", key: "twitter:title", content: title },
      { attr: "name", key: "twitter:description", content: description },
    ];
    if (image) {
      metas.push({ attr: "property", key: "og:image", content: image });
      metas.push({ attr: "name", key: "twitter:image", content: image });
      if (imageAlt) metas.push({ attr: "property", key: "og:image:alt", content: imageAlt });
    }

    for (const m of metas) upsertMeta(m.attr, m.key, m.content);
    if (canonicalUrl) upsertCanonical(canonicalUrl);

    const scripts: HTMLScriptElement[] = [];
    if (jsonLd && jsonLd.length) {
      for (const obj of jsonLd) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute(MANAGED, "true");
        script.text = JSON.stringify(obj);
        document.head.appendChild(script);
        scripts.push(script);
      }
    }

    return () => {
      for (const s of scripts) s.remove();
      document.title = previousTitle;
    };
  }, [title, description, canonicalPath, image, imageAlt, type, JSON.stringify(jsonLd)]);
}
