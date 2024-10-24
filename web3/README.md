# Web3 Freelance Platform

This is a [Next.js](https://nextjs.org) project designed to connect freelancers with clients, leveraging blockchain technology for secure transactions. The platform allows users to find jobs, hire freelancers, and manage profiles with ease.

## Features

- **User Authentication**: Sign up and log in using GitHub authentication.
- **Profile Management**: Users can create and update their profiles, including skills and resume.
- **Job Listings**: Browse and search for jobs based on skills.
- **Freelancer Directory**: Find freelancers by skills and view their profiles.
- **Chat System**: Real-time messaging between users.
- **Blockchain Integration**: Secure transactions using smart contracts on the Polygon network.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Firebase account for database and authentication.
- Polygon network setup for blockchain transactions.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/web3-freelance-platform.git
   cd web3-freelance-platform
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and add your Firebase and Polygon network credentials. Refer to `sample.env` for the required variables.

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- **`app/`**: Contains the main application components and pages.
  - **`components/`**: Reusable UI components like Navbar, Footer, and InfoCard.
  - **`[username]/chat/`**: Chat functionality for user communication.
  - **`freelancers/`**: Pages and components related to freelancer listings.
  - **`jobs/`**: Job listing and search functionality.
  - **`profile/`**: User profile management.
  - **`signup/`** and **`login/`**: Authentication pages.

- **`public/`**: Static assets like images.

- **`styles/`**: Global styles and Tailwind CSS configuration.

- **`firebase/`**: Firebase configuration and utility functions.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Firebase**: Backend services for authentication and real-time database.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Recoil**: State management library for React.
- **Polygon**: Blockchain network for secure transactions.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact [your-email@example.com](mailto:your-email@example.com).
