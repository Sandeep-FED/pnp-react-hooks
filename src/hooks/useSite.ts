import { CacheOptions, ExceptionOptions, RenderOptions } from "../types/options";
import { ISite, Site } from "@pnp/sp/sites";
import { ISiteInfo } from "../types/ISiteInfo";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable } from "../utils/checkDisable";
import { isUrl, UrlType } from "../utils/isUrl";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { spfi as sp } from "@pnp/sp";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface SiteInfoOptions extends ExceptionOptions, RenderOptions, CacheOptions
{
    query?: Nullable<ODataQueryable>;
    siteBaseUrl?: string;
}

export function useSite(
    options?: SiteInfoOptions,
    deps?: React.DependencyList): Nullable<ISiteInfo>
{
    const globalOptions = useContext(InternalContext);
    const [siteInfo, setSiteInfo] = useState<Nullable<ISiteInfo>>();

    const invokableFactory = useCallback(async () =>
    {
        let site: ISite;

        if (options?.siteBaseUrl)
        {
            if (isUrl(options.siteBaseUrl, UrlType.Absolute))
            {
                site = Site(options.siteBaseUrl);
            }
            else
            {
                throw new Error("Site url is not valid.");
            }
        }
        else
        {
            site = sp().site;
        }

        return createInvokable(site);
    }, [options?.siteBaseUrl]);

    const _mergedDeps = mergeDependencies([options?.siteBaseUrl], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setSiteInfo, _options, _mergedDeps);

    return siteInfo;
}