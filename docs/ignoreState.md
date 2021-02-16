---
id: ignoreState
title: ignoreState
sidebar_label: ignoreState
---

`ignoreState` allows you to ignore objects that should not be deeply tracked by lape

```jsx
import { connect, useLape, ignoreState } from "lape";
import * as yup from "yup";

const Component = () => {
  const form = useLape({
    values: {
      name: "John",
    },
    validation: ignoreState(yup.object().shape({ name: yup.string() })),
  });

  return <div>{form.error}</div>;
};

export default connect(Component);
```
