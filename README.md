# MovieNest 📚

**MovieNest** is a Film library management system designed for university to streamline movie borrowing, user management, and administrative tasks. Built with cutting-edge technologies, MovieNest offers a seamless experience for both administrators and users.

---

## Features

### Admin Panel

- **Movies Management**:
  - Create a Movie
  - List all available Movies.
  - Edit or remove movies from the library.
- **Users Management**: View and manage all registered users.
- **Borrow Requests**: Handle movie borrowing requests efficiently.
- **Account Requests**: Approve or reject new user registrations. (**In Progress**)
- **Dashboard**: Quick access to all sections. (**In Progress**)

### User Panel

- **Profile Page**:
  - View borrowed movies.
  - View personal information.
  - Track borrowed movies and due dates.
  - Update personal information. (**Soon**)
- **Home Page**:
  - List all movies
  - movies with detailed information.
  - Search for movies by title
  - Pagination for movies (**Soon**)
  - Search for movies by author, genre (**Soon**)
  - Notification (**Soon**)

---

## Tech Stack 🛠️

- **Frontend**:
  - Next.js 15
  - TailwindCSS
  - shadcn/ui (for beautiful, reusable components)
- **Backend**:
  - Next.js API Routes
  - NextAuth (authentication)
- **Database**:
  - PostgreSQL (hosted on Neon)
  - Drizzle ORM (type-safe database interactions)
- **Media Storage**:
  - ImageKit.io (for uploading and managing images/videos)
- **Caching & Real-Time Data**:
  - Upstash Redis (caching and real-time workflows)
- **Email Service**:
  - Resend (for sending emails, integrated with Upstash workflows)

---

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- [PostgreSQL](https://console.neon.tech/app/projects) database (Neon recommended)
- [Upstash](https://upstash.com/) account
- ImageKit.io account
- [Resend](https://resend.com/emails) API key




## Acknowledgments 🙏

- [Next.js](https://nextjs.org/) for the powerful React framework.  
- [TailwindCSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) for the stunning UI components.  
- [Neon](https://neon.tech/) for the serverless PostgreSQL hosting.  
- [Upstash](https://upstash.com/) for Redis caching and real-time workflows.  
- [Resend](https://resend.com/) for seamless email delivery. 
