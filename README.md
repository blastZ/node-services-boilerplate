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

## Todo

- Support serve static files
- Add validator middleware
- Add build process to create encrypted production files
- Add default nginx config file
- Support web socket
- Support redis
- Support mutiple databases
