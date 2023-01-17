import { VeilederDto } from "@/data/veiledere/veilederTypes";
import { get } from "@/api";
import { SYFOVEILEDER_ROOT } from "@/utils/apiUrlUtil";
import { useQueries, useQuery } from "@tanstack/react-query";

export const veilederQueryKeys = {
  veileder: ["veileder"],
  veilederByIdent: (ident: string) => [...veilederQueryKeys.veileder, ident],
};

const fetchVeilederByIdent = (ident: string) =>
  get<VeilederDto>(`${SYFOVEILEDER_ROOT}/v2/veileder/${ident}`);

export const useAktivVeileder = () => {
  const fetchVeileder = () =>
    get<VeilederDto>(`${SYFOVEILEDER_ROOT}/v2/veileder/self`);
  return useQuery(veilederQueryKeys.veileder, fetchVeileder);
};

export const useVeilederQuery = (ident: string) => {
  return useQuery(
    veilederQueryKeys.veilederByIdent(ident),
    () => fetchVeilederByIdent(ident),
    { enabled: !!ident }
  );
};

export const useVeiledereQuery = (identList: string[]) => {
  const veiledereQueries = useQueries({
    queries: identList.map((ident) => ({
      queryKey: veilederQueryKeys.veilederByIdent(ident),
    })),
  });
  return veiledereQueries
    .map((query) => query.data)
    .filter((veileder) => veileder !== undefined) as VeilederDto[];
};
