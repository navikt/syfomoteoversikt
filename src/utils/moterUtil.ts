import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { erResponsMottatt, getDialogmoteDato } from "./dialogmoterUtil";
import { MoteRespons } from "@/components/MoteResponsFilter";

export const getMoteRespons = (mote: DialogmoterDTO): MoteRespons => {
  return erResponsMottatt(mote)
    ? MoteRespons.MOTTATT
    : MoteRespons.IKKE_MOTTATT;
};

export const getMoteResponser = (moter: DialogmoterDTO[]): MoteRespons[] => [
  ...new Set(moter.map((mote) => getMoteRespons(mote))),
];

export const compareByMotedato =
  (): ((a: DialogmoterDTO, b: DialogmoterDTO) => number) =>
  (a: DialogmoterDTO, b: DialogmoterDTO) => {
    const moteDatoA = getDialogmoteDato(a) || 0;
    const moteDatoB = getDialogmoteDato(b) || 0;
    if (moteDatoA > moteDatoB) {
      return 1;
    }
    if (moteDatoA < moteDatoB) {
      return -1;
    }
    return 0;
  };
