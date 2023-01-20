import { get } from "@/api";
import {
  EregOrganisasjonResponseDTO,
  getVirksomhetsnavn,
} from "@/data/virksomhet/EregVirksomhetsnavn";
import { EREG_ROOT } from "@/utils/apiUrlUtil";
import { minutesToMillis } from "@/utils/timeUtils";
import { useQuery } from "@tanstack/react-query";

export const virksomhetQueryKeys = {
  virksomhet: (virksomhetsnummer: string) => ["virksomhet", virksomhetsnummer],
};

export const useVirksomhetQuery = (virksomhetsnummer: string) => {
  const fetchVirksomhet = () =>
    get<EregOrganisasjonResponseDTO>(
      `${EREG_ROOT}/organisasjon/${virksomhetsnummer}`
    );
  const query = useQuery({
    queryKey: virksomhetQueryKeys.virksomhet(virksomhetsnummer),
    queryFn: fetchVirksomhet,
    enabled: !!virksomhetsnummer,
    staleTime: minutesToMillis(60 * 12),
  });
  return {
    ...query,
    virksomhetsnavn: query.data && getVirksomhetsnavn(query.data),
  };
};
