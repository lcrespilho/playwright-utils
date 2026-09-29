## Functions

<dl>
<dt><a href="#scrollToBottom">scrollToBottom()</a></dt>
<dd><p>Realiza scroll até o fundo da página, suavemente.</p>
</dd>
<dt><a href="#highlightLocator">highlightLocator()</a></dt>
<dd><p>Highlights a locator on the page.</p>
</dd>
</dl>

<a name="scrollToBottom"></a>

## scrollToBottom()
Realiza scroll até o fundo da página, suavemente.

**Kind**: global function  
<a name="highlightLocator"></a>

## highlightLocator()
Highlights a locator on the page.

**Kind**: global function  
**Example**  
```typescript
const locator = page.getByRole('button', { name: 'Click Me' })
await highlightLocator(locator)
```

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