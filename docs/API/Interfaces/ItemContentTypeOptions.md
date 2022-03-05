[API](API/index.md) / [Interfaces](index.md) / ItemContentTypeOptions

## Hierarchy

- [`PnpHookOptions`](types_options.PnpHookOptions.md)<[`ODataQueryableCollection`](types_ODataQueryable.ODataQueryableCollection.md)\>

  ↳ **`ItemContentTypeOptions`**

## Properties

### behaviors

• `Optional` **behaviors**: `TimelinePipe`<`any`\>[]

Additional behaviors for hooks PnP request.

#### Inherited from

[PnpHookOptions](types_options.PnpHookOptions.md).[behaviors](types_options.PnpHookOptions.md#behaviors)

___

### disabled

• `Optional` **disabled**: [`DisableOptionValueType`](types_options_RenderOptions.md#disableoptionvaluetype) \| [`DisableOptionFuncType`](types_options_RenderOptions.md#disableoptionfunctype)

Disable hook calls and renders.

#### Inherited from

[PnpHookOptions](types_options.PnpHookOptions.md).[disabled](types_options.PnpHookOptions.md#disabled)

___

### error

• `Optional` **error**: [`ErrorFunc`](types_options_ExceptionOptions.md#errorfunc) \| [`ErrorMode`](ErrorMode.md)

Error handling. Default is [`ErrorMode.Default`](ErrorMode.md#default).

#### Inherited from

[PnpHookOptions](types_options.PnpHookOptions.md).[error](types_options.PnpHookOptions.md#error)

___

### keepPreviousState

• `Optional` **keepPreviousState**: `boolean`

Keep previous state until new request resolves rather than clearing the state as `undefined`. Default is `false`.

#### Inherited from

[PnpHookOptions](types_options.PnpHookOptions.md).[keepPreviousState](types_options.PnpHookOptions.md#keeppreviousstate)

___

### list

• `Optional` **list**: `string`

List GUID Id or title for getting list changes. Keep undefined for web changes.
Changing list value resends request.

___

### query

• `Optional` **query**: [`Nullable`](NullableT.md#nullable)<[`ODataQueryableCollection`](types_ODataQueryable.ODataQueryableCollection.md)\>

#### Inherited from

[PnpHookOptions](types_options.PnpHookOptions.md).[query](types_options.PnpHookOptions.md#query)

___

### sp

• `Optional` **sp**: `SPFI`

Pnp SP context.

#### Inherited from

[PnpHookOptions](types_options.PnpHookOptions.md).[sp](types_options.PnpHookOptions.md#sp)