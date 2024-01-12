
# Todo Application

A streamlined and efficient Todo application designed to help you keep track of your daily tasks with ease. It offers intuitive controls for adding, updating, marking completion, and deleting todos.

## Features

- **Create Todos**: Effortlessly add new tasks to your todo list.
- **Update Todos**: Edit the details of your tasks or mark them as complete.
- **Complete Todos**: Visually track your progress by marking tasks as done.
- **Delete Todos**: Remove completed or unwanted tasks from the list.

## Upcoming Features

- **User Accounts**: Personalized todo lists with secure login and signup functionality.
- **Authentication**: Robust user authentication to ensure data privacy and security.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shiladitya-mukerji-22/Todo-App.git
2. Navigate to the project directory:
   ```bash
   cd 'Todo App'
3. Install NPM packages:
   ```bash 
   npm install
4. Start the application:
   ```bash
   npm run start:frontend  // for react
   npm run start:backend  // for node
Visit `http://localhost:3000` in your browser to view the application.


## Built With

-   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
-   Axios - Promise-based HTTP client for the browser and Node.js.
-   Node.js - JavaScript runtime built on Chrome's V8 JavaScript engine.
-   [MongoDB](https://www.mongodb.com/) - Document-based database used for storing application data.storing application data.

## MongoDB Setup

This application uses MongoDB for data storage. Here's how to set it up:

### Prerequisites

- MongoDB installed on your local machine or access to a MongoDB database (you can create an account with MongoDB Atlas).

### Configuration

1. Ensure that MongoDB is running on your local machine. If you're using a remote database, ensure you have the URI.

2. (Optional) Create a `.env` file in the root directory of the project to store your environment variables.

   ```plaintext
   MONGODB_URI=your_mongodb_uri_here
   DB_NAME=todo-app
   COLLECTION_NAME=todos
## Contributing

Contributions are what make the open-source community such a vibrant place to learn, inspire, and create. Any contributions you make are **highly appreciated**.

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
## Contact

-   X - https://twitter.com/shiladityam2
-   Project Link: https://github.com/shiladitya-mukerji-22/Todo-App