import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../../context";
import { InvokableFactory, Nullable, ODataQueryable, ODataQueryableCollection, PnpHookOptions, SharepointQueryable } from "../../types";
import { LoadActionMode } from "../../types/options/RenderOptions";
import { compareTuples, deepCompareQuery, insertCacheOptions, insertODataQuery, resolveWeb, shallowEqual } from "../../utils";
import { from, NextObserver, Subscription } from "rxjs";
import { useCallback, useContext, useEffect } from "react";
import { useRef } from "react";

export function useQueryEffect<TQuery extends ODataQueryable | ODataQueryableCollection, TReturn, TContext extends SharepointQueryable = SharepointQueryable>(
    invokableFactory: InvokableFactory<TContext>,
    stateAction: (value: Nullable<TReturn>) => void,
    options?: PnpHookOptions<Nullable<TQuery>>,
    deps?: React.DependencyList)
{
    const globalOptions = useContext(InternalContext);

    const prevQuery = useRef<Nullable<TQuery>>(undefined);
    const prevWebOption = useRef<Nullable<IWeb | string>>(null);
    const prevdependencies = useRef<Nullable<React.DependencyList>>(null);

    const subscription = useRef<Nullable<Subscription>>(undefined);

    const _cleanUp = useCallback(() =>
    {
        subscription.current?.unsubscribe();
        subscription.current = undefined;
    }, []);

    // Component unmount cleanup
    useEffect(_cleanUp, [_cleanUp]);

    useEffect(() =>
    {
        const query = options?.query;
        const webOption = globalOptions?.web ?? options?.web;

        const shouldUpdate = !deepCompareQuery(prevQuery.current, query)
            || !compareTuples(prevdependencies.current, deps)
            || !shallowEqual(prevWebOption.current, webOption);

        if (shouldUpdate)
        {
            const mergedOptions = options
                ? { ...globalOptions, ...options }
                : globalOptions;

            _cleanUp();

            if (mergedOptions?.loadActionOption !== LoadActionMode.KeepPrevious)
            {
                stateAction(undefined);
            }

            const observer: NextObserver<TReturn> = {
                next: data => stateAction(data),
                complete: _cleanUp,
                error: (err: Error) =>
                {
                    stateAction(null);

                    if (typeof mergedOptions.exception === "function")
                    {
                        mergedOptions.exception(err);
                    }
                    else if (!mergedOptions.exception)
                    {
                        throw err;
                    }
                }
            };

            const web = resolveWeb(mergedOptions);
            const invokeable = invokableFactory(web);

            insertODataQuery(invokeable, query);
            insertCacheOptions(invokeable, mergedOptions);

            subscription.current = from(invokeable())
                .subscribe(observer);
        }

        prevQuery.current = query;
        prevWebOption.current = webOption;
        prevdependencies.current = deps;
    });
}