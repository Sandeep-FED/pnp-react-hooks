[API](API/index.md) / [Sp](API/index.md#sp) / useChanges

## Definition

▸ **useChanges**<`T`\>(`changeQuery`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`T`[]\>

Returns web or list change collection. Use [`ChangesOptions.list`](ChangesOptions.md#list) property
to get list changes instead of web changes.

### Type parameters

| Name |
| :------ |
| `T` |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `changeQuery` | `IChangeQuery` | Change query. Hook resends request if **shallow comparison** returns false. |
| `options?` | [`ChangesOptions`](ChangesOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useChanges will resend request when one of the dependencies changed. |

### Returns

[`Nullable`](NullableT.md#nullable)<`T`[]\>

Changes info array.

### Examples

:::danger

Be cautious when using `ChangeTokenEnd` and `ChangeTokenStart` query options. Token values are wrapped in an object and can result infinite rendering loop due to shallow comparison. Make sure token objects are not changing on every render.

:::

```typescript
const [myQuery, setQuery] = useState({
    Add:true
    Alert:true,
	// make sure token references are not changing every render.
    ChangeTokenEnd: { StringValue: "some end token string" },
    ChangeTokenStart: { StringValue: "some start token string" }
});

const webChanges = useChanges(myQuery);

// It's safe to use directly when you only use boolean query values.
const webChanges = useChanges({
    Add:true
    Alert:true,
    GroupMembershipDelete:true
});

const listChangeQuery = {
    Add:true
    Update:true,
    Delete:true
};

// getting list changes by list title
const listChanges = useChanges(listChangeQuery, {
	list: "My List Title"
});

// getting list changes by list Id
const anotherListChanges = useChanges(listChangeQuery, {
	list: "61ca5ff8-f553-4d51-a761-89225b069a4f"
});
```