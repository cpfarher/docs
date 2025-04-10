# Back Interview

## RESTFUL

## NodeJS / Express endpoints.
``` bash
npm init -y
npm install express
npm install body-parser

project-folder/
├── server.js
└── controllers/
    └── userController.js
```
``` js
server.js
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Routes for CRUD operations
app.post('/users', userController.createUser);
app.get('/users', userController.getUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUser);
app.patch('/users/:id', userController.patchUser);
app.delete('/users/:id', userController.deleteUser);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```
```js
let users = []; // In-memory "database" for this example
let nextId = 1; // Simple ID generator for user records

// Create a new user
exports.createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const newUser = {
    id: nextId++,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({ message: 'User created successfully', user: newUser });
};

// Get all users
exports.getUsers = (req, res) => {
  res.status(200).json(users);
};

// Get a user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

// Update a user by ID
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (name) user.name = name;
  if (email) user.email = email;

  res.status(200).json({ message: 'User updated successfully', user });
};

// PATCH - Partially update a user by ID
exports.patchUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body; // Allow partial updates on name and email only

  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (name) user.name = name; // Only update if 'name' is provided
  if (email) user.email = email; // Only update if 'email' is provided

  res.status(200).json({ message: 'User partially updated', user });
};
// Delete a user by ID
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(index, 1);

  res.status(200).json({ message: 'User deleted successfully' });
};

```
```bash
curl -X PATCH http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name": "Jane Smith"}'
```

## PUT POST and PATCH
- POST: The POST method is used to submit data to be processed by the resource identified by the URI. It can be used to create a new resource or append data to an existing resource. making the same POST request multiple times may result in different outcomes or create duplicate resources. When using POST, the request payload contains the data to be processed or appended. The server determines the location of the new resource and returns the appropriate response, which may include the URI of the newly created resource.
   
   - Create a new resource. Submitting a form, creating a user, sending a message.
   - multiple calls create multiple resources
   - `POST /users Body: { "name": "Alice" }
     `
* PUT: creating or replacing resources. The entire representation of the reosurce is sent in the request payload. If the resource already exists, it is replaced entirely with the new representation sent in the request.

   - Create or replace a resource entirely. Updating a full resource or creating a resource at a specific URI.
   - same request = same result
   - ```PUT /users/123 Body: { "name": "Alice", "age": 30 } --> replaces the entire user object at ID 123 ```


* PATCH: The PATCH method is used to partially update an existing resource. It applies modifications to the resource, rather than replacing it entirely. *PATCH to /users/1*. Leaving the unmodified parts unchanged. (partial updates). partially updating existing resources
   
   - Partially update an existing resource.
   - Updating part of a resource, like a single field.
   - ```PATCH /users/123 Body: { "age": 31 } --> only updates the `age` field```

| Method | Purpose              | Idempotent | Typical Use Case               |
|--------|----------------------|------------|--------------------------------|
| POST   | Create (new)         | ❌ No       | Creating a new resource        |
| PUT    | Replace (full update)| ✅ Yes      | Full update or create with ID  |
| PATCH  | Modify (partial)     | ✅ Yes      | Partial update of a resource   |


# DB relations
## 🔗 ORM Relationship Summary

| Relationship Type     | Description                                 | Foreign Key Location       | Example                                   |
|------------------------|---------------------------------------------|-----------------------------|--------------------------------------------|
| **belongsTo**          | Child → Parent                              | In the **child** model      | `Comment.belongsTo(User)`                  |
| **hasOne**             | Parent → One Child                          | In the **child** model      | `User.hasOne(Profile)`                     |
| **hasMany**            | Parent → Many Children                      | In the **child** model      | `User.hasMany(Post)`                       |
| **belongsToMany**      | Many-to-Many via a join/through table       | In the **join table**       | `User.belongsToMany(Role)` (via `UserRole`) |

---

## 🔄 Detailed Breakdown

#### 1. **One-to-One**
```js
User.hasOne(Profile);
Profile.belongsTo(User);
// Foreign key is in Profile
```


#### 2. **One-to-Many**
```
User.hasMany(Post);
Post.belongsTo(User);
// Foreign key is in Post
```

#### 3. **Many-to-Many**
```
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });
// Join table: UserRole (contains userId and roleId)
```


### PostgreSQL Indexes
| Index Type  | Supports Equality | Supports Range | Best Use Cases                          | Space Usage | Notes                        |
|-------------|-------------------|----------------|-----------------------------------------|-------------|------------------------------|
| **B-Tree**  | ✅ Yes            | ✅ Yes         | General-purpose queries. You need fast equality or range lookups. Sorting or ordering querie                 | Medium      | Default choice               |
| **Hash**    | ✅ Yes            | ❌ No          | Exact match only. eg. Find a user by email                        | Medium      | Use only with `=`            |
| **GIN**     | ✅ Yes            | ❌ No          | Arrays, JSONB, full-text search         | Higher      | Use with `@>`, `?`, `@@`     |
| **GiST**    | ✅ Yes            | ✅ Yes         | Geometric, ranges, proximity search     | Medium      | Supports complex types       |
| **SP-GiST** | ✅ Yes            | ✅ Yes         | IPs, hierarchical data, routing trees   | Low         | Good for sparse data         |
| **BRIN**    | ✅ Partial        | ✅ Yes         | Huge ordered tables (e.g., logs, events)| Very low    | Fast to build, small size    |

### Postgres JSONB
# PostgreSQL JSONB Manipulation Cheat Sheet

PostgreSQL provides extensive support for `jsonb`, which allows efficient storage and querying of JSON data. Below are common functions and operators for manipulating `jsonb` values.

---

## 📜 JSONB Data Types

- **jsonb**: Stores JSON data in a binary format, allowing efficient indexing and querying.

---

## 🔎 Common Operators

| Operator            | Description                                                        | Example                                                                 |
|---------------------|--------------------------------------------------------------------|-------------------------------------------------------------------------|
| `->`                | Get JSON object field by key (returns JSON)                        | `jsonb_data->'name'`                                                     |
| `->>`               | Get JSON object field by key as text                               | `jsonb_data->>'name'`                                                    |
| `#>>`               | Get JSON object field by path (returns text)                       | `jsonb_data#>>'{address, city}'`                                        |
| `@>`                | Check if the left JSON contains the right JSON (subset)            | `jsonb_data @> '{"name": "John"}'`                                       |
| `<@>`               | Check if the right JSON is contained by the left JSON (superset)   | `'{"name": "John"}' <@> jsonb_data`                                      |
| `?`                 | Check if the JSON object contains the specified key                | `jsonb_data ? 'name'`                                                    |
| `?|`                | Check if JSON object contains any of the specified keys            | `jsonb_data ?| array['name', 'age']`                                     |
| `?&`                | Check if JSON object contains all of the specified keys            | `jsonb_data ?& array['name', 'age']`                                     |
| `#>`                | Get JSON object field by path (returns JSON)                       | `jsonb_data#>'{address, city}'`                                          |
| `#>>`               | Get JSON object field by path (returns text)                       | `jsonb_data#>>'{address, city}'`                                         |

---
# PostgreSQL JOIN Types Cheat Sheet

| JOIN Type           | Returns                        | Matching Logic                                  | Use Case                                           |
|---------------------|--------------------------------|-------------------------------------------------|---------------------------------------------------|
| **INNER JOIN**      | Rows with matching data in both tables  | Matches based on `ON` condition                   | Use when you only want rows with matching data    |
| **LEFT JOIN**       | All rows from the left table, matching from the right | Matches where available; `NULL` if no match     | Use when you want all rows from the left table    |
| **RIGHT JOIN**      | All rows from the right table, matching from the left | Matches where available; `NULL` if no match     | Use when you want all rows from the right table   |
| **FULL JOIN**       | All rows from both tables      | Matches where available; `NULL` if no match     | Use when you want all rows from both tables       |
| **CROSS JOIN**      | Cartesian product of both tables | No condition, every combination of rows         | Use when you need every combination of rows       |
| **SELF JOIN**       | Rows related within the same table | Joins the table to itself                       | Use when comparing rows within the same table     |
| **NATURAL JOIN**    | Rows with matching column names | Matches automatically based on column names     | Use when column names are the same in both tables |


## 🛠️ JSONB Functions

| Function               | Description                                                             | Example                                                                 |
|------------------------|-------------------------------------------------------------------------|-------------------------------------------------------------------------|
| `jsonb_array_length()`  | Get the number of elements in a JSON array                              | `jsonb_array_length('[1, 2, 3]'::jsonb)`                               |
| `jsonb_each()`          | Expand JSON object into a set of key-value pairs                        | `SELECT * FROM jsonb_each('{"name": "John", "age": 30}'::jsonb)`        |
| `jsonb_each_text()`     | Expand JSON object into key-value pairs (text)                          | `SELECT * FROM jsonb_each_text('{"name": "John", "age": 30}'::jsonb)`   |
| `jsonb_object_keys()`   | Get all keys of a JSON object                                           | `SELECT jsonb_object_keys('{"name": "John", "age": 30}'::jsonb)`        |
| `jsonb_set()`           | Update or add a JSON element at a given path                            | `jsonb_set('{"name": "John", "age": 30}'::jsonb, '{name}', '"Jane"')`   |
| `jsonb_insert()`        | Insert or update a value at a given path in a JSON object               | `jsonb_insert('{"name": "John"}', '{age}', '30')`                       |
| `jsonb_array_elements()`| Expand a JSON array into a set of JSON values                           | `SELECT * FROM jsonb_array_elements('[1, 2, 3]'::jsonb)`               |
| `jsonb_array_elements_text()` | Expand a JSON array into a set of text values                     | `SELECT * FROM jsonb_array_elements_text('[1, "text"]'::jsonb)`        |
| `jsonb_object()`        | Create a JSON object from a set of key-value pairs                      | `SELECT jsonb_object(array['name', 'age'], array['John', '30'])`        |
| `jsonb_pretty()`        | Pretty-print a JSON object as text                                     | `SELECT jsonb_pretty('{"name": "John", "age": 30}'::jsonb)`             |

---

## 🧩 JSONB Example Queries

### 1. Retrieve a JSON Field by Key

```sql
SELECT jsonb_data->'name' FROM users;
```
### 2. Check if JSON Contains a Specific Key

```sql
SELECT * FROM users WHERE jsonb_data ? 'name';
```
### 3. Check if JSON Contains All Keys
```sql
SELECT * FROM users WHERE jsonb_data ?& array['name', 'age'];
```
### 4. Update or Add a Key in JSONB
```sql
UPDATE users SET jsonb_data = jsonb_set(jsonb_data, '{name}', '"Jane"') WHERE id = 1;
```
### 5. Insert a New Key-Value Pair in JSONB

```sql
UPDATE users SET jsonb_data = jsonb_set(jsonb_data, '{name}', '"Jane"') WHERE id = 1;
```
### 6.  Expand a JSON Object into Key-Value Pairs

```sql
SELECT * FROM jsonb_each('{"name": "John", "age": 30}'::jsonb);
```
### 7. Expand a JSON Array into Rows
```sql
SELECT * FROM jsonb_array_elements('[1, 2, 3]'::jsonb);
```
### 8. Get All Keys from a JSON Object

```sql
SELECT jsonb_object_keys('{"name": "John", "age": 30}'::jsonb);
```
### 9. Create a JSON Object from Arrays

```sql
SELECT jsonb_object(array['name', 'age'], array['John', '30']);
```

