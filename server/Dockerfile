FROM node:16

WORKDIR /opt/app
COPY package.json /opt/app/
COPY package-lock.json /opt/app/

RUN npm install

COPY tsconfig.json /opt/app/
COPY tsoa.json /opt/app/
COPY config.ts /opt/app/
COPY prisma /opt/app/prisma
COPY src /opt/app/src
COPY migrate.production.sh /opt/app/
RUN npm run build

ARG PORT=8000
ENV PORT=$PORT

CMD ["node", "build/src/server.js"]