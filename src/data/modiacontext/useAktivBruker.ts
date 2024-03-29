import { useMutation } from "@tanstack/react-query";
import { post } from "@/api";
import { MODIACONTEXTHOLDER_ROOT } from "@/utils/apiUrlUtil";

const NY_AKTIV_BRUKER = "NY_AKTIV_BRUKER";

export const useAktivBruker = () =>
  useMutation({
    mutationFn: (fnr: string) =>
      post(`${MODIACONTEXTHOLDER_ROOT}/context`, {
        verdi: fnr,
        eventType: NY_AKTIV_BRUKER,
      }),
  });
