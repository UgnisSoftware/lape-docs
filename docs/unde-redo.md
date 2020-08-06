---
id: undo-redo
title: undo / redo
sidebar_label: undo / redo
---

Lape supports undo/redo out of the box.

Record actions with `recordUndo`. it accepts a callback that is called immediately. You can mix local and global state inside one action.

```jsx
import { recordUndo, undo, redo } from 'lape'
import state from './state'

const Component = () => {
  const onClick = () => {
    recordUndo(() => {
      state.count += 1;
    })
  }
  
  return (
    <>
      <div onClick={() => undo()}>undo</div>
      <div onClick={() => redo()}>redo</div>
      <div onClick={onClick}>{state.count}</div>
    </>
  )
}
```

Calling `undo` and then triggering `recordUndo` will start creating a new history from that point, so `redo` stack will be empty until you use `undo` again.

## Stacks

Every undo function accepts a stackId, which if you don't send anything is 'default'. This allows you to have multiple undo redo users without one making changes to the other.


```jsx
import { recordUndo, undo, redo } from 'lape'
import state from './state'

const COUNT = 'COUNT'
const ARRAY = 'ARRAY'


const Component = () => {

  const onClickCount = () => {
    recordUndo(() => {
      state.count += 1;
    }, COUNT)
  }

  const onClickArray = () => {
    recordUndo(() => {
      state.array[0].amount += 1;
    }, ARRAY)
  }
  
  return (
    <>
      <div onClick={() => undo(COUNT)}>undo</div>
      <div onClick={() => redo(COUNT)}>redo</div>
      <div onClick={onClickCount}>{state.count}</div>
      <div onClick={onClickArray}>{state.array[0].amount}</div>
    </>
  )
}
```


## Other

There are additional functions exposed that might be useful like `canUndo`, `canRedo` and `resetUndoStack`.