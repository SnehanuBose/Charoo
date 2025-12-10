# Charoo

Charoo is a simple real‑time group chat application built with **Spring Boot**, **WebSockets**, and a minimal **HTML/JS** frontend.

It is designed as a small but complete example of building a real‑time feature end‑to‑end (backend + frontend) using STOMP over WebSocket.

---

## Features

- Join a public chat room with a username  
- Real‑time messaging over WebSocket/STOMP  
- Join / leave notifications  
- Simple, responsive UI (no frontend framework)  
- No database or login (lightweight, demo‑friendly)

---

## Tech Stack

- **Backend:** Java 17, Spring Boot (Web MVC + WebSocket), Lombok  
- **Frontend:** HTML, CSS, vanilla JavaScript, SockJS, stomp.js  

---

## Architecture (Quick Overview)

- WebSocket endpoint exposed at `/ws` via Spring's `@EnableWebSocketMessageBroker` configuration.  
- Clients send STOMP messages to `/app/chat/*`, handled by `ChatController` methods annotated with `@MessageMapping`.  
- An in‑memory simple broker broadcasts messages to `/topic/public`, where all clients are subscribed.  
- A `WebSocketEventListener` listens for disconnect events and publishes `LEAVE` messages so users see when someone leaves.

---

## Getting Started

### 1. Clone

```bash
git clone <your-repo-url>
cd charoo
```

### 2. Run the app

Using the Maven wrapper (included in the project):

```bash
# Linux / macOS
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

Or with a global Maven installation:

```bash
mvn spring-boot:run
```

Then open:

```text
http://localhost:8080
```

Open it in multiple tabs/browsers to chat between users.

---

## Project Structure

```text
src/main/java/com/example/charoo
 ├─ CharooApplication.java        # Spring Boot entry
 ├─ chat/                         # Chat controller + message model
 └─ config/                       # WebSocket/STOMP configuration & events
src/main/resources/static         # HTML, CSS, JS frontend
```

---

## What This Project Demonstrates

- Setting up WebSockets and STOMP messaging in a Spring Boot application.  
- Building a small real‑time feature with a clean separation between backend and frontend.  
- Using a simple in‑memory broker to broadcast messages to all connected clients.
