---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

---

# Installing lape

```bash
// NPM
npm i --save lape

// YARN
yarn add lape
```

# Basic example


Define your state

```typescript jsx
import { lape } from 'lape'

interface State {
  ...
}

const defaultState: State = {
  count: 0,
  // Your state can be deeply nested as you want
  deep: {
    nested: true,
  },
  array: []
}

const state = lape(defaultState)
```

Wrap your components with connect

```typescript jsx
import React from 'react'
import { lape } from 'lape'
import state from './state'

const Component = () => {
  const onClick = () => state.count += 1;
  
  return <div onClick={onClick}>{state.count}</div>
}

export default connect(Component)
```
