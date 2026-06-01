import { Veileder, VeilederDTO } from "@/data/veiledere/veilederTypes";
import { get } from "@/api";
import { SYFOVEILEDER_ROOT } from "@/utils/apiUrlUtil";
import { useQueries, useQuery } from "@tanstack/react-query";

const selectVeileder = (data: VeilederDTO): Veileder =>
  new Veileder(data.ident, data.fornavn, data.etternavn);

const selectVeiledere = (data: VeilederDTO[]): Veileder[] =>
  data.map(
    ({ ident, fornavn, etternavn }) => new Veileder(ident, fornavn, etternavn)
  );

export const veilederQueryKeys = {
  veileder: ["veileder"],
  enhet: ["enhet"],
  veilederByIdent: (ident: string) => [...veilederQueryKeys.veileder, ident],
  veiledereByEnhet: (enhet: string) => [...veilederQueryKeys.enhet, enhet],
};

const fetchVeilederByIdent = (ident: string) =>
  get<VeilederDTO>(`${SYFOVEILEDER_ROOT}/v3/veiledere/${ident}`);

export const useAktivVeileder = () => {
  const fetchVeileder = () =>
    get<VeilederDTO>(`${SYFOVEILEDER_ROOT}/v3/veiledere/self`);
  return useQuery({
    queryKey: veilederQueryKeys.veileder,
    queryFn: fetchVeileder,
    select: selectVeileder,
  });
};

export const useVeilederQuery = (ident: string) => {
  return useQuery({
    queryKey: veilederQueryKeys.veilederByIdent(ident),
    queryFn: () => fetchVeilederByIdent(ident),
    enabled: !!ident,
    select: selectVeileder,
  });
};

export const useVeiledereQuery = (identList: string[]) => {
  return useQueries({
    queries: identList.map((ident) => ({
      queryKey: veilederQueryKeys.veilederByIdent(ident),
      queryFn: () => fetchVeilederByIdent(ident),
      select: selectVeileder,
    })),
    combine: (result) => {
      return result
        .map((query) => query.data)
        .filter((veileder) => veileder !== undefined);
    },
  });
};

export function useGetVeiledere(enhet: string) {
  return useQuery({
    queryKey: veilederQueryKeys.veiledereByEnhet(enhet),
    queryFn: () =>
      get<VeilederDTO[]>(`${SYFOVEILEDER_ROOT}/v3/veiledere?enhetNr=${enhet}`),
    enabled: !!enhet,
    select: selectVeiledere,
  });
}
