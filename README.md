# PlantNet

PlantNet is an e-commerce platform dedicated to plants. It offers an intuitive user interface for both customers and sellers. Customers can view plant details, place orders, and track their purchases. Sellers can manage their plant inventory, add new plants to the catalog, and process orders through a specialized dashboard.

The application is built using **React** for the frontend, with a state management system based on **React Query** and an intuitive routing system using **React Router**. The app is styled using **Tailwind CSS** and powered by **Vite** for fast development and build processes.

---

## Main Technologies Used

- **React**: A JavaScript library for building user interfaces, providing fast and responsive views.
- **React Router**: Used for navigating between different pages in the app.
- **React Query**: A powerful data-fetching library that helps with managing asynchronous server data, caching, and background syncing.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **Vite**: A fast build tool and development server for modern web projects, providing fast refresh and hot-reloading.
- **Firebase**: For user authentication, real-time data, and more backend functionalities (if integrated).
- **Stripe**: For handling payment processing on the platform.
- **Headless UI**: A set of completely unstyled, fully accessible UI components to create custom-designed components in React.
- **React Date Range**: A library for selecting date ranges in the UI, used for handling orders and inventory management.

---

## Features

### **For Customers**

- **Browse Plants**: Customers can explore a catalog of plants with details like images, descriptions, and prices.
- **Plant Details Page**: Users can view more detailed information about each plant by clicking on it.
- **Place Orders**: Customers can add plants to their shopping cart and complete orders.
- **Order History**: Customers can track their orders from purchase to delivery.

### **For Sellers**

- **Add Plants**: Sellers can add new plants to the catalog, including uploading images and setting prices.
- **Manage Inventory**: Sellers can manage their plant inventory, including adding, updating, and removing plants.
- **Order Management**: Sellers can view and manage customer orders, including shipping status and other details.
- **Dashboard**: A comprehensive dashboard to view order statistics and manage the plant catalog.

### **For Admins**

- **Manage Users**: Admins can manage users on the platform, including sellers and customers, as well as access detailed user statistics.

### **General Features**

- **User Authentication**: Secure login/signup system for both customers and sellers using Firebase Authentication.
- **Responsive Design**: The website is fully responsive and optimized for mobile, tablet, and desktop devices.
- **Toasts & Notifications**: Real-time notifications using **react-hot-toast** for smooth user interactions.

---

## Dependencies

Here’s a list of the major dependencies used in the project:

### **Dependencies**

- `@headlessui/react`: UI components with no default styling, allowing easy customization.
- `@stripe/react-stripe-js`, `@stripe/stripe-js`: Integration with Stripe for payment processing.
- `@tanstack/react-query`: Data-fetching and state management library for React.
- `axios`: Promise-based HTTP client for making API requests.
- `daisyui`: A component library built on top of Tailwind CSS for easily styled UI components.
- `firebase`: Firebase SDK for authentication and backend services.
- `prop-types`: Runtime type checking for React props.
- `react`: Core React library.
- `react-dom`: React DOM bindings for rendering.
- `react-helmet-async`: Library for managing document head, adding metadata to the page.
- `react-hot-toast`: For toast notifications and alerts.
- `react-icons`: A library for using icons in React.
- `react-router-dom`: A declarative routing library for React.
- `react-spinners`: A collection of loading spinners for React.
- `recharts`: Charting library for displaying statistics and data visualization.

### **DevDependencies**

- `@eslint/js`: JavaScript linting configuration for ESLint.
- `@types/react`, `@types/react-dom`: TypeScript typings for React.
- `@vitejs/plugin-react`: Vite plugin for React support.
- `autoprefixer`, `postcss`, `tailwindcss`: PostCSS and Tailwind CSS utilities for CSS processing and styling.
- `eslint`: Linting tool for JavaScript/React code quality.
- `eslint-plugin-react`, `eslint-plugin-react-hooks`: Plugins for linting React-specific code.
- `vite`: Development server and build tool for fast, optimized frontend applications.

---

### Admin Access

**User**: admin@gmail.com
**Password**: abc123

### Seller Access

**User**: seller@gmail.com
**Password**: abc123

**live link**: https://plantnet-de0a5.web.app/
