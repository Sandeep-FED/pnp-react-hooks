[API](API/index.md) / [Sp](API/index.md#sp) / useFiles

## Definition

▸ **useFiles**(`folderId`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`IFileInfo`[]\>

Returns file collection from folder.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `folderId` | `string` | Folder GUID Id or server relative path. Changing the value resends request. |
| `options?` | [`FilesOptions`](FilesOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useFiles will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`IFileInfo`[]\>

## Examples

```typescript
// get all files from folder by folder Id
const files = useFiles("5ee53613-bc0f-4b2a-9904-b21afd8431a7");

// get all files from folder by folder server relative url
const siteAssetsFiles = useFiles("/sites/mysite/SiteAssets", {
	query: {
		select: ["Id", "Name", "ServerRelativeUrl", "Author/Title"]
		expand: ["Author"]
	}
});
```