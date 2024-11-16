FROM node:22.9.0 as build

WORKDIR /user/app

COPY . .

RUN npm install


FROM node:22.9.0-alpine

WORKDIR /user/app

COPY --from=build /user/app /user/app

EXPOSE $PORT

CMD ["npm", "run", "start:dev:migrate"]