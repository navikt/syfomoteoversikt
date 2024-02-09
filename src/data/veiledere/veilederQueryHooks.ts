import { VeilederDto, VeilederInfoDto } from "@/data/veiledere/veilederTypes";
import { get } from "@/api";
import { SYFOVEILEDER_ROOT } from "@/utils/apiUrlUtil";
import { useQueries, useQuery } from "@tanstack/react-query";

export const veilederQueryKeys = {
  veileder: ["veileder"],
  enhet: ["enhet"],
  veilederByIdent: (ident: string) => [...veilederQueryKeys.veileder, ident],
  veiledereByEnhet: (enhet: string) => [...veilederQueryKeys.enhet, enhet],
};

const fetchVeilederByIdent = (ident: string) =>
  get<VeilederInfoDto>(`${SYFOVEILEDER_ROOT}/v2/veileder/${ident}`);

export const useAktivVeileder = () => {
  const fetchVeileder = () =>
    get<VeilederInfoDto>(`${SYFOVEILEDER_ROOT}/v2/veileder/self`);
  return useQuery({
    queryKey: veilederQueryKeys.veileder,
    queryFn: fetchVeileder,
  });
};

export const useVeilederQuery = (ident: string) => {
  return useQuery({
    queryKey: veilederQueryKeys.veilederByIdent(ident),
    queryFn: () => fetchVeilederByIdent(ident),
    enabled: !!ident,
  });
};

export const useVeiledereQuery = (identList: string[]) => {
  const veiledereQueries = useQueries({
    queries: identList.map((ident) => ({
      queryKey: veilederQueryKeys.veilederByIdent(ident),
    })),
  });
  return veiledereQueries
    .map((query) => query.data)
    .filter((veileder) => veileder !== undefined) as VeilederInfoDto[];
};

export function useGetVeiledere(enhet: string) {
  return useQuery({
    queryKey: veilederQueryKeys.veiledereByEnhet(enhet),
    queryFn: () =>
      get<VeilederDto[]>(`${SYFOVEILEDER_ROOT}/v2/veiledere/enhet/${enhet}`),
    enabled: !!enhet,
  });
}
