# SalesForce via nForce

## Setup: node.js

1. Install [`direnv`](https://direnv.net/)
1. Install `nvm`, possibly via a zsh plugin:
   https://github.com/nvm-sh/nvm#installing-and-updating
1. Install node.js: `nvm install --lts v14.17.3`


## Log

### Subscribe to Platform Events with static data

Given this nforce code:

```javascript
const accs = client.subscribe({
  isEvent: true,
  topic: 'ExpenseUpdatedPlatformEvent__e',
  replayId: -2,
});
```

```shell
$ npm run subscribe

> nforce-platform-events@0.0.1 subscribe
> NODE_ENV=dev node main.js

Loading environment settings: /Users/.../node-sandbox/nforce/.env.dev
Creating connection for client: ...
Received event:  {
  schema: 'CdWJN3Gl_dzo6GtQA5OLmA',
  payload: {
    ExpenseId__c: 42,
    CreatedById: '0055e000005DtchAAC',
    CreatedDate: '2021-07-16T21:53:01Z'
  },
  event: { replayId: 3877653 }
}
Received event:  {
  schema: 'CdWJN3Gl_dzo6GtQA5OLmA',
  payload: {
    ExpenseId__c: 42,
    CreatedById: '0055e000005DtchAAC',
    CreatedDate: '2021-07-16T21:53:17Z'
  },
  event: { replayId: 3877655 }
}

```

And this in SalesForce:

1. Object Builder: Create `Expense`
2. Create a Lightning App for Expenses.
   * For the `Expense` object.
   * Add a tab for the app.
4. Create an Expense, in the Expense tab/app.
5. Platform Events: Create `ExpenseUpdatedPlatformEvent` with
   * `ExpenseId Numer(5, 0) API Name ExpenseId__c`
6. Process Builder:
   * Criteria: No criteria–just execute the actions!
   * Immediate Action: Create a record
     * Record Type: `ExpenseUpdatedPlatformEvent`
     * Set field `ExpenseId` to `Number=42`
   * Activate

Questions:

1. How to create a field reference from the Process Builder action to the
   Platform Event?

