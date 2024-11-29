FROM node:22.11.0 AS build

WORKDIR /user/app

COPY . .

RUN npm install


FROM node:22.11.0-alpine3.19

WORKDIR /user/app

COPY --from=build /user/app /user/app

EXPOSE $PORT

CMD ["sh", "-c", "npm run migrate && npm run start:dev"]