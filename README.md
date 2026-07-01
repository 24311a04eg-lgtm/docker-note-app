# 💬 Message App

![Node.js](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge\&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-black?style=for-the-badge\&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge\&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge\&logo=docker)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

A simple full-stack message application built with **Node.js**, **Express**, and **PostgreSQL**, fully containerized using **Docker** and **Docker Compose**. Users can send messages through a web interface, and the messages are stored and retrieved from a PostgreSQL database.

---

## ✨ Features

* 📝 Create and save messages
* 📖 View all stored messages
* 🗄️ PostgreSQL database integration
* 🐳 Docker & Docker Compose support
* ❤️ Health check endpoint (`/health`)
* 🔄 Automatic database initialization
* 🔒 Parameterized SQL queries to prevent SQL injection
* 🛡️ HTML escaping to protect against XSS attacks
* 👤 Runs as a non-root Docker user

---

## 🛠 Tech Stack

| Technology            | Purpose                       |
| --------------------- | ----------------------------- |
| Node.js               | Backend Runtime               |
| Express.js            | REST API                      |
| PostgreSQL            | Database                      |
| Docker                | Containerization              |
| Docker Compose        | Multi-container orchestration |
| HTML, CSS, JavaScript | Frontend                      |

---

## ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=messagedb
PORT=3000
```

---

## 🚀 Getting Started

Build and start the application:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d
```

The application will be available at:

```
http://localhost:3000
```

Health check endpoint:

```
http://localhost:3000/health
```

---

## 📡 API Endpoints

### Get all messages

```http
GET /api/messages
```

Returns all messages ordered by newest first.

### Create a new message

```http
POST /api/messages
```

**Request Body**

```json
{
  "text": "Hello World!"
}
```

---

## 🐳 Docker

The project consists of two containers:

### App

* Node.js + Express application
* Exposes port **3000**
* Waits for the database before starting
* Includes a health check

### Database

* PostgreSQL 15
* Automatically creates the `messagedb` database
* Stores data using a persistent Docker volume

---

## 📦 Useful Commands

Start containers

```bash
docker compose up
```

Rebuild the project

```bash
docker compose up --build
```

Run in the background

```bash
docker compose up -d
```

View logs

```bash
docker compose logs -f
```

Stop containers

```bash
docker compose down
```

Remove containers and database volume

```bash
docker compose down -v
```

---

## 🔒 Security

* Parameterized SQL queries
* HTML escaping before rendering user input
* Non-root Docker container
* Health checks for both the application and database

---

## 🚀 Future Improvements

* User authentication
* Edit/Delete messages
* Search functionality
* Pagination
* Real-time updates using WebSockets

---

## 📄 License

This project is available under the MIT License.
