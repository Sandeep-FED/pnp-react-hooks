import "@pnp/sp/site-groups";
import { ExceptionOptions, Nullable, PnpActionFunction, RenderOptions, WebOptions } from "../types";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { ISiteUser } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { createInvokable, isEmail } from "../utils";
import { useState, useCallback } from "react";
import { useRequestEffect } from "./internal/useRequestEffect";

export interface IsMemberOfOptions extends ExceptionOptions, RenderOptions, WebOptions
{
    userIdentifier?: string | number;
}

type MemberInfo = [Nullable<boolean>, Nullable<ISiteGroupInfo>];

const DEFAULT: MemberInfo = [undefined, undefined];

export function useIsMemberOf(
    groupIdentifier: string | number,
    options?: IsMemberOfOptions,
    deps?: React.DependencyList): MemberInfo
{
    const [isMember, setIsMember] = useState<Nullable<MemberInfo>>(DEFAULT);

    const invokableFactory = useCallback((web: IWeb) =>
    {
        const action: PnpActionFunction<IWeb, MemberInfo> = async function ()
        {
            let user: ISiteUser;

            switch (typeof options?.userIdentifier)
            {
                case "number":
                    user = this.siteUsers.getById(options.userIdentifier);
                    break;
                case "string":
                    user = isEmail(options.userIdentifier)
                        ? this.siteUsers.getByEmail(options.userIdentifier)
                        : this.siteUsers.getByLoginName(options.userIdentifier)
                    break;
                default:
                    user = this.currentUser
                    break;
            }

            const queryInstance = typeof groupIdentifier === "number"
                ? user.groups.filter(`Id eq ${groupIdentifier}`)
                : user.groups.filter(`Title eq '${groupIdentifier}'`);

            const response = await queryInstance.top(1).get();

            return response.length === 1
                ? [true, response[0]]
                : [false, undefined];
        }

        return createInvokable(web, action);

    }, [options?.userIdentifier, groupIdentifier]);

    const mergedDeps = deps
        ? [groupIdentifier, options?.userIdentifier].concat(deps)
        : [groupIdentifier, options?.userIdentifier];

    useRequestEffect(invokableFactory, setIsMember, options, mergedDeps);

    return isMember ?? DEFAULT;
}