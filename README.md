# Syfomoteoversikt

Frontend for administrasjon av dialogmøter.

## TL;DR

React-app for administrasjon av dialogmøter for veileder.

## Kjøre lokalt

Du må ha Node v18 og npm v9 installert.

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

## Redis Cache

Bruker teamsykefravr sin felles Redis-cache på Aiven for å cache bruker-sessions.
