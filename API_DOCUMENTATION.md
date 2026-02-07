# Spotify Clone API Documentation

This document lists all the available API endpoints for the Spotify Clone backend.

**Base URL:** `https://your-koyeb-app-url.koyeb.app` (or `http://localhost:5000` locally)

---

## 🔐 Authentication

Handles user synchronization with the database after Clerk authentication.

| Method | Endpoint        | Description                                  | Auth Required |
| :----- | :-------------- | :------------------------------------------- | :------------ |
| `POST` | `/authCallback` | Syncs Clerk user data to the local database. | No            |

---

## 🎵 Songs

Endpoints for fetching song data.

| Method | Endpoint                  | Description                            | Auth Required |
| :----- | :------------------------ | :------------------------------------- | :------------ |
| `GET`  | `/api/songs`              | Get all songs (Admin only).            | Yes (Admin)   |
| `GET`  | `/api/songs/featured`     | Get a list of featured songs.          | No            |
| `GET`  | `/api/songs/trending`     | Get a list of trending songs.          | No            |
| `GET`  | `/api/songs/made-for-you` | Get personalized song recommendations. | No            |
| `GET`  | `/api/songs/:songId`      | Get details for a specific song.       | No            |

---

## 💿 Albums

Endpoints for fetching album data.

| Method | Endpoint              | Description                       | Auth Required |
| :----- | :-------------------- | :-------------------------------- | :------------ |
| `GET`  | `/api/albums`         | Get all albums.                   | No            |
| `GET`  | `/api/album/:albumId` | Get details for a specific album. | No            |

---

## 👥 Users & Chat

Endpoints for user management and real-time messaging.

| Method | Endpoint             | Description                            | Auth Required |
| :----- | :------------------- | :------------------------------------- | :------------ |
| `GET`  | `/users`             | Get a list of all users.               | No            |
| `GET`  | `/user/messages/:id` | Get chat history with a specific user. | Yes           |

---

## 🛠️ Admin Operations

Restricted endpoints for managing content.

| Method   | Endpoint                    | Description                                             | Auth Required |
| :------- | :-------------------------- | :------------------------------------------------------ | :------------ |
| `GET`    | `/api/admin/checkAdmin`     | Verify if the current user is an admin.                 | Yes (Admin)   |
| `POST`   | `/api/admin/songs`          | Upload and create a new song.                           | Yes (Admin)   |
| `DELETE` | `/api/admin/songs/:songId`  | Delete a specific song.                                 | Yes (Admin)   |
| `POST`   | `/api/admin/album`          | Create a new album.                                     | Yes (Admin)   |
| `DELETE` | `/api/admin/album/:albumId` | Delete a specific album.                                | Yes (Admin)   |
| `GET`    | `/stats`                    | Get application statistics (total songs, albums, etc.). | Yes (Admin)   |

---

## 🔌 WebSockets (Socket.io)

The server supports real-time communication on the base URL.

**Events:**

- `send_message`: Send a message to another user.
- `receive_message`: Listen for incoming messages.
- `update_activity`: Broadcast your current playback/online status.
- `user_activity`: Listen for status updates from other users.
