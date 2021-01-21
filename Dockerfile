FROM node:14-alpine
WORKDIR /syfomoteoversikt

COPY .env server.js package.json ./

COPY node_modules ./node_modules
COPY img ./img
COPY dist ./dist

EXPOSE 8080
CMD ["node", "server.js"]
