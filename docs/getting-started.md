---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

## Installing lape

```bash
// NPM
npm i --save lape

// YARN
yarn add lape
```

## Basics

Lape is a small helper library that allows using any object as state. 

Lape has no concepts of its own, you use plain objects, mutate them when needed and Lape just makes sure that every react component rerenders when needed. 

To achieve this Lape has to know when your state was mutated, so you need to wrap your state objects with `lape()`.

And it has to know what state your Components are using and be able to rerender them, so you need to wrap your components with `connect()`.

## Example

Defining your state:

```typescript jsx
import { lape } from 'lape'

interface State {
  ...
}

const defaultState: State = {
  count: 0,
  deep: {
    nested: true,
  },
  array: []
}

const state = lape(defaultState)
```

Wrapping components with connect and mutating state


```jsx
import React from 'react'
import { connect } from 'lape'
import state from './state'

const Component = () => {
  const onClick = () => state.count += 1;
  
  return <div onClick={onClick}>{state.count}</div>
}

export default connect(Component)
```
