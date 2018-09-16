# mystique-server
> 👾 A simple mock-server for use in node.js E2E tests.

# Usage

```javascript
async function test() {
  let mockServer = await createMockRestServer(8585);
  let promise = codeThatCallsEndpoint({number: 20});
  await mockServer.post('/endpoint', async function (req) {
    assert(req.body.number === 20, 'number should be 20');
    return {result: 'ok'}
  });
  let {result} = await promise;

  assert(result === 'okay', 'result must be okay');

  console.log('done');
}
```
