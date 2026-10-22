# Syfomoteoversikt

Frontend for administrasjon av dialogmøter.

## TL;DR

React-app for administrasjon av dialogmøter for veileder.

## Kjøre lokalt

Node-versjonen styres av `.nvmrc`, og pnpm-versjonen er angitt i `package.json`.
Med [nvm](https://github.com/nvm-sh/nvm) installert:

```sh
nvm install
nvm use
```

Endre kun `.nvmrc` for å oppdatere Node lokalt, i GitHub Actions og i Docker.
Docker bruker samme hovedversjon som bygget. Etter at appen er bygget, kan
Docker-imaget bygges lokalt med den valgte Node-versjonen:

```sh
docker build --build-arg NODE_VERSION="$(node -p 'process.versions.node.split(".")[0]')" .
```

- For å kjøre koden lokalt:
  - `$ pnpm install`
  - `$ pnpm run start`
  - Eventuelt kan kommandoene kjøres fra `package.json` i Intellij.
- Kjør tester med `pnpm test`.

Appen finner du [her](http://localhost:8080/syfomoteoversikt)

Ved første kjøring:

```sh
$ cp .env.template .env # for å sette opp lokale miljøvariabler
$ pnpm install # installerer avhengigheter
```

## Valkey Cache

Bruker teamsykefravr sin felles Valkey-cache på Aiven for å cache bruker-sessions.
