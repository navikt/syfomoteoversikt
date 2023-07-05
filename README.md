# Syfomoteoversikt

Frontend for administrasjon av dialogmøter.

## TL;DR

React-app for administrasjon av dialogmøter for veileder.

## Kjøre lokalt

Du må ha Node v18 og npm v9 installert.

- For å kjøre koden lokalt:
  - `$ npm install --legacy-peer-deps`
  - `$ npm run start`
  - Eventuelt kan kommandoene kjøres fra `package.json` i Intellij.
- Kjør tester med `npm test`.

Appen finner du [her](http://localhost:8080/syfomoteoversikt)

Ved første kjøring:

```sh
$ cp .env.template .env # for å sette opp lokale miljøvariabler
$ npm install --legacy-peer-deps # installerer avhengigheter
```

## Redis Cache

Brukes for å cache bruker-sessions. Nais-oppsettet ligger i `.nais/redis.yaml`.
Redis pod deployes automatisk ved endringer i workflow eller config i master,
men kan også deployes manuelt til NAIS ved å kjøre følgdende kommando: `kubectl apply -f .nais/redis.yaml`.
