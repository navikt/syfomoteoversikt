import React, { ReactElement } from "react";
import Alertstripe from "nav-frontend-alertstriper";
import Moteoversikt from "./Moteoversikt";
import { dagensDatoKortFormat } from "@/utils/dateUtil";
import { Element } from "nav-frontend-typografi";
import { useAktivVeileder } from "@/data/veiledere/veilederQueryHooks";
import { useMineDialogmoterQuery } from "@/data/dialogmoter/dialogmoterQueryHooks";
import {
  useEnhetensMoterQuery,
  useVeiledersMoterQuery,
} from "@/data/moter/moterQueryHooks";
import { useMoteoverforing } from "@/context/moteoverforing/MoteoverforingContext";

const tallOrdFraTall = (tall: number): string | number => {
  const tallOrdliste: string[] = [
    "null",
    "ett",
    "to",
    "tre",
    "fire",
    "fem",
    "seks",
    "syv",
    "åtte",
    "ni",
    "t1",
    "elleve",
    "tolv",
  ];

  const tallOrd = tallOrdliste[tall];
  return tallOrd ? tallOrd : tall;
};

const hentTallordTekst = (tall: number) => {
  const tallord = tallOrdFraTall(tall);
  return tall === 1 ? `${tallord} nytt møte` : `${tallord} nye møter`;
};

const Moter = (): ReactElement => {
  useEnhetensMoterQuery();
  const aktivVeilederIdent = useAktivVeileder().data?.ident;
  const { antallOverfort } = useMoteoverforing();
  const dialogmoterQuery = useMineDialogmoterQuery();
  const moterQuery = useVeiledersMoterQuery();
  const harVeilederMoter = moterQuery.isSuccess && moterQuery.data.length > 0;
  const harVeilederDialogmoter = dialogmoterQuery.data?.some(
    ({ tildeltVeilederIdent }) => tildeltVeilederIdent === aktivVeilederIdent
  );
  const harMoter = harVeilederMoter || harVeilederDialogmoter;

  return (
    <div>
      {antallOverfort && (
        <Alertstripe className="blokk" type="suksess">
          <Element>{`Du har lagt til ${hentTallordTekst(
            antallOverfort
          )}`}</Element>
          <label>{`Dato: ${dagensDatoKortFormat()}`}</label>
        </Alertstripe>
      )}
      {harMoter && <Moteoversikt />}
    </div>
  );
};

export default Moter;
