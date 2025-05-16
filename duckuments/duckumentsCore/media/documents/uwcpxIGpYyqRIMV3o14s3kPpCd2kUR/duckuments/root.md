# `root.py`

This file is part of the **duckuments-Core** project, which focuses on generating new project documentation. The `root.py` file contains a simple function designed to greet a user by their name.

## Functions

### `say_hello(name)`

The `say_hello` function is intended to print a greeting message to the console. It takes a single argument, `name`, which it incorporates into the greeting.

#### Parameters
- **name** (`str`): The name of the person you want to greet. This should be a string.

#### Functionality
The function constructs a greeting message using the provided `name` and prints it out. However, there is a typo (`pritn`) in the code that needs to be corrected to `print` for the function to work as intended.

#### Example
Here's how you might use the `say_hello` function:

```python
say_hello("Alice")
```

This call would output:

```
Hello Alice
```

#### Note
There is a minor issue in the function implementation:

- **Typographical Error**: The function currently uses `pritn` instead of `print`. This needs to be corrected for the function to execute without errors.