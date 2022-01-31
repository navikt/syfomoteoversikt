import { MoteDTO } from "@/data/moter/moterTypes";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { MoteDatoColumn } from "@/components/MoteTable";
import React from "react";
import { getMoteDato } from "@/utils/moterUtil";
import { getDatoFraZulu } from "@/utils/dateUtil";

interface MoteDatoProps {
  mote: MoteDTO | DialogmoterDTO;
}

const moteDato = (mote: MoteDTO | DialogmoterDTO): string => {
  const moteDato = getMoteDato(mote);
  return moteDato ? getDatoFraZulu(moteDato) : "Mangler dato";
};

export const MoteDato = ({ mote }: MoteDatoProps) => (
  <MoteDatoColumn>{moteDato(mote)}</MoteDatoColumn>
);
