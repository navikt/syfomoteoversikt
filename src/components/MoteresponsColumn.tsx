import React, { ReactElement } from "react";
import { ResponsColumn } from "@/components/MoteTable";
import { DialogmoterDTO, SvarType } from "@/data/dialogmoter/dialogmoterTypes";
import { BodyShort, Tag } from "@navikt/ds-react";
import {
  DeltakerRespons,
  getArbeidsgiverRespons,
  getArbeidstakerRespons,
  getBehandlerRespons,
} from "@/utils/dialogmoterUtil";

function ResponsTag({
  respons,
  deltaker,
}: {
  respons: DeltakerRespons;
  deltaker: string;
}): ReactElement {
  if (respons.svar === SvarType.KOMMER) {
    return (
      <Tag variant="success" size="xsmall">
        Kommer
      </Tag>
    );
  } else if (respons.svar === SvarType.KOMMER_IKKE) {
    return (
      <Tag variant="error" size="xsmall">
        Kommer ikke
      </Tag>
    );
  } else if (respons.svar === SvarType.NYTT_TID_STED) {
    return (
      <Tag variant="warning" size="xsmall">
        Endring ønskes
      </Tag>
    );
  } else if (respons.harLest) {
    return (
      <Tag variant="info" size="xsmall">
        Har åpnet
      </Tag>
    );
  } else if (deltaker === "Behandler" && !respons.harLest && !respons.svar) {
    return (
      <Tag variant="alt2" size="xsmall">
        Ikke svart
      </Tag>
    );
  } else {
    return (
      <Tag variant="alt2" size="xsmall">
        Ikke åpnet
      </Tag>
    );
  }
}

function ResponseEntry({
  deltaker,
  respons,
}: {
  deltaker: string;
  respons: DeltakerRespons;
}): ReactElement {
  return (
    <div className="flex flex-row">
      <BodyShort size="small" className="w-24">
        {deltaker}:
      </BodyShort>
      <ResponsTag respons={respons} deltaker={deltaker} />
    </div>
  );
}

interface Props {
  dialogmote: DialogmoterDTO;
}

export default function MoteresponsColumn({ dialogmote }: Props): ReactElement {
  const arbeidstakerRespons = getArbeidstakerRespons(dialogmote);
  const arbeidsgiverRespons = getArbeidsgiverRespons(dialogmote);
  const behandlerSvar = getBehandlerRespons(dialogmote);

  return (
    <ResponsColumn>
      <ResponseEntry deltaker={"Arbeidstaker"} respons={arbeidstakerRespons} />
      <ResponseEntry deltaker={"Arbeidsgiver"} respons={arbeidsgiverRespons} />
      {dialogmote.behandler && (
        <ResponseEntry
          deltaker={"Behandler"}
          respons={{
            harLest: false,
            svar: behandlerSvar ? behandlerSvar : undefined,
          }}
        />
      )}
    </ResponsColumn>
  );
}
