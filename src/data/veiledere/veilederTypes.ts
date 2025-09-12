export interface VeilederDTO {
  ident: string;
  fornavn: string;
  etternavn: string;
}

export class Veileder {
  ident: string;
  fornavn: string;
  etternavn: string;

  constructor(ident: string, fornavn: string, etternavn: string) {
    this.ident = ident;
    this.fornavn = fornavn;
    this.etternavn = etternavn;
  }

  fulltNavn(): string {
    return this.fornavn + " " + this.etternavn;
  }
}
