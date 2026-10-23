### Models

- **Singular, PascalCase**: `Event`, `News`
- **Pivot Models**: Descriptive names: `EventUser`
- **Polymorphic Models**: Single name: `Comment` (polymorphic commentable)

### Enums

- **Location**: `app/Enums/`
- **Values**: TitleCase: `Published`
- **Labels**: add a `label(): string` method that returns a translated label
- **Comparisons**: compare enum instances (`$event->status === EventStatus::Published`), not `->value`.
  `->value` is correct only when passing values to raw DB queries (`->where(...)`, `->update(...)`).

### Strict Typing

All new PHP files must declare strict types:

```php
declare(strict_types=1);
```

### Eloquent Relationships with Type Hints and PHPDoc required

```php
/**
 * @return BelongsTo<User, $this>
 */
public function author(): BelongsTo
{
    return $this->belongsTo(User::class);
}
```

### Factory Pattern

```php
use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Attributes\UseFactory;

#[UseFactory(EventFactory::class)]
class Event extends Model
{
    use HasFactory;
}
```

### Pivot Tables with Models

Always create explicit pivot models for complex relationships:

```php
public function participants(): BelongsToMany
{
    return $this->belongsToMany(User::class)
        ->using(EventUser::class)
        ->withPivot('registered_at');
}
```

### Translation Keys

All UI strings must use translation keys. The site is in Italian: add keys to `lang/it/` (and `lang/en/`).

```php
__('events.plural')      // "Eventi"
__('events.singular')    // "Evento"
__('shared.name')        // "Nome"
```

### Model creation and edit

When creating or editing a model in code, assign attributes one by one instead of passing an array.
Do not use `Model::create([array])`, use:

```php
$model = new Model();
$model->field = $value;
$model->save();
```

This is more readable and maintainable, and the static analyser and IDE support it better.

## Development Workflow

### When Adding New Entities

1. **Create the Model** in `app/Models` with `HasFactory` (always) and `SoftDeletes` (if needed)
2. **Create Supporting Files**: factory, migration, enum for status fields, seeder if useful
3. **Add Translations** in `lang/it/` and `lang/en/`
4. **Write Tests** in `tests/Feature/`

## Common Mistakes to Avoid

1. **Don't use `env()` outside config files** - Use the `config()` helper
2. **Don't create relationships without type hints** - Always add PHPDoc
3. **Don't use deprecated Tailwind utilities** - Use v4 syntax
4. **Don't skip translation keys** - All UI strings must be translatable
5. **Don't create pivot tables without models** - Use explicit pivot models for complex relationships
6. **Don't forget to eager load** - Prevent N+1 queries
7. **Don't use `dayOfWeek` but `dayOfWeekIso`** - The week starts on Monday
8. **Don't store prices as float** - Use integers in cents

## When you find a bug

1. Write a test that reproduces the bug
2. Fix the bug
3. Run the test to ensure it passes

## After Implementation

After every implementation, run `composer analyse` and fix any issues.
