export type SvelteActionReturnType<P> = {
  update?: (newParams?: P) => void;
  destroy?: () => void;
} | void;

export type SvelteHTMLActionType<P> = (
  node: HTMLElement,
  params?: P
) => SvelteActionReturnType<P>;

export type HTMLActionEntry<P extends any = any> =
  | SvelteHTMLActionType<P>
  | [SvelteHTMLActionType<P>, P];

export type HTMLActionArray = HTMLActionEntry[];

export type SvelteSVGActionType<P> = (
  node: SVGElement,
  params?: P
) => SvelteActionReturnType<P>;

export type SVGActionEntry<P extends any = any> =
  | SvelteSVGActionType<P>
  | [SvelteSVGActionType<P>, P];

export type SVGActionArray = SVGActionEntry[];

export type ActionArray = HTMLActionArray | SVGActionArray;

export function useActions(node: HTMLElement | SVGElement, actions: ActionArray) {
  if (!actions) return;

  const actionReturns: SvelteActionReturnType<any>[] = actions.map((actionEntry) => {
    const [action, params] = Array.isArray(actionEntry) ? actionEntry : [actionEntry];
    return action(node as HTMLElement & SVGElement, params);
  });

  return {
    update(newActions: ActionArray) {
      if (!newActions || newActions.length !== actionReturns.length) {
        throw new Error('You must not change the length of an actions array.');
      }
      newActions.forEach((actionEntry, i) => {
        const returnEntry = actionReturns[i];
        const [, params] = Array.isArray(actionEntry) ? actionEntry : [actionEntry];
        returnEntry?.update?.(params);
      });
    },
    destroy() {
      actionReturns.forEach((returnEntry) => {
        returnEntry?.destroy?.();
      });
    },
  };
}