FROM node:buster as development

RUN npm install -g @nestjs/cli@10.0.0
RUN chmod +x entrypoint.sh

USER node

WORKDIR /home/node/app