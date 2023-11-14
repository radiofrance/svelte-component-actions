# svelte-component-actions

This package provides a [svelte action](https://svelte.dev/docs/svelte-action) that facilitates the use of actions and action parameters on components. It is based on what [svelte-material-ui](https://github.com/hperrin/svelte-material-ui) uses internaly for its own components.

## Install
```bash
npm install svelte-component-actions
```

## Usage

In the component you want to pass actions to :

- Expose a `use` props
- Import `useActions` from `svelte-component-actions` and add the `use` directive to the desired element as follows : `use:useActions={use}`

```html
<!-- MyComponent.svelte -->
<script lang="ts">
  import { useActions, type ActionArray } from "svelte-component-actions";

  export let use: ActionArray = [];
</script>

<div use:useActions={use}>
  Hello from MyComponent !
</div>
```

When using your component, give the `use` prop an array. Each array element can either be an action, or an array containing an action followed by its parameters.


```html
<!-- MyPage.svelte -->
<script>
  import MyComponent from "./Mycomponent.svelte"
  import { myAction, myActionWithParams }
</script>

<MyComponent
  use={[ myAction, [ myActionWithParams, { myParam1: "foo", myParam2: "bar" }]]}
/>
```

> ⚠️ **When updating action parameters, do not change the actions array length**
