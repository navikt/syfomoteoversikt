import { get } from "@/api";
import { MoteDTO } from "@/data/moter/moterTypes";
import { SYFOMOTEADMIN_ROOT } from "@/utils/apiUrlUtil";
import { useQuery } from "react-query";
import { ikkeAvbrutt } from "@/utils/moterUtil";
import { useVeiledereQuery } from "@/data/veiledere/veilederQueryHooks";
import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";
import { minutesToMillis } from "@/utils/timeUtils";

const moterBaseUrl = `${SYFOMOTEADMIN_ROOT}/v2/moter`;

export const moterQueryKeys = {
  moter: ["moter"],
  moterEnhet: (enhetId?: string) => [...moterQueryKeys.moter, enhetId],
};

export const useVeiledersMoterQuery = () => {
  const fetchMoterVeileder = () =>
    get<MoteDTO[]>(`${moterBaseUrl}?veiledersmoter=true`);
  return useQuery(moterQueryKeys.moter, fetchMoterVeileder, {
    select: aktiveMoter,
    staleTime: minutesToMillis(10),
  });
};

export const useEnhetensMoterQuery = () => {
  const { aktivEnhet } = useAktivEnhet();
  const fetchMoterEnhet = () =>
    get<MoteDTO[]>(`${moterBaseUrl}?navenhet=${aktivEnhet}`);
  return useQuery(moterQueryKeys.moterEnhet(aktivEnhet), fetchMoterEnhet, {
    enabled: !!aktivEnhet,
    select: aktiveMoter,
    staleTime: minutesToMillis(10),
  });
};

export const useEnhetensMoterVeiledere = () => {
  const enhetensMoterQuery = useEnhetensMoterQuery();
  const veilederIdentList =
    enhetensMoterQuery.data?.map((mote) => mote.eier) || [];
  return useVeiledereQuery(veilederIdentList);
};

const aktiveMoter = (moter: MoteDTO[]) => moter.filter(ikkeAvbrutt());
