import React from "react";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { MoteDatoColumn } from "@/components/MoteTable";
import { getDatoFraZulu } from "@/utils/dateUtil";
import { getDialogmoteDato } from "@/utils/dialogmoterUtil";

interface MoteDatoProps {
  mote: DialogmoterDTO;
}

const moteDato = (mote: DialogmoterDTO): string => {
  const moteDato = getDialogmoteDato(mote);
  return moteDato ? getDatoFraZulu(moteDato) : "Mangler dato";
};

export const MoteDato = ({ mote }: MoteDatoProps) => (
  <MoteDatoColumn>{moteDato(mote)}</MoteDatoColumn>
);
