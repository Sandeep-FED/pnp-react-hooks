import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveGroup } from "../resolveGroup";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns user collection from specific group.
 *
 * @param {string | number} groupId - Group name or Id. Changing the value resends request.
 * @param {import("./options").GroupUsersOptions} [options] - Pnp hook options.
 * @param {import("react").DependencyList} [deps] - useGroupUsers refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/site-users").ISiteUserInfo[] | null | undefined}
 */
export function useGroupUsers(groupId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/site-users").ISiteUserInfo[] | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/site-users").ISiteUserInfo[] | null |undefined>>]} **/
  const [groupUsers, setGroupUsers] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      const group = resolveGroup(sp.web, groupId);
      return group.users;
    },
    [groupId],
  );

  const mergedDeps = mergeDependencies([groupId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, groupId);

    return opt;
  }, [groupId, options, globalOptions]);

  useQueryEffect(requestFactory, setGroupUsers, internalOpts, mergedDeps);

  return groupUsers;
}
