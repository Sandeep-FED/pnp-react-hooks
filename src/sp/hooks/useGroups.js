import "@pnp/sp/site-groups";
import { assertID, assertString } from "../../utils/assert.js";
import { checkDisable } from "../checkDisable.js";
import { isEmail } from "../../utils/is.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";
import { InternalContext } from "../../context/pnpHookOptionProvider.js";

/**
 * Returns group collection. Use {@link GroupsOptions.userId} property to get
 * groups for specific user.
 *
 * @param {import("./options.js").GroupsOptions} [options] - Pnp hook options.
 * @param {import("react").DependencyList} [deps] - useGroups refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/site-groups").ISiteGroupInfo[] | null | undefined}
 */
export function useGroups(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/site-groups").ISiteGroupInfo[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/site-groups").ISiteGroupInfo[] | null |undefined>>
   *  ]}
   **/
  const [groups, setGroups] = useState();

  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
      const userId = options?.userId;

      switch (typeof userId) {
        case "number": {
          assertID(userId, "userId is not valid ID.");
          return sp.web.siteUsers.getById(userId).groups;
        }
        case "string": {
          assertString(userId, "userId is not valid or empty");
          return isEmail(userId)
            ? sp.web.siteUsers.getByEmail(userId).groups
            : sp.web.siteUsers.getByLoginName(userId).groups;
        }
        case "undefined": {
          return sp.web.siteGroups;
        }
        default:
          throw new TypeError("userId value type is not string or number.");
      }
    },
    [options?.userId],
  );

  const mergedDeps = mergeDependencies([options?.userId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(requestFactory, setGroups, internalOpts, mergedDeps);

  return groups;
}
