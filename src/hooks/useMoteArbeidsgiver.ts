import { MoteDTO } from "../data/moter/moterTypes";
import { DialogmoterDTO } from "../data/dialogmoter/dialogmoterTypes";
import { useDispatch } from "react-redux";
import { findDeltakerByType } from "../utils/moterUtil";
import { useEffect, useMemo } from "react";
import { hentVirksomhet } from "../data/virksomhet/virksomhet_actions";
import { isDialogmote } from "../utils/dialogmoterUtil";

export type Arbeidsgiver = {
  leder?: string;
  virksomhet?: string;
  orgnummer?: string;
};

export const useMoteArbeidsgiver = (
  mote: MoteDTO | DialogmoterDTO
): Arbeidsgiver | undefined => {
  const dispatch = useDispatch();

  const moteUuid = isDialogmote(mote) ? mote.uuid : mote.moteUuid;
  const arbeidsgiver = useMemo(
    () =>
      isDialogmote(mote)
        ? {
            virksomhet: mote.arbeidsgiver.virksomhetsnavn,
            orgnummer: mote.arbeidsgiver.virksomhetsnummer,
            navn: mote.arbeidsgiver.lederNavn,
          }
        : findDeltakerByType(mote, "ARBEIDSGIVER"),
    [mote]
  );

  useEffect(() => {
    if (!arbeidsgiver?.virksomhet && arbeidsgiver?.orgnummer) {
      dispatch(hentVirksomhet(arbeidsgiver.orgnummer, moteUuid));
    }
  }, [dispatch, arbeidsgiver, moteUuid]);

  return {
    leder: arbeidsgiver?.navn,
    virksomhet: arbeidsgiver?.virksomhet,
    orgnummer: arbeidsgiver?.orgnummer,
  };
};
