[API](API/index.md) / [Sp](API/index.md#sp) / useListChangeToken

## Definition

▸ **useListChangeToken**(`list`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<[`IChangeTokenInfo`](IChangeTokenInfo.md)\>

Returns list current change token and last modified dates.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | `string` | List GUID id or title. Changing the value resends request. |
| `options?` | [`ListTokenOptions`](ListTokenOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useListChangeToken will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<[`IChangeTokenInfo`](IChangeTokenInfo.md)\>

## Examples

```typescript
// get token by list Id
const changeToken = useListChangeToken("5ee53613-bc0f-4b2a-9904-b21afd8431a7");

// get token by list title
const changeToken = useListChangeToken("My List Title");
```

## Remarks

You can also use [`useList`](API/Sp/useList.md) to get exact same change info.

```typescript
const listInfo = useList("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	query: {
		select: [ "CurrentChangeToken",
                "LastItemDeletedDate",
                "LastItemModifiedDate",
                "LastItemUserModifiedDate" ]
	}
});
```