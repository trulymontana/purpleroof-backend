First create a new firebase project from the console

then create a new web app from the project

then copy the config from the firebase project and paste it in the .env file

then install the firebase admin sdk

```bash
npm install firebase-admin
```

then create a new file called firebase-admin.ts in the src folder and paste the following code in it

```ts
import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth();
```

then create a new file called serviceAccountKey.json in the src folder and paste the following code in it

```json
{
  "type": "service_account",
  "project_id": "nestjs-firebase-auth",
  "private_key_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

then create a new file called auth.guard.ts in the src folder and paste the following code in it

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { auth } from './firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    try {
      const user = await auth.verifyIdToken(token);

      request.user = user;

      return true;
    } catch (error) {
      return false;
    }
  }
}
```

then create a new file called auth.module.ts in the src folder and paste the following code in it

```ts
import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
```

then create a new file called auth.service.ts in the src folder and paste the following code in it

```ts
import { Injectable } from '@nestjs/common';
import { auth } from './firebase-admin';

@Injectable()
export class AuthService {
  async getUser(uid: string) {
    const user = await auth.getUser(uid);

    return user;
  }
}
```

then create a new file called auth.controller.ts in the src folder and paste the following code in it

```ts
import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUser() {
    const user = await this.authService.getUser('xxxxxxxxxxxxxxxxxxxx');

    return user;
  }
}
```

then create a new file called app.module.ts in the src folder and paste the following code in it

```ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
```

then create a new file called main.ts in the src folder and paste the following code in it

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}

bootstrap();
```

then run the following command to start the server

```bash

npm run start:dev
```

then open the browser and go to the following url

```bash

http://localhost:3000/auth
```

then it will return the user data

```json
{
  "uid": "xxxxxxxxxxxxxxxxxxxx",
  "email": "xxxxxxxxxxxxxxxxxxxx",
  "emailVerified": false,
  "displayName": "xxxxxxxxxxxxxxxxxxxx",
  "photoURL": "xxxxxxxxxxxxxxxxxxxx",
  "phoneNumber": null,
  "disabled": false,
  "metadata": {
    "lastSignInTime": "xxxxxxxxxxxxxxxxxxxx",
    "creationTime": "xxxxxxxxxxxxxxxxxxxx"
  },
  "providerData": [
    {
      "uid": "xxxxxxxxxxxxxxxxxxxx",
      "email": "xxxxxxxxxxxxxxxxxxxx",
      "displayName": "xxxxxxxxxxxxxxxxxxxx",
      "photoURL": "xxxxxxxxxxxxxxxxxxxx",
      "providerId": "xxxxxxxxxxxxxxxxxxxx"
    }
  ],
  "passwordHash": "xxxxxxxxxxxxxxxxxxxx",
  "passwordSalt": "xxxxxxxxxxxxxxxxxxxx",
  "tokensValidAfterTime": "xxxxxxxxxxxxxxxxxxxx",
  "tenantId": null,
  "providerId": "xxxxxxxxxxxxxxxxxxxx"
}
```

## Sign up a user with email and password in firebase auth and nestjs

first install the firebase auth

```bash
npm install firebase
```

then create a new file called firebase-auth.ts in the src folder and paste the following code in it
