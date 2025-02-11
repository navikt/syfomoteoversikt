# Syfomoteoversikt

Frontend for administrasjon av dialogmøter.

## TL;DR

React-app for administrasjon av dialogmøter for veileder.

## Kjøre lokalt

Du må ha Node v22 og npm v10 installert.

- For å kjøre koden lokalt:
  - `$ npm install`
  - `$ npm run start`
  - Eventuelt kan kommandoene kjøres fra `package.json` i Intellij.
- Kjør tester med `npm test`.

Appen finner du [her](http://localhost:8080/syfomoteoversikt)

Ved første kjøring:

```sh
$ cp .env.template .env # for å sette opp lokale miljøvariabler
$ npm install # installerer avhengigheter
```

## Valkey Cache

Bruker teamsykefravr sin felles Valkey-cache på Aiven for å cache bruker-sessions.
