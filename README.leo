
---

### Como criar pacotes NPM
https://www.youtube.com/watch?v=Nh9xW2-ZOEU

## Desenvolvendo
- alterar src/index.ts
- logue no npm: `npm login`
- gerar um pacote com `npm run pack`
- instalar esse pacote gerado no projeto que deseja testar a nova versão da lib: `cd /caminho/projeto/; npm install /caminho/pacote.tgz`
  - opcionalmente, pode-se utilizar `npm link` (aqui) e `npm install @lcrespilho/playwright-utils` (onde quiser testar). Para desfazer, o `npm unlink` não funciona; é necessário remover globalmente: `npm uninstall -g @lcrespilho/playwright-utils`

## Publicando
- `npm run publish-prod-{patch|minor|major}` <- isso já faz tudo: bump version, builda, documenta e publica no npm.