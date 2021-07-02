import amplitude from "amplitude-js";

export const texts = {
  click: "Klikker på:",
  pageLoad: "Laster side",
};

export const initAmplitude = () => {
  amplitude?.getInstance().init("default", "", {
    apiEndpoint: "amplitude.nav.no/collect-auto",
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: window.location.toString(),
  });
};

export interface UserProperties {
  valgtEnhet: string;
}

export const setAmplitudeUserProperties = (userProperties: UserProperties) => {
  amplitude?.getInstance().setUserProperties(userProperties);
};

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
) => {
  amplitude.getInstance().logEvent(eventName, eventData);
};
