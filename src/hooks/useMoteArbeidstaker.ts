import { MoteDTO } from "../data/moter/moterTypes";
import { DialogmoterDTO } from "../data/dialogmoter/dialogmoterTypes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { hentBruker } from "../data/bruker/bruker_actions";
import { hentFnr } from "../data/fnr/fnr_actions";
import { findDeltakerByType } from "../utils/moterUtil";
import { isDialogmote } from "../utils/dialogmoterUtil";

export type Arbeidstaker = {
  navn?: string;
  fnr?: string;
};

export const useMoteArbeidstaker = (
  mote: MoteDTO | DialogmoterDTO
): Arbeidstaker | undefined => {
  const dispatch = useDispatch();

  const moteUuid = isDialogmote(mote) ? mote.uuid : mote.moteUuid;
  const moteBrukerIdent = isDialogmote(mote)
    ? mote.arbeidstaker.personIdent
    : mote.aktorId;
  const arbeidstaker = isDialogmote(mote)
    ? { ...mote.arbeidstaker, fnr: moteBrukerIdent }
    : findDeltakerByType(mote, "BRUKER");

  useEffect(() => {
    if (!arbeidstaker?.navn && moteBrukerIdent) {
      dispatch(hentBruker(moteBrukerIdent, moteUuid));
    }
  }, []);

  useEffect(() => {
    if (!arbeidstaker?.fnr && moteBrukerIdent) {
      dispatch(hentFnr(moteBrukerIdent, moteUuid));
    }
  }, []);

  return arbeidstaker;
};
