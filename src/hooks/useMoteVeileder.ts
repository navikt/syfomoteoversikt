import { useAppSelector } from "./hooks";
import { MoteDTO } from "../data/moter/moterTypes";
import { VeilederDto } from "../data/veiledere/veilederTypes";
import { DialogmoterDTO } from "../data/dialogmoter/dialogmoterTypes";
import { isDialogmote } from "../utils/dialogmoterUtil";

export const useMoteVeileder = (): {
  getVeileder: (mote: MoteDTO | DialogmoterDTO) => VeilederDto | undefined;
} => {
  const veiledere = useAppSelector((state) => state.veiledere.data);
  const getVeileder = (
    mote: MoteDTO | DialogmoterDTO
  ): VeilederDto | undefined => {
    return isDialogmote(mote)
      ? veiledere.find(({ ident }) => mote.tildeltVeilederIdent === ident)
      : veiledere.find(({ ident }) => mote.eier === ident);
  };

  return {
    getVeileder,
  };
};
