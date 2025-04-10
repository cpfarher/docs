# Back Interview

## RESTFUL

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
| **B-Tree**  | ✅ Yes            | ✅ Yes         | General-purpose queries                 | Medium      | Default choice               |
| **Hash**    | ✅ Yes            | ❌ No          | Exact match only                        | Medium      | Use only with `=`            |
| **GIN**     | ✅ Yes            | ❌ No          | Arrays, JSONB, full-text search         | Higher      | Use with `@>`, `?`, `@@`     |
| **GiST**    | ✅ Yes            | ✅ Yes         | Geometric, ranges, proximity search     | Medium      | Supports complex types       |
| **SP-GiST** | ✅ Yes            | ✅ Yes         | IPs, hierarchical data, routing trees   | Low         | Good for sparse data         |
| **BRIN**    | ✅ Partial        | ✅ Yes         | Huge ordered tables (e.g., logs, events)| Very low    | Fast to build, small size    |
