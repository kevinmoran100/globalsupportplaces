FROM node:12-alpine
#RUN apt-get -q update && apt-get -qy install netcat
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN chown -R node:node /usr/local/lib/node_modules
WORKDIR /home/node/app
COPY package*.json tsconfig.json ./
USER node
RUN npm uninstall typescript
RUN npm install typescript
RUN npm install
COPY --chown=node:node . .
RUN mkdir /home/node/app/uploads
EXPOSE 8080
RUN npm run build
CMD [ "node", "dist/index.js" ]