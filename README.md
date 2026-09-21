# Hacker News Client

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/corianderstudios/hacker-news-client/tree/main)

A simple and modern web client for browsing Hacker News. This application allows users to view the latest stories, questions, jobs, and HN presentations posts in a clean, user-friendly interface. It features a load more button for more ruser control.

Built with React, Vite, TanStack Query, and styled with Tailwind CSS.

## Features

- **Browse Categories**: Easily navigate between different Hacker News sections:
  - New Stories
  - Ask HN
  - Show HN
  - Jobs
- **Infinite Scrolling**: A "Load More" button fetches and displays more posts as you scroll, providing a smooth browsing experience.
- **Efficient Data Fetching**: Utilizes TanStack Query (React Query) for robust data fetching, caching, and state management.
- **Clean UI**: A minimalist design built with Tailwind CSS for a responsive and readable layout.
- **Modern Tech Stack**: Developed using the latest versions of React, Vite, and React Router for optimal performance.

## Tech Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/corianderstudios/hacker-news-client.git
    ```

2.  **Navigate to the project directory:**

    ```sh
    cd hacker-news-client
    ```

3.  **Install dependencies:**
    ```sh
    yarn add
    ```

### Running the Application

To start the development server, run the following command. The application will be available at `http://localhost:5173`.

```sh
yarn run dev
```

## Available Scripts

In the project directory, you can run:

- `yarn run dev`: Runs the app in development mode with hot-reloading.
- `yarn run build`: Builds the app for production to the `dist` folder.
- `yarn run lint`: Lints the project files using ESLint.
- `yarn run preview`: Serves the production build locally to preview it.
