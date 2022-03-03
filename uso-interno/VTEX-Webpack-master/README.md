# Template para projetos Vtex

Template padrão para projetos front-end Vtex usando o webpack.


## Obtendo o Tema Default

Clone esse repositório e instale suas dependências:

```bash
git clone https://github.com/limhug/template-base.git
cd template-base
npm install
```

## Iniciando o Desenvolvimento

Dentro da pasta onde o *packages.json* encontra-se, execute o comando
```bash
npm start
```
Para iniciar o watcher/compiler dos resources.
Enquanto ele estiver ativo, toda vez que você salvar algum arquivo .js ou .scss dentro da pasta /public ele automaticamente irá re-compilar o código.

## Compilando para produção

Dentro da pasta onde o *packages.json* encontra-se, execute o comando
```bash
npm run prod
```
Seu código dentro da pasta plublic irá ser compilado para produção com minificação e uglifyJS.
