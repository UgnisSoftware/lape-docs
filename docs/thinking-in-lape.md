---
id: thinking-in-lape
title: This is document number 3
sidebar_label: Thinking in Lape

---

## Example explained:

Every app consists of 3 parts:

- State - a simple JSON structure
- Side-effects - rendering to DOM, fetching from server, setting timers, etc.
- Events - functions that change the state

### State

State can be any JSON structure that is passed into a `lape` function. The `lape` function transparently wraps your data and tracks every Get and Set operation.

### Side effects

#### React

`connect` is a small wrapper around your component that records any Get operations from state. If any event changes the tracked state, the component will trigger it's render function.

#### Virtual fetch

Not implemented yet, use promises or async/await

### Events

Events is a function that mutates the state. Don't trigger it while doing side-effects or it might loop. Every side effect that used the changed state will update automatically.

## Pro tips:

- You should `connect` every component that uses global state, connecting just the root is fine, but connecting more is a good optimisation
- Don't mutate the state in render (same as calling setState(), could cause infinite loops)
- The end nodes, like strings/numbers/booleans, are not proxies, so don't do `lape('abc')`, have at least one parent `lape({name: 'abc'})`
- Same goes for reassignment:

```js
const state = lape({user: {name: 'abc'}})
let name = state.user.name
name = 'cba' // This will not change the state, only reassign local variable because primitives are immutable in JS

let user = state.user
user.name = 'cba' // This will work as objects are shared by reference
```
