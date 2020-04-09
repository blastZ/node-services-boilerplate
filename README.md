# Node Services Boilerplate [![blastZ](https://circleci.com/gh/blastZ/node-services-boilerplate.svg?style=svg)](https://circleci.com/gh/blastZ/node-services-boilerplate)

🛠 The best pratice of build node services with [nico](https://github.com/blastZ/nico).

## How to start

### 1. Install dependencies

```bash
npm install
```

### 2. Compile typescript code

```bash
npm run tsc
```

### 3. Open typescript watch mode

Open one termial to start typescript watch mode

```bash
npm run tsc-watch
```

Use this terminal to check the code compile informations.

### 4. Start service

Open a new terminal to run app

```bash
# install pm2 global, if you haven't
npm install -g pm2

# start development mode
npm run dev

# reload your dev config
npm run reload

# stop develop and clear process
npm run clear
```

Use this terminal to check your service console informations.

## Features

## 1. Easy to build routes

Set routes in `config/routes.ts` file, the basic usage like:

```ts
{
  'POST /user': {
    controller: require(`../api/controllers/user/create`),
    bodyParser: true,
    policies: true,
    validate: {
      body: Joi.object({
        name: Joi.string()
          .trim()
          .required()
          .min(4)
          .max(16),
        password: Joi.string()
          .trim()
          .required()
          .min(8)
          .max(16)
      })
    }
  }
}
```

use `controller` to specific action method, `bodyParser` to set up parse middleware, `policies` to set up authorization and access control middlewares, `validate` use Joi to validate `body`, `params` and `query` conveniently.

check more configs in `typings/app.d.ts`.

## 2. Hide your production source code

About one year ago, I asked this question [How to protect my node.js source code](https://stackoverflow.com/questions/51944164/how-to-protect-my-node-js-source-code), And I haven't got a wonderful answer.

So in this boilerplate, I give my own solution.

In this project, I haven't use any async import, because I use [ncc](https://github.com/zeit/ncc) to bundle all files into single main file. Then use [bytenode](https://github.com/OsamaAbbas/bytenode) to compile the main file to v8 cached file, use below command to create compiled files:

```bash
npm run build
```

Generated files will be placed in `build/dist`, the result file structure will like:

- lib
- app.js
- config.js
- ecosystem.config.js
- index.robot

Some benifis of this solution:

1. Keep config file
2. Keep app entry, only compile main code.
3. It's still normal node project, can be handle by process manager like pm2.

## Todo

- Support websocket
- Support auto api document generate
- Create new branch add server-side render boilerplate with next.js
- Add default csrf config
- Add test example
- Support mutiple databases
- Create cli to start custom project
