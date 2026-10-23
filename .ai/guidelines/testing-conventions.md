### Pest Tests

Use Pest for testing:

```php
use function Pest\Laravel\get;

it('shows the home page', function () {
    get(route('home'))
        ->assertSuccessful();
});
```

- Feature tests: `tests/Feature/{Area}/{Name}Test.php`
- Use model factories and their states, never build test data by hand.
