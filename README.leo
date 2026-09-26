
---

### Como criar pacotes NPM
https://www.youtube.com/watch?v=Nh9xW2-ZOEU

## Desenvolvendo
- alterar src/index.ts
- logue no npm: `npm login`
- gerar um pacote com `npm run pack`
- instalar esse pacote gerado no projeto que deseja testar a nova versão da lib: `cd /caminho/projeto/; npm install /caminho/pacote.tgz`

## Publicando
- `npm run jsdoc2markdown`
- `npm run publish-prod-{patch|minor|major}` <- isso já faz tudo: bump version, build, publish