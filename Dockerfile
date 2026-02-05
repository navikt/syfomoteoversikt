FROM node:22-alpine AS builder
WORKDIR /syfomoteoversikt

COPY server.ts package.json tsconfig.json ./
COPY server ./server
COPY node_modules ./node_modules
COPY img ./img
COPY dist ./dist

RUN npm install -g typescript
RUN tsc --build

FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim
WORKDIR /syfomoteoversikt

COPY --from=builder /syfomoteoversikt/package.json ./
COPY --from=builder /syfomoteoversikt/dist/server.js ./
COPY --from=builder /syfomoteoversikt/dist/server.js.map ./
COPY --from=builder /syfomoteoversikt/dist/server ./server
COPY --from=builder /syfomoteoversikt/dist/index.html ./dist/index.html
COPY --from=builder /syfomoteoversikt/dist/main.bundle.js ./dist/main.bundle.js
COPY --from=builder /syfomoteoversikt/node_modules ./node_modules
COPY --from=builder /syfomoteoversikt/img ./img

EXPOSE 8080
USER nonroot
CMD ["./server.js"]
