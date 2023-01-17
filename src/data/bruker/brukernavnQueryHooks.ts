import { get } from "@/api";
import { BrukerFnrMedNavnDTO } from "@/data/bruker/BrukerFnrMedNavnDTO";
import { SYFOPERSON_ROOT } from "@/utils/apiUrlUtil";
import { useQuery } from "@tanstack/react-query";

export const brukerQueryKeys = {
  brukernavn: (ident: string) => ["brukernavn", ident],
  fnr: (ident: string) => ["fnr", ident],
};

export const useBrukerQuery = (ident: string) => {
  const fetchBrukernavn = () =>
    get<BrukerFnrMedNavnDTO>(`${SYFOPERSON_ROOT}/person/navn`, ident);
  return useQuery(brukerQueryKeys.brukernavn(ident), fetchBrukernavn, {
    enabled: !!ident,
  });
};
