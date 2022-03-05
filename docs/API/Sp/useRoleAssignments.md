[API](API/index.md) / [Sp](API/index.md#sp) / useRoleAssignments

## Definition

▸ **useRoleAssignments**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`IRoleAssignmentInfo`[]\>

Returns role assignmets of selected scope. Use [`RoleAssignmentsOptions.scope`](RoleAssignmentsOptions.md#scope) property to change scope. Default is current web.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`RoleAssignmentsOptions`](RoleAssignmentsOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useRoleAssignments will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`IRoleAssignmentInfo`[]\>

## Examples

### Web Role Assignments

```typescript
// basic usage
const webRolesAssignments = useRoleAssignments();
```

### List Role Assignments

```typescript
// get list role assignments by list title
const listRoleAssignments = useRoleAssignments({
	scope: {
		list: "5ee53613-bc0f-4b2a-9904-b21afd8431a7"
	}
});

// get list role assignments by list title
const myListRoleAssignments = useRoleAssignments({
	scope: {
		list: "My List Title"
	}
});
```

### Item Role Assignments

```typescript
// get list item roles by list title
const listItemRoleAssignments = useRoleAssignments({
	scope: {
		list: "5ee53613-bc0f-4b2a-9904-b21afd8431a7",
		item: 12
	}
});

// get list item role assignments by list title
const myListItemRoleAssignments = useRoleAssignments({
	scope: {
		list: "My List Title",
		item: 12
	}
});
```