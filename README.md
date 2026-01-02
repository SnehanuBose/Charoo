# 🚀 Charoo — Real‑Time Group Chat 🚀

**Charoo** is a sleek, lightweight, real‑time group chat application built with modern technologies.  
It demonstrates how to create an **end‑to‑end real‑time system** using **Spring Boot**, **WebSockets (STOMP)**, and a minimal **HTML/CSS/JS frontend**.

Designed as a beginner‑friendly full‑stack project, Charoo is perfect for learning how to integrate real‑time communication with a server backbone — no heavy front‑end frameworks required!

---

## 💡 Key Features

✨ **Real‑Time Messaging** — Instant message updates using STOMP over WebSockets  
👥 **Public Group Chat** — Multiple users can chat together in one shared room  
🔔 **Join/Leave Notifications** — Seamless user presence updates  
🧠 **Lightweight & Simple** — No database or authentication needed — great for demos  
📱 **Responsive UI** — Functional UI that looks good on desktop & mobile  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Java 17 |
| Framework | Spring Boot |
| Messaging | WebSockets + STOMP |
| Frontend | HTML, CSS, JavaScript |
| Libraries | SockJS, stomp.js |

---

## 🔧 Architecture Overview

Charoo leverages Spring Boot’s WebSocket support to create a real‑time messaging backbone:

- A WebSocket endpoint (`/ws`) enables STOMP connections.
- Clients send chat messages to `/app/chat/sendMessage`.
- Messages are broadcast to all connected users via a topic (`/topic/public`).
- User connect/disconnect events are handled and broadcasted to update presence.

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/SnehanuBose/Charoo.git
cd Charoo
```

### Run the Application

```bash
mvn spring-boot:run
```

### Open in Browser

```
http://localhost:8080
```

Open multiple tabs to chat in real time.

---

## 🛠 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

Happy Coding! 🚀
