import { get } from "@/api";
import { VirksomhetDTO } from "@/data/virksomhet/VirksomhetDTO";
import { SYFOMOTEADMIN_ROOT } from "@/utils/apiUrlUtil";
import { useQuery } from "react-query";

export const virksomhetQueryKeys = {
  virksomhet: (orgnummer: string | undefined) => ["virksomhet", orgnummer],
};

export const useVirksomhetQuery = (orgnummer: string | undefined) => {
  const fetchVirksomhet = () =>
    get<VirksomhetDTO>(`${SYFOMOTEADMIN_ROOT}/v2/virksomhet/${orgnummer}`);
  return useQuery(virksomhetQueryKeys.virksomhet(orgnummer), fetchVirksomhet, {
    enabled: orgnummer !== undefined,
    staleTime: 600000,
  });
};
