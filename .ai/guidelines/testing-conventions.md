### Pest Tests

Use Pest for testing:

```php
use App\Models\User;

use function Pest\Laravel\actingAs;

it('shows the dashboard to a logged in user', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->get(route('dashboard'))
        ->assertSuccessful();
});
```

- Feature tests: `tests/Feature/{Area}/{Name}Test.php`
- Use model factories and their states, never build test data by hand.
