---
id: testing
title: Testing
sidebar_label: Testing
---

We think that testing components is an important part of the development workflow. Mutable state is notoriously difficult to test, but Lape makes this easy.

Lape can reset state after each test, your tests should never rely on the execution order. Use the `lapeTrackAllChanges` and `lapeResetAllChanges` functions.

```typescript jsx
import { lapeResetAllChanges, lapeTrackAllChanges } from "lape/testing";

beforeEach(() => {
  lapeTrackAllChanges();
});

afterEach(() => {
  lapeResetAllChanges();
});
```

If you are using jest, add this to `setupFilesAfterEnv` and you will not need to think about state being shared in tests.

## Examples

[Check internal lape tests](https://github.com/UgnisSoftware/lape/tree/master/test/exampleTests)