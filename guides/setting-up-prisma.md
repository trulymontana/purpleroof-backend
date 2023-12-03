# Setting up Prisma with existing db

first install the prisma as dev dependency

```bash
npm install prisma --save-dev
```

then run the following command to setup the prisma

```bash
npx prisma init
```

then it will ask you to select the database you are using, select the database you are using and then it will ask you to enter the database url, enter the database url and then it will ask you to select the schema, select the schema and then it will create the prisma folder with the schema.prisma file in it.

then run the following command to generate the prisma client

```bash
npx prisma generate
```

then it will generate the prisma client in the node_modules folder.

then run the following command to create the migration

```bash
npx prisma migrate dev --name init
```

then it will create the migration in the migrations folder.

then run the following command to apply the migration

```bash
npx prisma migrate deploy
```

then it will apply the migration to the database.

then run the following command to seed the data

```bash
npx prisma db seed --preview-feature
```

then it will seed the data to the database.

then run the following command to open the prisma studio

```bash
npx prisma studio
```

then it will open the prisma studio in the browser. Open the browser and go to the following url to open the prisma studio.

```bash
http://localhost:5555
```
