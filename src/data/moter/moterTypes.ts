import { VeilederDto } from "../veiledere/veilederTypes";

export interface MoteMedVeilederDTO extends MoteDTO {
  veileder?: VeilederDto;
}

export interface MoteDTO {
  id: number;
  moteUuid: string;
  opprettetAv: string;
  aktorId: string;
  status: string;
  fnr: string;
  opprettetTidspunkt: Date;
  bekreftetTidspunkt: Date;
  navEnhet: string;
  eier: string;
  deltakere: MoteDeltakerDTO[];
  alternativer: MoteTidOgStedDTO[];
  bekreftetAlternativ: MoteTidOgStedDTO;
  sistEndret: Date;
  trengerBehandling: boolean;
}

export interface MoteTidOgStedDTO {
  id: number;
  tid: Date;
  created: Date;
  sted: string;
  valgt: boolean;
}

export interface MoteDeltakerDTO {
  deltakerUuid: string;
  navn?: string;
  fnr?: string;
  virksomhet?: string;
  orgnummer: string;
  epost: string;
  type: string;
  svartidspunkt: Date;
  svar: MoteTidOgStedDTO[];
}
