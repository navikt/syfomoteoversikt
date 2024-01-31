import { ISDIALOGMOTE_ROOT } from "@/utils/apiUrlUtil";
import { post } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DialogmoterDTO,
  TildelDialogmoterRequest,
} from "@/data/dialogmoter/dialogmoterTypes";

export const tildelDialogmoterQueryKeys = {
  veileder: (veilederIdent: string) => ["veilederIdent", veilederIdent],
};

export function useTildelDialogmoter(veilederIdent: string) {
  const queryClient = useQueryClient();
  const path = `${ISDIALOGMOTE_ROOT}/v2/dialogmote/tildel`;
  const veilederQueryKey = tildelDialogmoterQueryKeys.veileder(veilederIdent);

  return useMutation({
    mutationFn: (requestBody: TildelDialogmoterRequest) =>
      post<TildelDialogmoterRequest>(path, requestBody),
    onSuccess: (data: DialogmoterDTO[]) => {
      queryClient.setQueryData(veilederQueryKey, data);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: veilederQueryKey }),
  });
}
