import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { ODataQueryable } from "../types";
import { PnpHookOptions } from "../types";
import { createInvokable } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveUser } from "../resolveUser";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";
import { DisableOptionValueType } from "../../types";
import { InternalContext } from "../../context";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { SPFI } from "@pnp/sp";

export interface UserOptions extends PnpHookOptions<ODataQueryable> {
  disabled?: DisableOptionValueType | { (userId: number | string): boolean };
}

/**
 * Returns an user from site user collection.
 * @param userId User Id, login name, email.
 * @param options
 * @param deps
 * @returns
 */
export function useUser(
  userId: number | string,
  options?: UserOptions,
  deps?: React.DependencyList,
): ISiteUserInfo | undefined | null {
  const globalOptions = useContext(InternalContext);
  const [siteUser, setSiteUser] = useState<ISiteUserInfo | undefined | null>(
    undefined,
  );

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const user = resolveUser(sp.web.siteUsers, userId);
      return createInvokable(user);
    },
    [userId],
  );

  const _mergedDeps = mergeDependencies([userId], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, userId);

    return opt;
  }, [userId, options, globalOptions]);

  useQueryEffect(invokableFactory, setSiteUser, _options, _mergedDeps);

  return siteUser;
}