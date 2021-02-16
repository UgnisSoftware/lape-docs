---
id: lapeTrackUseState
title: lapeTrackUseState
sidebar_label: lapeTrackUseState
---

If you want to use `useState` in the same project you are using lape, you should call this function in the index file.

```jsx
import { lapeTrackUseState } from "lape";

// should be set before first render
lapeTrackUseState()

ReactDOM.render(<App/>, document.body)
```

Else lape would not know that new state need to be tracked, for example:

```jsx
import { useState, connect } from "lape";

const Component = () => {
  const [loading, setLoadging] = useState(false);
  const state = useLape({
    count: 1,
  });

  const onClick = () => (state.count += 1);
  
  // if something changes loading to true, state.count would be displayed, but lape would not know that this has happened.
  if (loading) {
    return <Loader />;
  }

  return <div onClick={onClick}>{state.count}</div>;
};

export default connect(Component);
```
