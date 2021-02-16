---
id: useLapeEffect
title: useLapeEffect
sidebar_label: useLapeEffect
---

`useLapeEffect` is similar to `useEffect`, but it runs every time anything that was used inside of it was mutated.

```jsx
import { connect, useLape } from "lape";

const Component = () => {
  const form = useLape({
    values: {
      name: "John",
    },
    error: undefined,
  });

  // this fucntion will run anytime form.values.name has changed
  useLapeEffect(() => {
    if (form.values.name === "John") {
      form.error = "Cannot use name John";
    }
  });

  return <div>{form.error}</div>;
};

export default connect(Component);
```

_Be careful_ you can easily loop forever if you mutate the same thing you listen to

```jsx
import { connect, useLape } from "lape";
import * as yup from "yup";

const Component = () => {
  const state = useLape({
    count: 0,
  });

  // this function will run forever
  useLapeEffect(() => {
    state.count++;
  });

  return <div>{state.count}</div>;
};

export default connect(Component);
```
