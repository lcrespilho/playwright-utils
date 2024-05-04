## Functions

<dl>
<dt><a href="#flatRequestUrl">flatRequestUrl(req)</a> ⇒ <code>*</code></dt>
<dd><p>Returns a flattened request URL by combining the URL and postData parameters
of the given Request object.</p>
</dd>
<dt><a href="#requestMatcher">requestMatcher(pattern)</a></dt>
<dd><p>Accepts a pattern, and returns a function that returns true if a
request is matched by the pattern.</p>
</dd>
<dt><a href="#responseMatcher">responseMatcher(pattern)</a></dt>
<dd><p>Accepts a pattern, and returns a function that returns true if a
response is matched by the pattern.</p>
</dd>
<dt><a href="#requestMatcherCb">requestMatcherCb(pattern, cb)</a></dt>
<dd><p>Accepts a pattern and a callback function, and returns a function that
returns true if a request is matched by the pattern, and executes the
callback with the request object as parameter.</p>
</dd>
<dt><a href="#responseMatcherCb">responseMatcherCb(pattern, cb)</a></dt>
<dd><p>Accepts a pattern and a callback function, and returns a function that
returns true if a response is matched by the pattern, and executes the
callback with the response object as parameter.</p>
</dd>
<dt><a href="#saveSessionCookies">saveSessionCookies(context, key, [expires])</a></dt>
<dd><p>Salva os cookies do contexto no Glitch.</p>
</dd>
<dt><a href="#restoreSessionCookies">restoreSessionCookies(context, key)</a></dt>
<dd><p>Restaura, no contexto do browser, os cookies previamente salvos no Glitch.</p>
</dd>
<dt><a href="#previewGTM">previewGTM(context, tagAssistantUrl)</a></dt>
<dd><p>Realiza preview do GTM. Deve ser utilizada via <code>test.beforeEach</code> ou no próprio <code>test</code>.</p>
</dd>
<dt><a href="#enableGADebug">enableGADebug()</a></dt>
<dd><p>Simula a extensão Google Analytics Debugger (<a href="https://chrome.google.com/webstore/detail/jnkmfdileelhofjcijamephohjechhna">https://chrome.google.com/webstore/detail/jnkmfdileelhofjcijamephohjechhna</a>),
habilitando debug de GA3 (analytics.js) e GA4 (gtag).</p>
</dd>
<dt><a href="#scrollToBottom">scrollToBottom()</a></dt>
<dd><p>Realiza scroll até o fundo da página, suavemente.</p>
</dd>
</dl>

<a name="flatRequestUrl"></a>

## flatRequestUrl(req) ⇒ <code>\*</code>
Returns a flattened request URL by combining the URL and postData parameters
of the given Request object.

**Kind**: global function  
**Returns**: <code>\*</code> - {string} A string representing the flattened request URL.  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Request</code> | The Request object containing the URL and postData. |

<a name="requestMatcher"></a>

## requestMatcher(pattern)
Accepts a pattern, and returns a function that returns true if a
request is matched by the pattern.

**Kind**: global function  

| Param | Description |
| --- | --- |
| pattern | pattern to match the request URL. |

<a name="responseMatcher"></a>

## responseMatcher(pattern)
Accepts a pattern, and returns a function that returns true if a
response is matched by the pattern.

**Kind**: global function  

| Param | Description |
| --- | --- |
| pattern | pattern to match the response URL. |

<a name="requestMatcherCb"></a>

## requestMatcherCb(pattern, cb)
Accepts a pattern and a callback function, and returns a function that
returns true if a request is matched by the pattern, and executes the
callback with the request object as parameter.

**Kind**: global function  

| Param | Description |
| --- | --- |
| pattern | pattern to match the request URL. |
| cb | Callback function that will be executed after if the request is matched. |

<a name="responseMatcherCb"></a>

## responseMatcherCb(pattern, cb)
Accepts a pattern and a callback function, and returns a function that
returns true if a response is matched by the pattern, and executes the
callback with the response object as parameter.

**Kind**: global function  

| Param | Description |
| --- | --- |
| pattern | Pattern to match the request URL. |
| cb | Callback function that will be executed after if the request is matched. |

<a name="saveSessionCookies"></a>

## saveSessionCookies(context, key, [expires])
Salva os cookies do contexto no Glitch.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>BrowserContext</code> | Contexto do browser. |
| key | <code>string</code> | Nome da sessão no Glitch, usado para resgatar a sessão. |
| [expires] | <code>number</code> | tempo em s para guardar a sessão remotamente. Default 48h. |

**Example**  
```typescript
import { saveSessionCookies, restoreSessionCookies } from '../../utils/helpers';
// antes de começar o teste, restaura a sessão anterior, se houver.
test.beforeEach(async ({ context }) => {
  await restoreSessionCookies(context, 'session-123');
});
// após o teste, salva a sessão atual, para que possa ser restaurada posteriormente.
test.afterEach(async ({ context }) => {
  await saveSessionCookies(context, 'session-123', 2 * 60 * 60);
});
```
<a name="restoreSessionCookies"></a>

## restoreSessionCookies(context, key)
Restaura, no contexto do browser, os cookies previamente salvos no Glitch.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>BrowserContext</code> | Contexto do browser. |
| key | <code>string</code> | Nome da sessão no Glitch, usado para resgatar a sessão. |

**Example**  
```typescript
import { saveSessionCookies, restoreSessionCookies } from '../../utils/helpers';
// antes de começar o teste, restaura a sessão anterior, se houver.
test.beforeEach(async ({ context }) => {
  await restoreSessionCookies(context, 'session-123');
});
// após o teste, salva a sessão atual, para que possa ser restaurada posteriormente.
test.afterEach(async ({ context }) => {
  await saveSessionCookies(context, 'session-123', 2 * 60 * 60);
});
```
<a name="previewGTM"></a>

## previewGTM(context, tagAssistantUrl)
Realiza preview do GTM. Deve ser utilizada via `test.beforeEach` ou no próprio `test`.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>BrowserContext</code> | Contexto do browser. |
| tagAssistantUrl | <code>string</code> | url completa de preview do Tag Assistant. |

**Example**  
```typescript
test.beforeEach(async ({ context }) => {
  await previewGTM(context, 'https://tagassistant.google.com/#/?source=TAG_MANAGER&id=GTM-123&gtm_auth=456&gtm_preview=env-913&cb=1051629219902535');
});
```
<a name="enableGADebug"></a>

## enableGADebug()
Simula a extensão Google Analytics Debugger (https://chrome.google.com/webstore/detail/jnkmfdileelhofjcijamephohjechhna),
habilitando debug de GA3 (analytics.js) e GA4 (gtag).

**Kind**: global function  
<a name="scrollToBottom"></a>

## scrollToBottom()
Realiza scroll até o fundo da página, suavemente.

**Kind**: global function  

---

### Como criar pacotes NPM
https://www.youtube.com/watch?v=Nh9xW2-ZOEU