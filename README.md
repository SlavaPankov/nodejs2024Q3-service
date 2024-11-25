# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/SlavaPankov/nodejs2024Q3-service
```

## Installing NPM modules

```
npm install
```

Create <kbd>.env</kbd> file in root folder, use <kbd>.env.example</kbd>

## Create and running docker container

After executing the command, two images will be downloaded from Docker Hub, allowing you to run this application in Docker containers. This setup ensures that both the application and its required database are containerized, providing a consistent and isolated environment for your project.

---

If you want to run this project locally, follow the steps below. It's important to note that you should change the **_HOST_** value in your <kbd>.env</kbd> file to **_localhost_** to indicate that the **_database_** will be running **_locally_**.

###### 1. Start the Database:

Open your terminal and run the following command to start up the database using Docker:

```bash
docker-compose up -d db
```

###### 2. Deploy Prisma Migrations:

Once the database is up and running, you need to deploy your Prisma migrations to set up the database schema. Execute the following command in your terminal:

```bash
npx prisma migrate deploy
```

###### 3. Generate Prisma Client:

After deploying migrations, generate the Prisma client to interact with your database from your application code. Run:

```bash
npx prisma generate
```

###### 4. Start the Project:

Finally, to start your project, use the command:

```bash
npm start:dev
```

This command launches your application in development mode, typically with hot reloading enabled.

After create and starting the app on port (**4000** as default) you can open
in your browser OpenAPI documentation by typing

> http://localhost:4000/doc/

Also, we can work with **postgresql** in manual mode through Prisma studio

```bash
npm docker:studio
```

And open a graphical user interface (GUI) in your browser to work with databases easily

> http://localhost:5555

## Testing

After application running open new terminal and enter:

```bash
npm run test
```

```bash
npm run test:auth
```

```bash
npm run test:refresh
```

### To view logs within your Docker app container, navigate to the following directory:

> ***.user/app/loggerHistory***

>This directory contains the log history for your application, providing insights into its runtime behavior and any errors or warnings that have occurred. 

Additionally, to facilitate log persistence and easy access, volumes for logging have been configured in the docker-compose.yml file. This setup ensures that logs are stored outside the container, allowing for easier retrieval and analysis without needing to access the container's filesystem directly.

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
