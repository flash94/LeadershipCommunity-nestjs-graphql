# Leadership Blog - NestJS GraphQL

This is a simple **blogging platform** built using **NestJS**, **GraphQL**, and **PostgreSQL**. It allows users to create, read, update, and delete (CRUD) posts and comments, with robust authentication and authorization mechanisms.

---

## Features

### **User Management**

- Users can register, log in, and receive JWT tokens for authentication.

### **Post Management**

- Users can create, update, and delete their posts.
- Only authenticated users can perform write operations.
- Posts include title, content, and a reference to the author.

### **Comment Management**

- Users can add comments to posts.
- Users can update or delete their comments.
- Comments are associated with posts and authors.

### **Authorization**

- Only the owner of a post/comment can update or delete it.
- Middleware ensures the current user ID is attached to all operations.

### **GraphQL API**

- A comprehensive GraphQL schema for interacting with posts, comments, and users.
- Relationships between users, posts, and comments are fully queryable.

---

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- PostgreSQL

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/<your-username>/leadership-blog-nestjs-graphql.git
   cd leadership-blog-nestjs-graphql

   ```

2. **Install Dependencies**

```bash
 npm install
```

3. **Set Up Environment Variables**  
   Create a .env file in the project root with the following:

```bash
 DB_HOST=localhost
 DB_PORT=5432
 DB_USERNAME=your_db_username
 DB_PASSWORD=your_db_password
 DB_NAME=leadership_blog
 JWT_SECRET=your_jwt_secret

```

4. **Start the Application**

```bash
 npm run start:dev
```
