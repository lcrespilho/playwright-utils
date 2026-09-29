## Functions

<dl>
<dt><a href="#enableGADebug">enableGADebug()</a></dt>
<dd><p>Simula a extensão Google Analytics Debugger (<a href="https://chrome.google.com/webstore/detail/jnkmfdileelhofjcijamephohjechhna">https://chrome.google.com/webstore/detail/jnkmfdileelhofjcijamephohjechhna</a>),
habilitando debug GA4 (gtag).</p>
</dd>
<dt><a href="#flatRequestUrl">flatRequestUrl()</a></dt>
<dd><p>Returns a flattened request URL by combining the URL and postData parameters of the given Request-like object.</p>
</dd>
<dt><a href="#flatResponseUrl">flatResponseUrl()</a></dt>
<dd><p>Returns a flattened request URL from Response object, by combining the URL and postData
parameters of the given Response&#39;s Request object.</p>
</dd>
<dt><a href="#scrollToBottom">scrollToBottom()</a></dt>
<dd><p>Realiza scroll até o fundo da página, suavemente.</p>
</dd>
<dt><a href="#highlightLocator">highlightLocator()</a></dt>
<dd><p>Highlights a locator on the page.</p>
</dd>
<dt><a href="#previewGTM">previewGTM()</a></dt>
<dd><p>Executa uma versão específica do GTM, sem abrir o Tag Assistant.
Deve ser utilizada em <code>test.beforeEach</code> ou <code>test</code>.</p>
</dd>
<dt><a href="#requestMatcher">requestMatcher()</a></dt>
<dd><p>Cria um predicado que verifica se a URL achatada da requisição corresponde ao padrão.</p>
</dd>
<dt><a href="#responseMatcher">responseMatcher()</a></dt>
<dd><p>Cria um predicado que verifica se a URL achatada da resposta corresponde ao padrão.</p>
</dd>
<dt><a href="#requestMatcherCb">requestMatcherCb()</a></dt>
<dd><p>Cria um predicado que, ao encontrar uma requisição correspondente, executa o callback
e retorna <code>true</code>. Erros lançados pelo callback são ignorados.</p>
</dd>
<dt><a href="#responseMatcherCb">responseMatcherCb()</a></dt>
<dd><p>Cria um predicado que, ao encontrar uma resposta correspondente, executa o callback
e retorna <code>true</code>. Erros lançados pelo callback são ignorados.</p>
</dd>
</dl>

<a name="enableGADebug"></a>

## enableGADebug()
Simula a extensão Google Analytics Debugger (https://chrome.google.com/webstore/detail/jnkmfdileelhofjcijamephohjechhna),
habilitando debug GA4 (gtag).

**Kind**: global function  
<a name="flatRequestUrl"></a>

## flatRequestUrl()
Returns a flattened request URL by combining the URL and postData parameters of the given Request-like object.

**Kind**: global function  
<a name="flatResponseUrl"></a>

## flatResponseUrl()
Returns a flattened request URL from Response object, by combining the URL and postData
parameters of the given Response's Request object.

**Kind**: global function  
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
<a name="previewGTM"></a>

## previewGTM()
Executa uma versão específica do GTM, sem abrir o Tag Assistant.
Deve ser utilizada em `test.beforeEach` ou `test`.

**Kind**: global function  
**Example**  
```typescript
test.beforeEach(async ({ context }) => {
  await previewGTM(context, 'https://tagassistant.google.com/?authuser=8&hl=en&utm_source=gtm#/?source=TAG_MANAGER&id=GTM-123123&gtm_auth=cDqGMWuJkUq73urprdYOAw&gtm_preview=env-869&cb=8635696129626987');
});
```
<a name="requestMatcher"></a>

## requestMatcher()
Cria um predicado que verifica se a URL achatada da requisição corresponde ao padrão.

**Kind**: global function  
**Example**  
```ts
const request = await page.waitForRequest(requestMatcher('/api/users'))
```
<a name="responseMatcher"></a>

## responseMatcher()
Cria um predicado que verifica se a URL achatada da resposta corresponde ao padrão.

**Kind**: global function  
**Example**  
```ts
const response = await page.waitForResponse(responseMatcher('/api/users'))
```
<a name="requestMatcherCb"></a>

## requestMatcherCb()
Cria um predicado que, ao encontrar uma requisição correspondente, executa o callback
e retorna `true`. Erros lançados pelo callback são ignorados.

**Kind**: global function  
**Example**  
```ts
await page.waitForRequest(
  requestMatcherCb('/api/users', req => console.log(req.method()))
)
```
<a name="responseMatcherCb"></a>

## responseMatcherCb()
Cria um predicado que, ao encontrar uma resposta correspondente, executa o callback
e retorna `true`. Erros lançados pelo callback são ignorados.

**Kind**: global function  
**Example**  
```ts
await page.waitForResponse(
  responseMatcherCb('/api/users', res => console.log(res.status()))
)
```

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