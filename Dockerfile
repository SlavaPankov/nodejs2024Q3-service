FROM node:20.11.1 AS build

WORKDIR /user/app

COPY . .

RUN npm install


FROM node:20.11.1-alpine

WORKDIR /user/app

COPY --from=build /user/app /user/app

EXPOSE $PORT

CMD ["npm", "run", "start:dev:migrate"]