[API](API/index.md) / [Sp](API/index.md#sp) / useFolder

## Definition

▸ **useFolder**(`folderId`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`IFolderInfo`\>

Return a folder.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `folderId` | `string` | Folder GUID Id or server relative path. Changing the value resends request. |
| `options?` | [`FolderOptions`](FolderOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useFolder will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`IFolderInfo`\>

## Examples

```typescript
// get folder by Id
const folder = useFolder("5ee53613-bc0f-4b2a-9904-b21afd8431a7");

// get folder by server relative url
const siteAssets = useFolder("/sites/mysite/SiteAssets", {
	query: {
		select: ["Id", "Name", "ServerRelativeUrl"]
	}
});
```