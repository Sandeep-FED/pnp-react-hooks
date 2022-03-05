[API](API/index.md) / [Interfaces](index.md) / ListItemsOptions

## Hierarchy

- [`PnpHookOptions`](types_options.PnpHookOptions.md)<[`ODataQueryableCollection`](types_ODataQueryable.ODataQueryableCollection.md)\>

  ↳ **`ListItemsOptions`**

## Properties

### behaviors

• `Optional` **behaviors**: `TimelinePipe`<`any`\>[]

Additional behaviors for hooks PnP request.

#### Inherited from

[PnpHookOptions](types_options.PnpHookOptions.md).[behaviors](types_options.PnpHookOptions.md#behaviors)

___

### disabled

• `Optional` **disabled**: [`DisableOptionValueType`](types_options_RenderOptions.md#disableoptionvaluetype) \| (`list`: `string`) => `boolean`

Disable hook calls and renders.

#### Overrides

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

### mode

• `Optional` **mode**: [`Default`](API/Enums/ListOptions.md#default)

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