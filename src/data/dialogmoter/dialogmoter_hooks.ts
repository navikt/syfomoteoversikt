import { useAppSelector } from "../../hooks/hooks";
import { useAktivVeileder } from "../veiledere/veileder_hooks";
import { DialogmoterDTO, DialogmoteStatus } from "./dialogmoterTypes";

export const useDialogmoter: () => {
  dialogmoter: DialogmoterDTO[];
  aktiveDialogmoter: DialogmoterDTO[];
  veiledersAktiveDialogmoter: DialogmoterDTO[];
  henterDialogmoter: boolean;
  hentDialogmoterFeilet: boolean;
  hentetDialogmoterForEnhet: string;
  harVeilederAktiveDialogmoter: boolean;
  harAktiveDialogmoter: boolean;
} = () => {
  const aktivVeileder = useAktivVeileder();
  const { data, hentingFeilet, henter, hentetEnhet } = useAppSelector(
    (state) => state.dialogmoter
  );
  const aktiveDialogmoter = data.filter(
    (dialogmote) =>
      dialogmote.status === DialogmoteStatus.INNKALT ||
      dialogmote.status === DialogmoteStatus.NYTT_TID_STED
  );
  const veiledersAktiveDialogmoter = aktiveDialogmoter.filter(
    (dialogmote) => dialogmote.tildeltVeilederIdent === aktivVeileder
  );

  return {
    dialogmoter: data,
    aktiveDialogmoter,
    veiledersAktiveDialogmoter,
    harAktiveDialogmoter: aktiveDialogmoter.length > 0,
    harVeilederAktiveDialogmoter: veiledersAktiveDialogmoter.length > 0,
    henterDialogmoter: henter,
    hentDialogmoterFeilet: hentingFeilet,
    hentetDialogmoterForEnhet: hentetEnhet,
  };
};
