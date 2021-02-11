# cfx-appearance

A flexible player customization script for FiveM.

**Features**

- Freemode ped full customization (head blend, face features, head overlays, components, props)
- Default data structure for player / ped appearance
- Camera control

**Usage**

1. Clone the repository into your `resources/[local]` folder.
2. Install both client and interface dependencies, `cd typescript` / `cd ui`, `yarn` to install, then `yarn build`.
3. Start development.

This is a development resource, if you don't use the exports the resource itself will do nothing.

**Client Exports**

| Export                   | Parameters                                              |
| ------------------------ | ------------------------------------------------------- |
| startPlayerCustomization | currentAppearance? (PedAppearance), callback (function) |
| setPlayerAppearance      | appearance (PedAppearance)                              |
| setPedAppearance         | appearance (PedAppearance)                              |

**Examples**

Customization command (Lua)

```lua
RegisterCommand('customization', function()
  exports['cfx-appearance']:startPlayerCustomization(function (appearance)
    if (appearance) then
      print('Saved')
    else
      print('Canceled')
    end
  end)
end, false)
```

Start player customization with callback (TypeScript)

```typescript
const exp = (global as any).exports;

exp["cfx-appearance"].startPlayerCustomization((appearance) => {
  if (appearance) {
    console.log("Customization saved");
    emitNet("genericSaveAppearanceDataServerEvent", JSON.stringify(appearance));
  } else {
    console.log("Customization canceled");
  }
});
```

Set player appearance (TypeScript)

```typescript
const exp = (global as any).exports;

onNet("genericPlayerAppearanceLoadedServerEvent", (appearance) => {
  exp["cfx-appearance"].setPlayerAppearance(appearance);
});
```

## Credits

- root-cause for providing some of the customization data
- xIAlexanderIx for the code style inspiration
