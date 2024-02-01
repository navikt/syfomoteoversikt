import * as amplitude from "@amplitude/analytics-browser";
import { erProd } from "@/utils/miljoUtil";

export const texts = {
  click: "Klikker på:",
  pageLoad: "Laster side",
};

const getApiKey = () => {
  return erProd()
    ? "e4b68538f8d185f0ee2d913d8e51bd39"
    : "c7bcaaf5d0fddda592412234dd3da1ba";
};

amplitude.init(getApiKey(), undefined, {
  serverUrl: "https://amplitude.nav.no/collect",
  defaultTracking: true,
});

export const trackOnClick = (elementName: string) => {
  trackEvent(`${texts.click} ${elementName}`, {
    pageName: document.title,
  });
};

export const trackPageLoad = (pageName: string) => {
  trackEvent(`${texts.pageLoad}`, {
    pageName: pageName,
  });
};

export const trackEvent = (
  eventName: string,
  eventData?: Record<string, string>
) => amplitude.track(eventName, eventData);
