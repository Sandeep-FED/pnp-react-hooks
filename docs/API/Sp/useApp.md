[API](API/index.md) / [Sp](API/index.md#sp) / useApp

## Definition

▸ **useApp**<`T`\>(`appId`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`T`\>

Returns an app detail of the given Id from the app catalog.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Return type |

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appId` | `string` | App GUID Id string. Changing the appId value resends request. |
| `options?` | [`WebAppOptions`](WebAppOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useApp will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`T`\>

App info object.

## Examples

```typescript
// basic usage
const app = useApp("5ee53613-bc0f-4b2a-9904-b21afd8431a7");

// with query
const appWithQuery = useApp("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	query: {
		select: ["Title", "Id", "IsEnabled"]
	}
});
```