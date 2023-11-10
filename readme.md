# svelte-component-actions

This package provides a [svelte action](https://svelte.dev/docs/svelte-action) that facilitates the use of actions and action parameters on components. It is based on what [svelte-material-ui](https://github.com/hperrin/svelte-material-ui) uses internaly for its own components.

## Install
```bash
npm install svelte-component-actions
```

## Usage

```html
<!-- MyComponent.svelte -->
<script>
  import { useActions, type ActionArray } from "svelte-component-actions";

  export let use: ActionArray = [];
</script>

<div use:useActions={use}>
  Hello from MyComponent !
</div>
```

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