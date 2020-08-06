---
id: routing
title: Routing
sidebar_label: Routing
---

Most routing libraries, like `react-router` and `@reach/router` handle state internally, there is no integration needed with Lape.

But with Lape it's not that difficult to write your own routing library. Here is a simplistic implementation that you can easily adapt to your projects needs.

```typescript jsx
import { lape } from "lape";

export interface Router {
  url: string;
  query: string;
}

const router: Router = lape({
  url: window.location.pathname,
  query: window.location.search,
});

export const paths = {
  homepage: "/",
  docs: "/docs",
  component: "/component/:componentId",
};

export default router;
```

## All you need are just 4 helper functions:

---

## navigate

When you need to navigate not after clicking a link but after a callback from the server or some other JS event

```typescript jsx
export const navigate = (url) => {
  router.url = url;
  history.pushState(null, "", url);
};
```

### Example

```jsx
fetch(url).then(() => {
  navigate(backUrl);
});
```

---

## matches

To check if your current url matches that path

```typescript jsx
import { pathToRegexp } from "path-to-regexp";

export const matches = (path) => {
  return pathToRegexp(path).test(router.url);
};
```

### Example

```jsx
return (
  <>
    {matches(paths.docs) && <Docs />}
    {matches(paths.component) && <Component />}
  </>
);
```

---

## pathToUrl

When you keep your urls in a single place, they will look like this `'/component/:componentId'`. This function turns the path string into a valid url.

```typescript jsx
import { pathToRegexp } from "path-to-regexp";

export const pathToUrl = (path, params?) => {
  return compile(path)(params);
};
```

### Example

```jsx
pathToUrl(paths.component, { componentId: 123 }); // /component/123
```

---

## pathToParams

Given the path, returns the params from the current url.

```typescript jsx
import { pathToRegexp } from "path-to-regexp";

export const pathToParams = (path) => {
  let keys = [];
  const regexp = pathToRegexp(path, keys);
  const match = regexp.exec(router.url);
  if (!match) {
    return {};
  }
  const [_, ...values] = match;
  return keys.reduce((acc, key, index) => {
    acc[key.name] = values[index];
    return acc;
  }, {});
};
```

### Example

```jsx
// url is /component/123
pathToParams(paths.component); // { componentId: 123 }
```