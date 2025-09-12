import { Veileder, VeilederDTO } from "@/data/veiledere/veilederTypes";
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
  get<VeilederDTO>(`${SYFOVEILEDER_ROOT}/v3/veiledere/${ident}`);

export const useAktivVeileder = () => {
  const fetchVeileder = () =>
    get<VeilederDTO>(`${SYFOVEILEDER_ROOT}/v3/veiledere/self`);
  return useQuery({
    queryKey: veilederQueryKeys.veileder,
    queryFn: fetchVeileder,
    select: (data) => new Veileder(data.ident, data.fornavn, data.etternavn),
  });
};

export const useVeilederQuery = (ident: string) => {
  return useQuery({
    queryKey: veilederQueryKeys.veilederByIdent(ident),
    queryFn: () => fetchVeilederByIdent(ident),
    enabled: !!ident,
    select: (data) => new Veileder(data.ident, data.fornavn, data.etternavn),
  });
};

export const useVeiledereQuery = (identList: string[]) => {
  const veiledereQueries = useQueries({
    queries: identList.map((ident) => ({
      queryKey: veilederQueryKeys.veilederByIdent(ident),
      select: (data: VeilederDTO) =>
        new Veileder(data.ident, data.fornavn, data.etternavn),
    })),
  });
  return veiledereQueries
    .map((query) => query.data)
    .filter((veileder) => veileder !== undefined) as Veileder[];
};

export function useGetVeiledere(enhet: string) {
  return useQuery({
    queryKey: veilederQueryKeys.veiledereByEnhet(enhet),
    queryFn: () =>
      get<VeilederDTO[]>(`${SYFOVEILEDER_ROOT}/v3/veiledere?enhetNr=${enhet}`),
    enabled: !!enhet,
    select: (data) =>
      data.map(
        (veileder) =>
          new Veileder(veileder.ident, veileder.fornavn, veileder.etternavn)
      ),
  });
}
