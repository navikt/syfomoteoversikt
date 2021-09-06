import { VeilederDto } from "@/data/veiledere/veilederTypes";
import { get } from "@/api";
import { SYFOVEILEDER_ROOT } from "@/utils/apiUrlUtil";
import { useQueries, useQuery, UseQueryResult } from "react-query";

export const veilederQueryKeys = {
  veileder: ["veileder"],
  veilederByIdent: (ident: string) => [...veilederQueryKeys.veileder, ident],
};

const fetchVeilederByIdent = (ident: string) =>
  get<VeilederDto>(`${SYFOVEILEDER_ROOT}/v2/veileder/${ident}`);

export const useAktivVeileder = () => {
  const fetchVeileder = () =>
    get<VeilederDto>(`${SYFOVEILEDER_ROOT}/v2/veileder/self`);
  return useQuery(veilederQueryKeys.veileder, fetchVeileder, {
    staleTime: 600000,
  });
};

export const useVeilederQuery = (ident: string) => {
  return useQuery(
    veilederQueryKeys.veilederByIdent(ident),
    () => fetchVeilederByIdent(ident),
    {
      staleTime: 600000,
    }
  );
};

export const useVeiledereQuery = (identList: string[]) => {
  const veiledereQueries = useQueries(
    identList.map((ident) => ({
      queryKey: veilederQueryKeys.veilederByIdent(ident),
      queryFn: () => fetchVeilederByIdent(ident),
      staleTime: 600000,
    }))
  ) as UseQueryResult<VeilederDto>[];
  return veiledereQueries
    .map((query) => query.data)
    .filter((veileder) => veileder !== undefined) as VeilederDto[];
};
