FROM node:16-alpine3.15

RUN mkdir -p /home/node/attendanceandleavemanagement/node_modules && chown -R node:node /home/node/attendanceandleavemanagement

WORKDIR /home/node/attendanceandleavemanagement

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 80

RUN addgroup app && adduser -S -G node app
RUN mkdir node_modules/.cache
RUN chown node:node node_modules/.cache

USER app
CMD ["node", "index.js"]