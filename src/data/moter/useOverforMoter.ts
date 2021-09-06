import { post } from "@/api";
import { SYFOMOTEADMIN_ROOT } from "@/utils/apiUrlUtil";
import { useMutation, useQueryClient } from "react-query";
import { moterQueryKeys } from "@/data/moter/moterQueryHooks";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";
import { MoteoverforingActionType } from "@/context/moteoverforing/moteoverforingActions";
import { MoteDTO } from "@/data/moter/moterTypes";
import { useAktivVeileder } from "@/data/veiledere/veilederQueryHooks";

export const useOverforMoter = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useMoteoverforing();
  const aktivVeilederIdent = useAktivVeileder().data?.ident;
  const path = `${SYFOMOTEADMIN_ROOT}/v2/actions/moter/overfor`;
  const moterQueryKey = moterQueryKeys.moter;
  const postOverforMoter = (moteUuidListe: string[]) =>
    post(path, { moteUuidListe });
  return useMutation(postOverforMoter, {
    onMutate: (moteUuidListe: string[]) => {
      const previousMoter = queryClient.getQueryData<MoteDTO[]>(moterQueryKey);
      if (previousMoter && aktivVeilederIdent) {
        queryClient.setQueryData(
          moterQueryKey,
          previousMoter.map((mote) => {
            if (moteUuidListe.some((uuid) => uuid === mote.moteUuid)) {
              return {
                ...mote,
                eier: aktivVeilederIdent,
              };
            }

            return mote;
          })
        );
      }

      return { previousMoter };
    },
    onError: (error, variables, context) => {
      if (context?.previousMoter) {
        queryClient.setQueryData(moterQueryKey, context.previousMoter);
      }
    },
    onSuccess: () => dispatch({ type: MoteoverforingActionType.MoterOverfort }),
    onSettled: () => queryClient.invalidateQueries(moterQueryKey),
  });
};
