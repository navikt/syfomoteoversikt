import { ISDIALOGMOTE_ROOT } from "@/utils/apiUrlUtil";
import { patch } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DialogmoterDTO,
  TildelDialogmoterRequestBody,
} from "@/data/dialogmoter/dialogmoterTypes";
import { dialogmoterQueryKeys } from "@/data/dialogmoter/dialogmoterQueryHooks";
import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";

export function useTildelDialogmoter() {
  const queryClient = useQueryClient();
  const { aktivEnhet } = useAktivEnhet();
  const path = `${ISDIALOGMOTE_ROOT}/v2/dialogmote/tildel`;

  const tildelDialogmoterRequest = (
    requestBody: TildelDialogmoterRequestBody
  ) => patch(path, requestBody);

  return useMutation({
    mutationFn: tildelDialogmoterRequest,
    onMutate: (requestBody: TildelDialogmoterRequestBody) => {
      const previousDialogmoter = queryClient.getQueryData<DialogmoterDTO[]>(
        dialogmoterQueryKeys.veilederident
      );
      if (previousDialogmoter) {
        queryClient.setQueryData(
          dialogmoterQueryKeys.veilederident,
          previousDialogmoter.filter(
            (mote) => !requestBody.dialogmoteUuids.includes(mote.uuid)
          )
        );
      }
      return { previousDialogmoter };
    },
    onError: (err, requestBody, context) => {
      if (context?.previousDialogmoter) {
        queryClient.setQueryData(
          dialogmoterQueryKeys.veilederident,
          context.previousDialogmoter
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dialogmoterQueryKeys.veilederident,
      });
      queryClient.invalidateQueries({
        queryKey: dialogmoterQueryKeys.dialogmoter(aktivEnhet),
      });
    },
  });
}
