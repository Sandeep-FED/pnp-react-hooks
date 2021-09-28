import * as React from "react";
import { useListItems } from "../../src";
import { ListOptions } from "../../src/types";

export function ListItemsDebug()
{
    const listItems = useListItems("Test List", {
        mode: ListOptions.Auto,
        query: { select: ["ID", "Title"] },
        exception: console.log,
    });
    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () => setCounter(counter + 1);

        console.debug(`item count : ${listItems?.length}`);
        console.debug(`render count:${counter}`);

        window.addEventListener("render", eventHandler, false);

        return () => window.removeEventListener("render", eventHandler);
    }, [counter, listItems]);

    return (<div>{counter}</div>);
}