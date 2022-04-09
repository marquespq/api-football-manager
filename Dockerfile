# FROM node:14.15-alpine

# WORKDIR /usr/app

# COPY package*.json yarn*.json ./

# RUN npm install --production --silent

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]

FROM node:14.18-alpine as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./
RUN yarn
COPY . /usr/app/
RUN yarn tsc
COPY ./src/config/swaggerComponents.yml ./dist/src/config

FROM node:14.18-alpine as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/yarn.lock ./
COPY --from=ts-compiler /usr/app/dist ./
# COPY --from=ts-compiler /usr/app/uploads ./
RUN yarn --production

FROM node:14.18-alpine
WORKDIR /usr/app
COPY --from=ts-remover  /usr/app ./
# USER node
CMD ["yarn", "start"]
