import { useAppSelector } from "../../hooks/hooks";
import { DialogmoteStatus } from "./dialogmoter";
import { useAktivVeileder } from "../veiledere/veileder_hooks";

export const useDialogmoter = () => {
  const { data, hentingFeilet, henter, hentetEnhet } = useAppSelector(
    (state) => state.dialogmoter
  );
  const aktiveDialogmoter = data.filter(
    (dialogmote) =>
      dialogmote.status === DialogmoteStatus.INNKALT ||
      dialogmote.status === DialogmoteStatus.NYTT_TID_STED
  );
  const aktivVeileder = useAktivVeileder();
  const mineAktiveDialogmoter = aktiveDialogmoter.filter(
    (dialogmote) => dialogmote.tildeltVeilederIdent === aktivVeileder
  );

  return {
    dialogmoter: data,
    aktiveDialogmoter,
    mineAktiveDialogmoter,
    harMineAktiveDialogmoter: mineAktiveDialogmoter.length > 0,
    harAktiveDialogmoter: aktiveDialogmoter.length > 0,
    henterDialogmoter: henter,
    hentDialogmoterFeilet: hentingFeilet,
    hentetDialogmoterForEnhet: hentetEnhet,
  };
};
