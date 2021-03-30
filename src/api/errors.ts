export class Error403 extends Error {
  private readonly status: number;
  private readonly tilgang: {
    harTilgang: boolean;
    begrunnelse: string;
  };

  constructor(message: string, harTilgang: boolean, begrunnelse: string) {
    super(message);
    this.status = 403;
    this.tilgang = {
      harTilgang,
      begrunnelse,
    };
  }
}
