# react-popover2

littlebits/react-popover successor.

## Installation

```
npm install --save ataccama/react-popover2
```

```
yarn add ataccama/react-popover2
```

If you want to install already pre-build version, use `dist` branch:

```
npm install --save ataccama/react-popover2#dist
```

```
yarn add ataccama/react-popover2#dist
```

## This fork

This fork makes use of BEM-style class names. A new prop `className` sets the base Block Name, with elements being named `body` and `trigger`. It also supports a `modifiers` prop, which is an array of strings that will be added to BEM class.

We've also removed the triangle (tip) on the popover. We'd rather create this with CSS.

## API

### `export default` `Popover(props, target)`

#### `props :: {...}`

---

##### `body :: Node | Array Node`
The `popover` content. Content is rooted (becomes children of) `.Popover-body` and thus `body` can be a single `node` _or an array of `nodes`_.


---

##### `parent :: Node`
Sets the parent element of the body attribute.


---

##### `isOpen :: Boolean`
Determines Whether or not the popover is rendered.

---

##### `className :: String`
Determines component Module Name for BEM-Style classes

---

##### `modifiers :: String | Array String`
Determines component Modifiers for BEM-Style classes

---

##### `preferPlace :: Enum String | Null`
Sets a ***preference*** of where to position the Popover. Only useful to specify placement in case of multiple available fits. Defaults to `null`. Valid values are:

`above | right | below | left` :: Prefer an explicit side.
`row | column` :: Prefer an orientation.
`start | end` :: Prefer an order.
`null` :: No preference, automatic resolution. This is the default.

---

##### `place :: String | Null`
Like `preferPlace` except that the given place is a ***requirement***. The resolver becomes scoped or disabled. It is scoped if the `place` is an `orientation` or `order` but disabled if it is a `side`. For example `place: "row"` scopes the resolver to `above` or `below` placement but `place: "above"` removes any need for the resolver.

---

##### `onOuterAction :: (Event) -> Void`
A callback function executed every time the user does an action (`mousedown` or `touchstart`) outside the DOM tree of both `Popover` and `Target`. A canonical use-case is to automatically close the Popover on any external user action.


---

##### `refreshIntervalMs :: Number | Falsey`
The polling speed (AKA time between each poll) in milliseconds for checking if a layout refresh is required. This polling is required because it is the only robust way to track the position of a target in the DOM. Defaults to `200`. Set to a falsey value to disable.


---

#### `target :: React Element`

- The React Element that this popover will orient itself around. `target` `rendering tree` is unaffected. `Popover` _will_ become its `owner`.
