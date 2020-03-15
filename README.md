# Node Services Boilerplate 🛠

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

# start watch mode
npm run dev

# console logs
pm2 logs
```

Use this terminal to check your service console informations.

## Features

## 1. Hide your production source code

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

- Add validator middleware
- Deep merge config files
- Add default nginx config file
- Support web socket
- Support mutiple databases
- Create cli to start custom project
