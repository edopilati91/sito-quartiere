## Filament 5 Specific Patterns

### Icons

```php
use Filament\Support\Icons\Heroicon;

protected static string|BackedEnum|null $navigationIcon = Heroicon::Squares2x2;
```

### Imports

Always import layout components explicitly (`Grid`, `Section`, ...): Filament 5 requires it.

## Fields

- `is_active`: `IconColumn::make('is_active')->boolean()` on table, `Filament\Forms\Components\Toggle` on form
- Time fields: `Filament\Forms\Components\TimePicker` on form
- Date fields: `Filament\Forms\Components\DatePicker` on form

## Readonly fields

On form use `TextEntry` with the `state()` method instead of `Placeholder`.

## Schema organization

Extract forms, tables and infolists of each resource to dedicated classes under
`Resources/{Name}/Schemas/` and `Resources/{Name}/Tables/`.

## FilaCheck

After creating or modifying files in `app/Filament`, run:

```bash
vendor/bin/filacheck --fix
```
