import "@pnp/sp/site-users";
import { useQueryEffect } from "./internal/useQuery";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useState, useCallback } from "react";

export type SiteUsersOptions = PnpHookOptions<ODataQueryableCollection>;

export function useSiteUsers(
    options?: SiteUsersOptions,
    deps?: React.DependencyList): Nullable<Array<ISiteUserInfo>>
{
    const [siteUser, setSiteUser] = useState<Nullable<Array<ISiteUserInfo>>>(undefined);

    const invokableFactory = useCallback((web: IWeb) =>
    {
        const queryInstance = web.siteUsers;
        return createInvokable(queryInstance);
    }, []);

    useQueryEffect(invokableFactory, setSiteUser, options, deps);

    return siteUser;
}