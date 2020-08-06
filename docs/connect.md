---
id: connect
title: connect
sidebar_label: connect
---

`connect` wraps your components to track what state the component uses and rerenders the component when that state was mutated.

It's recommended to wrap as many components as you can for optimisation, but wrapping only root component would work as well.

## Example

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
