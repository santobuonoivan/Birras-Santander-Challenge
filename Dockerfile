FROM node:12.18.2

LABEL maintainer="Santobuono Iván Leonel <mecaluxivansantobuono@gmail.com>"
LABEL version="1.0.0"

ENV NODE_PORT 5001
ENV INSTALL_PATH /app

RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $NODE_PORT

CMD ["npm","run","dev"]