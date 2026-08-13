"use client";

import Script from "next/script";

/**
 * Google's free Website Translator — no API key, no backend, no
 * translation files to maintain. This mounts the (hidden) widget only;
 * LanguageSwitcher.tsx drives it from a custom-styled pill in the header.
 * Trade-off accepted explicitly: works instantly on any current or future
 * content, but quality is machine-translation-grade and can't be
 * art-directed the way a maintained locale system could be.
 */
export function GoogleTranslateWidget() {
  return (
    <>
      <div id="google_translate_element" className="sr-only" aria-hidden="true" />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
              { pageLanguage: "en", autoDisplay: false },
              "google_translate_element"
            );
          }
        `}
      </Script>
      <Script
        id="google-translate-script"
        strategy="afterInteractive"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />
    </>
  );
}

export default GoogleTranslateWidget;
