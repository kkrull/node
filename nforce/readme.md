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



### Change Data Capture

1. Forget everything about Process Builder and Platform Events.  Just create the
   entity (`Expense`) that is be tracked, and create the usual Lightning app+tab
   to do CRUD on it.
1. Change Data Management: Add `Expense` to the entiites for which changes are
   tracked.
1. Use `sforcejs` instead of `nforce`, which was waiting on implementing a more
   generic Streaming API in a version 2.0 that never happened.
1. Subscribe to `channel: 'Expense__ChangeEvent'`.
1. Received events:
   * Always define `payload.ChangeEventHeader.changedFields`, which says which
     fields got changed.
   * Has `.payload.<changed field>`, which contains the new value.


As in this example

```
Received event:  {
  "schema": "UgiaO48sa_YABPmoB3puUQ",
  "payload": {
    "LastModifiedDate": "2021-07-16T22:44:00.000Z",
    "Amount__c": 10, /* Updated field */
    "ChangeEventHeader": {
      "commitNumber": 152750313434,
      "commitUser": "0055e000005DtchAAC",
      "sequenceNumber": 1,
      "entityName": "Expense__c",
      "changeType": "UPDATE",
      "changedFields": [
        "LastModifiedDate",
        "Amount__c" /* Seeing this, you know to look up this field in .payload */
      ],
      "changeOrigin": "com/salesforce/api/soap/52.0;client=SfdcInternalAPI/",
      "transactionKey": "0006ec96-3666-c8c6-a47c-e81607d02650",
      "commitTimestamp": 1626475440000,
      "recordIds": [
        "a005e000004y0fBAAQ"
      ]
    }
  },
  "event": {
    "replayId": 8052880
  }
}
```
