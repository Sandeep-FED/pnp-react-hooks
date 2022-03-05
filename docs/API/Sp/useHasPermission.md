[API](API/index.md) / [Sp](API/index.md#sp) / useHasPermission

## Definition

▸ **useHasPermission**(`permissionKinds`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`boolean`\>

Returns `true` if user has permission on scope. If not returns `false`. Use [`UserPermissionOptions.userId`](UserPermissionOptions.md#userid) for another user and [`UserPermissionOptions.scope`](UserPermissionOptions.md#scope) for permission scope. Default is current user permission on current web scope.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `permissionKinds` | `PermissionKind` \| `PermissionKind`[] | SP permission kind array or permission kind value. Changing the value resends request. |
| `options?` | [`UserPermissionOptions`](UserPermissionOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useHasPermission will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`boolean`\>

## Examples

### Web Permission

```typescript
import { PermissionKind } from "@pnp/sp/security";
import { useHasPermission } from "pnp-react-hooks";

const permissions = PermissionKind.ViewListItems | PermissionKind.ViewPages

// check current users permission on web
const hasPermission = useHasPermission(permissions);

// check another user permission on web
const userHasPermission = useHasPermission(permissions, {
	userId: "user@example.onmicrosoft.com"
});
```

### List Permission

```typescript
import { PermissionKind } from "@pnp/sp/security";
import { useHasPermission } from "pnp-react-hooks";

const permissions = PermissionKind.ViewListItems | PermissionKind.ViewPages

// check current user permission on list
const hasPermission = useHasPermission(permissions, {
	scope: {
		list: "My List Title"
	}
});

// check another user permission on list
const userHasPermission = useHasPermission(permissions, {
	userId: "user@example.onmicrosoft.com",
	scope: {
		list: "5ee53613-bc0f-4b2a-9904-b21afd8431a7"
	}
});
```

### Item Permission

```typescript
import { PermissionKind } from "@pnp/sp/security";
import { useHasPermission } from "pnp-react-hooks";

const permissions = PermissionKind.ViewListItems | PermissionKind.ViewPages

// check current user permission on item
const hasPermission = useHasPermission(permissions, {
	scope: {
		list: "My List Title",
		item: 12
	}
});

// check another user permission on item
const userHasPermission = useHasPermission(permissions, {
	userId: 24,
	scope: {
		list: "5ee53613-bc0f-4b2a-9904-b21afd8431a7",
		item: 12
	}
});
```