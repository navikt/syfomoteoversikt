import { post } from "@/api";
import { ISDIALOGMOTE_ROOT } from "@/utils/apiUrlUtil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";
import { dialogmoterQueryKeys } from "./dialogmoterQueryHooks";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { MoteoverforingActionType } from "@/context/moteoverforing/moteoverforingActions";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { useAktivVeileder } from "@/data/veiledere/veilederQueryHooks";

export const useOverforDialogmoter = () => {
  const { aktivEnhet } = useAktivEnhet();
  const aktivVeilederIdent = useAktivVeileder().data?.ident;
  const { dispatch } = useMoteoverforing();
  const queryClient = useQueryClient();
  const path = `${ISDIALOGMOTE_ROOT}/v2/dialogmote/overta`;
  const dialogmoterQueryKey = dialogmoterQueryKeys.dialogmoter(aktivEnhet);
  const postOverforDialogmoter = (dialogmoteUuids: string[]) =>
    post(path, { dialogmoteUuids });

  return useMutation({
    mutationFn: postOverforDialogmoter,
    onMutate: (dialogmoteUuids: string[]) => {
      const previousDialogmoter =
        queryClient.getQueryData<DialogmoterDTO[]>(dialogmoterQueryKey);
      if (previousDialogmoter && aktivVeilederIdent) {
        queryClient.setQueryData(
          dialogmoterQueryKey,
          previousDialogmoter.map((dialogmote) => {
            if (dialogmoteUuids.some((uuid) => uuid === dialogmote.uuid)) {
              return {
                ...dialogmote,
                tildeltVeilederIdent: aktivVeilederIdent,
              };
            }

            return dialogmote;
          })
        );
      }

      return { previousDialogmoter };
    },
    onError: (error, variables, context) => {
      if (context?.previousDialogmoter) {
        queryClient.setQueryData(
          dialogmoterQueryKey,
          context.previousDialogmoter
        );
      }
    },
    onSuccess: () =>
      dispatch({ type: MoteoverforingActionType.DialogmoterOverfort }),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: dialogmoterQueryKey }),
  });
};
