// inspired by https://github.com/hperrin/svelte-material-ui/blob/master/packages/common/src/internal/useActions.ts

export type SvelteActionReturnType<P> = Partial<{
  update: (newParams?: P) => void;
  destroy: () => void;
}>;

export type SvelteActionType<P> = (
  node: Element,
  params?: P
) => SvelteActionReturnType<P>;

export type ActionEntry<P extends any = any> =
  | SvelteActionType<P>
  | [SvelteActionType<P>, P];

export type ActionArray = ActionEntry[];

export function useActions(node: Element, actions: ActionArray) {
  if (!actions) return;

  const actionReturns: SvelteActionReturnType<any>[] = actions.map((actionEntry) => {
    const [action, params] = Array.isArray(actionEntry) ? actionEntry : [actionEntry];
    return action(node, params);
  });

  return {
    update(newActions: ActionArray) {
      if (!newActions || newActions.length !== actionReturns.length) {
        throw new Error('You must not change the length of an actions array.');
      }
      newActions.forEach((actionEntry, i) => {
        const returnEntry = actionReturns[i];
        const [, params] = Array.isArray(actionEntry) ? actionEntry : [actionEntry];
        returnEntry.update?.(params);
      });
    },
    destroy() {
      actionReturns.forEach((returnEntry) => {
        returnEntry.destroy?.();
      });
    },
  };
}