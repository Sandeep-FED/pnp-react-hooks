import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { useSiteUsers } from "../../src";
import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

test("useSiteUsers top 5 users", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useSiteUsers({
            query: {
                select: ["ID", "Title", "Email"],
                top: 5
            },
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useSiteUsers top 5 users", CustomHookMockup, props))
            .resolves.toBeTruthy());
});