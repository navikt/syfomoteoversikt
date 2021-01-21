export function hentVeileder(data) {
  return {
    type: "HENT_VEILEDER_FORESPURT",
    data,
  };
}

export function henterVeileder(data) {
  return {
    type: "HENTER_VEILEDER",
    data,
  };
}

export function veilederHentet(data) {
  return {
    type: "VEILEDER_HENTET",
    data,
  };
}

export function hentVeilederFeilet(data) {
  return {
    type: "HENT_VEILEDER_FEILET",
    data,
  };
}
