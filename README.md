# Practice with Next.js 🚀

This repository contains a practice project designed to help you learn and explore the fundamentals of [Next.js](https://nextjs.org/), a popular React framework for building server-rendered and statically-generated web applications.

## Features ✨
- **Dynamic Routing**: Learn how Next.js handles routing with file-based structure.
- **Data Fetching**: Explore `getStaticProps`, `getServerSideProps`, and `getStaticPaths`.
- **API Routes**: Create backend APIs within a Next.js project.
- **Static and Server Rendering**: Understand when to use SSR (Server-Side Rendering) and SSG (Static Site Generation).
- **Styling**: Use CSS Modules and Tailwind CSS for styling components.
- **Integration with Axios**: Learn how to fetch data from external APIs.
- **SweetAlert Integration**: Practice creating interactive alerts with SweetAlert.

---

## Getting Started 🛠️

### Prerequisites
Make sure you have the following installed:
- **Node.js**: >= 14.x
- **npm** or **yarn**

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/MoRiksa/next-practice.git
   cd next-practice
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## Project Structure 🗂️

```
.
├── components/       # Reusable UI components
├── pages/            # Next.js pages (routes)
│   ├── api/          # API Routes
│   ├── index.js      # Homepage
│   ├── menu/         # Dynamic routes for menus
├── public/           # Static assets (images, icons, etc.)
├── styles/           # Global and modular CSS files
├── utils/            # Helper functions
├── .env.local        # Environment variables (optional)
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation
```

---

## Available Scripts 📜

- `npm run dev` – Start the development server.
- `npm run build` – Build the project for production.
- `npm start` – Start the production server.
- `npm run lint` – Run the linter to check for code quality issues.

---

## Learning Objectives 🎯

1. **Understand Routing**:
   - Static and dynamic routing with Next.js file structure.
2. **Data Fetching**:
   - Fetch data from an external API using `axios`.
   - Understand the difference between client-side, server-side, and static data fetching.
3. **Building APIs**:
   - Use API routes for server-side logic directly in your Next.js app.
4. **Component-Based Design**:
   - Create reusable components and manage state using React hooks.
5. **Styling**:
   - Apply global styles and scoped styles using CSS Modules or Tailwind CSS.

---

## Dependencies 📦

- **Next.js**: Framework for server-rendered React apps.
- **React**: JavaScript library for building user interfaces.
- **Axios**: For HTTP requests.
- **Tailwind CSS**: Utility-first CSS framework.
- **SweetAlert2**: Beautiful interactive alerts.

---

## Resources 📚

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [SweetAlert2 Documentation](https://sweetalert2.github.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## Contribution 🤝

Feel free to fork this repository, submit issues, or create pull requests! Contributions are always welcome.

---

## License 📝

This project is open-source and available under the [MIT License](LICENSE).

---

Happy Coding! 💻 🎉
