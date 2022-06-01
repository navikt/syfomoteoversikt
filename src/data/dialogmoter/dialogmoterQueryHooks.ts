import { ISDIALOGMOTE_ROOT } from "@/utils/apiUrlUtil";
import {
  DialogmoterDTO,
  DialogmoteStatus,
} from "@/data/dialogmoter/dialogmoterTypes";
import { get } from "@/api";
import { useQuery } from "react-query";
import { useVeiledereQuery } from "@/data/veiledere/veilederQueryHooks";
import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";
import { minutesToMillis } from "@/utils/timeUtils";

export const dialogmoterQueryKeys = {
  dialogmoter: (enhetId?: string) => ["dialogmoter", enhetId],
  veilederident: ["dialogmoter", "veilederident"],
};

export const useEnhetensDialogmoterQuery = () => {
  const { aktivEnhet } = useAktivEnhet();
  const fetchDialogmoter = () =>
    get<DialogmoterDTO[]>(
      `${ISDIALOGMOTE_ROOT}/v2/dialogmote/enhet/${aktivEnhet}`
    );
  return useQuery(
    dialogmoterQueryKeys.dialogmoter(aktivEnhet),
    fetchDialogmoter,
    {
      enabled: !!aktivEnhet,
      select: aktiveDialogmoter,
      staleTime: minutesToMillis(10),
    }
  );
};

export const useMineDialogmoterQuery = () => {
  const fetchDialogmoter = () =>
    get<DialogmoterDTO[]>(`${ISDIALOGMOTE_ROOT}/v2/dialogmote/veilederident`);

  return useQuery(dialogmoterQueryKeys.veilederident, fetchDialogmoter, {
    select: aktiveDialogmoter,
    staleTime: minutesToMillis(10),
  });
};

export const useDialogmoterVeiledere = () => {
  const dialogmoterQuery = useEnhetensDialogmoterQuery();
  const veilederIdenter =
    dialogmoterQuery.data?.map(
      (dialogmote) => dialogmote.tildeltVeilederIdent
    ) || [];
  return useVeiledereQuery(veilederIdenter);
};

const aktiveDialogmoter = (dialogmoter: DialogmoterDTO[]) =>
  dialogmoter.filter(
    (dialogmote) =>
      dialogmote.status === DialogmoteStatus.INNKALT ||
      dialogmote.status === DialogmoteStatus.NYTT_TID_STED
  );
