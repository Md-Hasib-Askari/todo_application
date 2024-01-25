# Todo Application
### Features:
1. Todo List
   1. CRUD
2. User
   1. User Authentication
   2. JWT Token

### Schema:
* Todo  
```
{
    _id: string,  
    title: string,  
    status: boolean,
    created_at: date,
    updated_at: date
}
```
* User
```
{
    _id: string,
    email: string,
    password: string,
    created_at: date,
    updated_at: date
}
```
   