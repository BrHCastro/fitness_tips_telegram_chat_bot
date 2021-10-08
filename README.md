![LICENSE](https://img.shields.io/github/license/brhcastro/setup-nodejs-ts-eslint-jest-babel?style=flat-square)
![TS](https://img.shields.io/github/package-json/dependency-version/brhcastro/setup-nodejs-ts-eslint-jest-babel/dev/typescript/master?style=flat-square )
![jest](https://img.shields.io/github/package-json/dependency-version/brhcastro/setup-nodejs-ts-eslint-jest-babel/dev/jest/master?style=flat-square)
![ESlint](https://img.shields.io/github/package-json/dependency-version/brhcastro/setup-nodejs-ts-eslint-jest-babel/dev/eslint/master?style=flat-square)
![express](https://img.shields.io/github/package-json/dependency-version/brhcastro/setup-nodejs-ts-eslint-jest-babel/express?style=flat-square)


# SETUP NODEJS TS ESLINT JEST BABEL 🔨



## 🔰 INICIANDO...

```
    git init

    yarn init -y

    yarn tsc --init
```

### 📄 Documentos criados...
- package.json
- tsconfig.json

## ✔ ADICIONANDO DEP TS-NODE-DEV:
> Compila TS automaticamente durante o desenvolvimento (muito + produtivo 🔥🔥)
```
    yarn add ts-node-dev -D
```
### ✔ Adicionando no package.json...
```json
    //package.json

    "scripts": {
        "dev": "ts-node-dev src/server.ts"
    },
```
> Para melhorar ainda mais, adicionarei algumas flags 
>* respawn: restartar/não deixar nenhum processo vivo
>* transpile-only: não procurar erros na tipagem do código, executar direto.
>* ignore-watch: passei a pasta node_modules, assim não sera observado alterações nesta pasta.

```json
    //package.json

    "scripts": {
        "dev": "ts-node-dev --respawn --transpile-only --ignore-watch node-modules src/server.ts"
    },
```

## ⚙ CONFIGURAÇÃO DO TSCONFIG.JSON:
```json
    //tsconfig.json

    {
        "compilerOptions": {
            "target": "es2017",
            "module": "commonjs",
            "lib": ["es6"],
            "allowJs": true,
            "outDir": "./dist",
            "rootDir": "./src",
            "removeComments": true,
            "typeRoots": [
            "./node_modules/@types",
            "./src/@types"
            ],
            "esModuleInterop": true,
            "resolveJsonModule": true,
            "experimentalDecorators": true,
            "emitDecoratorMetadata": true,
            "skipLibCheck": true,
            "forceConsistentCasingInFileNames": true
        }
    }
```
## ⚙ CONFIGURANDO OS PATHS:
> Basicamente atalhos dos caminhos para chegar em nossas pastas. Integra muito bem com o auto import.

```json
    //tsconfig.json

    "baseUrl": ".",
    "paths": {
      "@controllers/*": ["./src/controllers/*"],
      "@models/*": ["./src/models/*"]
    }
```
> Para que o ts-node-dev entenda essa configuração dos paths é necessário a seguinte dependencia.
```
    yarn add tsconfig-paths -D
```
> Adicionar mais a flag -r tsconfig-paths/register 💪
```json
    //package.json

    "scripts": {
        "dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpile-only --ignore-watch node-modules src/server.ts"
    }
```

## ✔ INSTALANDO ESLINT: 
```
    yarn add eslint -D
    -------------------------------
    yarn eslint --init
    ------------------------------

    ✔ How would you like to use ESLint? · style     
    ✔ What type of modules does your project use? · esm
    ✔ Which framework does your project use? · none
    ✔ Does your project use TypeScript? · No / Yes
    ✔ Where does your code run? · node
    ✔ How would you like to define a style for your project? · guide
    ✔ Which style guide do you want to follow? · standard
    ✔ What format do you want your config file to be in? · JSON
```
> ***É necessário ter a extensão do ESlint no vscode e, talves, seja necessário instalar essa dependência > @typescript-eslint/parser -D*** 👍

## ✔ INSTALANDO JEST:

```
    yarn add jest -D
    ------------------------------------------
    yarn jest --init
    ------------------------------------------

    ✔ Would you like to use Jest when running "test" script in "package.json"? … yes
    ✔ Would you like to use Typescript for the configuration file? … no
    ✔ Choose the test environment that will be used for testing › node
    ✔ Do you want Jest to add coverage reports? … no
    ✔ Which provider should be used to instrument code for coverage? › babel
    ✔ Automatically clear mock calls and instances between every test? … yes
    
    ------------------------------------------
    yarn add ts-jest -D
    ------------------------------------------
    yarn add @types/jest -D
    ------------------------------------------

```
### ⚙ CONFIGURANDO O JEST:
```js
    //jest.config.js
    const { compilerOptions } = require('./tsconfig.json')
    const { pathsToModeleNameMapper } = require('ts-jest')
    
    ...

    moduleNameMapper: pathsToModeleNameMapper(compilerOptions.paths, { prefix: '<rootDIr>' }),
    
    ...

    preset: "ts-jest"
```
### ⚙ CONFIGURANDO O ESLINT:
```json
//.eslintrc.json

    "env": {
        "es2021": true,
        "node": true,
        "jest": true
    }
```
```json
//.tsconfig.json
    ...

    "include": [
    "src/**/*"
  ]
```

## ✔ INSTALAÇÃO BABEL:

```
    yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver
```
### ⚙ CONFIGURANDO O BABEL:
```js
    //babel.config.js

    module.exports = {
        presets: [
            [
            '@babel/preset-env',
            {
                targets: {
                node: 'current'
                }
            }
            ],
            '@babel/preset-typescript'
        ],
        plugins: [
            ['module-resolver', {
            alias: {
                '@models': './src/models',
                '@controllers': './src/controllers'
            }
            }]
        ],
        ignore: [
            '**/*.spec.ts'
        ]
    }
```
### ✔ CRIANDO O SCRIPT DE BUILD 😎👍
```json
    "scripts": {
        "build": "babel src --extensions \".js,.ts\" --out-dir dist --copy-files --no-copy-ignored",
    }
```

## Autor:
Henrique de Castro

## Licença:
Projeto está sob licença do [MIT](https://opensource.org/licenses/mit-license.php)
