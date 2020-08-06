---
id: lape
title: lape
sidebar_label: lape
---

`lape` wraps an object in a transparent Proxy. It takes and object and returns the same object without changing it in any way.

## Example

```typescript jsx
import { lape } from "lape";

const defaultState = {
  count: 0,
  deep: {
    nested: true,
  },
  array: [],
};

const state = lape(defaultState);

state.count = 2;
state.deep.nested = false;
state.array.push({ hello: "hi" });
state.array[0].hello = "hello";
delete state.deep;
state.array.pop();
```
