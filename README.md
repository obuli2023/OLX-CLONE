# OLX Clone 🛒

This is a full-stack OLX clone project built with:
- **Backend**: ASP.NET Core 8 + MongoDB
- **Frontend**: React JS 
- **Database**: MongoDB

# 📝 Description
- Full-stack OLX clone application with a React frontend and ASP.NET Core backend. Supports JWT authentication, MongoDB integration, and product listings.

---

## ⚙️ Backend Setup

### Prerequisites:
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Steps:
1. Navigate to backend:
    ```bash
    cd Backend
    ```

2. Create a `secrets.json` or use [User Secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets) (recommended):

    ```bash
    dotnet user-secrets init
    dotnet user-secrets set "Jwt:Secret" "your_jwt_secret"
    dotnet user-secrets set "ConnectionStrings:MongoDb" "your_mongodb_connection_string"
    ```

3. Run the backend:
    ```bash
    dotnet run
    ```

4. Swagger API will be available at:
    ```
    https://localhost:7048/swagger
    ```

---

## 💻 Frontend Setup

Example for React:

```bash
cd Frontend
npm install
npm start
```
## 📌 Project Highlights
- 🔐 **Authentication**: JWT-based secure login & registration.
- 📦 **MongoDB Integration**: Stores user and product data.
- 🧭 **Swagger Docs**: Interactive API documentation at `/swagger`.
- 🎨 **Frontend**: Built with React

# 🔐 Security
❗ Make sure to never commit secrets like MongoDB connection strings or JWT keys. Use dotnet user-secrets or environment variables in production.

# 🙋‍♂️Author
Created by Obuli 🚀
