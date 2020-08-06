---
id: useLape
title: useLape
sidebar_label: useLape
---

`useLape` is the same `lape` function designed to work as a hook.

```jsx
import { connect, useLape } from 'lape'

const Component = () => {
  const state = useLape({
    count: 1,
  });

  const onClick = () => state.count += 1;
  
  return <div onClick={onClick}>{state.count}</div>
}

export default connect(Component)
```