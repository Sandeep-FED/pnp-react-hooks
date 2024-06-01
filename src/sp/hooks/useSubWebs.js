import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useContext, useMemo } from "react";

/**
 *@param {SPFI} sp
 */
function webInfoRequest(sp) {
  return sp.web.webinfos;
}

/**
 * Returns web info collection of current web's subwebs.
 *
 * @param {import("./options").SubWebsOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] useSubWebInfos refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/webs").IWebInfosData[] | null | undefined}
 */
export function useSubWebs(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/webs").IWebInfosData[] | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/webs").IWebInfosData[] | null |undefined>>]} **/
  const [subWebs, setSubWebs] = useState();
  const internalOptions = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(webInfoRequest, setSubWebs, internalOptions, deps);

  return subWebs;
}
