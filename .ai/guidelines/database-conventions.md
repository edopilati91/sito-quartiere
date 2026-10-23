### Database Structure

**Price fields:**
Every price field should be stored as an integer in the smallest unit (e.g., cents instead of euros).

**Enum fields:**
Use `enum` instead of `string` for enum fields:
```php
$table->enum('status', EventStatus::values());
```

**Modifying columns:**
When modifying a column, redeclare all of its attributes, otherwise they are dropped.
