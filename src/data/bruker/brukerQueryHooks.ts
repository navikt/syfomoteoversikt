import { get } from "@/api";
import { BrukerinfoDTO } from "@/data/bruker/BrukerinfoDTO";
import { SYFOMOTEADMIN_ROOT } from "@/utils/apiUrlUtil";
import { useQuery } from "react-query";
import { AktorDTO } from "@/data/bruker/AktorDTO";

export const brukerQueryKeys = {
  brukerinfo: (ident: string) => ["brukerinfo", ident],
  fnr: (ident: string) => ["fnr", ident],
};

export const useBrukerQuery = (ident: string) => {
  const fetchBrukerInfo = () =>
    get<BrukerinfoDTO>(`${SYFOMOTEADMIN_ROOT}/v2/brukerinfo/${ident}`);
  return useQuery(brukerQueryKeys.brukerinfo(ident), fetchBrukerInfo, {
    enabled: !!ident,
  });
};

export const useFnrQuery = (ident: string) => {
  const fetchFnr = () =>
    get<AktorDTO>(`${SYFOMOTEADMIN_ROOT}/v2/aktor/${ident}`);
  return useQuery(brukerQueryKeys.fnr(ident), fetchFnr, { enabled: !!ident });
};
