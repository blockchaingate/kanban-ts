# kanban-ts

Kanban typescript implementation

## Install It
```
npm install
git submodule update --init --recursive
```

You need to have the fabcoin executables before you run Kanban. Please follow the instructions in [Fabcoin project repository](https://github.com/blockchaingate/fabcoin) to have a compiled version locally.

## Setup the configuration
```
APP_ID=kanban-ts
PORT=3000
LOG_LEVEL=debug
REQUEST_LIMIT=100kb
SESSION_SECRET=mySecret

FABCOIND_EXECUTABLE=/path/to/fabcoind
FABCOIN_CLI_EXECUTABLE=/path/to/fabcoin-cli
FAB_USER=user
FAB_PASSWORD=password
FAB_NET=TestNetNoDNS/MainNet/TestNet
FAB_RPC_PORT=23117/8667/18667

#Swagger
SWAGGER_API_SPEC=/spec
```

## Run It
#### Run in *development* mode:

```
npm run dev
```

#### Run in *production* mode:

```
npm run compile
npm start
```

### Try It
* Point you're browser to [http://localhost:3000](http://localhost:3000)
* Check the REST API endpoint [http://localhost:3000/api-explorer](http://localhost:3000/api-explorer/)
