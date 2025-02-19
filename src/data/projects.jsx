const projects = [
  {
    title: "ASU CourseFinder",
    description: "ASU CourseFinder is a natural language course query web application that simplifies searching for ASU university courses using Elasticsearch, Flask, and React.js. It enables users to search for courses using conversational queries (e.g., “Find graduate courses with 3 credits in CSE”) and provides real-time results on schedules, seat availability, prerequisites, and more. The backend, powered by Flask and Python, processes queries and interacts with Elasticsearch, while the frontend, built with React.js, ensures a seamless user experience. The system supports fuzzy matching for handling typos and partial matches, enhancing search accuracy. Users can set up the application by configuring Elasticsearch, Node.js, and OpenAI API integration, making it a robust and scalable course search tool.",
    github: "https://github.com/royston16/ASU-Natural-Language-Course-Query"
  },
  {
    title: "Tic-Tac-Toe",
    description: "This Android Tic-Tac-Toe game, developed using Kotlin, offers single-player, local multiplayer, and Bluetooth-enabled multiplayer modes with a minimalist UI for an intuitive user experience. The game integrates Bluetooth APIs for wireless two-player gameplay and utilizes SQLite to track game statistics, ensuring persistent data storage. AI difficulty adjustment enhances the single-player experience, while Bluetooth connectivity allows seamless remote multiplayer interactions. The modular architecture includes distinct activities for game logic, Bluetooth management, and statistics tracking, ensuring maintainability and smooth gameplay. The project showcases real-time multiplayer functionality, local data persistence, and optimized UI design, making it a strong demonstration of mobile game development with Kotlin.",
    github: "https://github.com/royston16/android-tic-tac-toe"
  },
  {
    title: "Nomadic Health Solutions",
    description: "Nomadic Health Solutions is a distributed transaction management system designed for healthcare information systems, ensuring ACID compliance, scalability, and fault tolerance. The project leverages PostgreSQL with horizontal sharding for optimized query performance, Two-Phase Commit (2PC) for distributed transactions, and automated failover mechanisms for high availability. The system is built using Python and Django, with Docker for containerization and pgAdmin for database management. Security is enforced through Role-Based Access Control (RBAC), SSL/TLS encryption, and column-level encryption. To enhance performance monitoring and observability, Grafana and Prometheus are integrated, providing real-time insights into database operations, system health, and query performance.",
    github: "https://github.com/royston16"
  }
  ,
  {
    title: "Health Monitoring Context Monitor",
    description: "This context-aware Android application, developed in Kotlin, monitors heart rate and respiratory rate using simulated sensor data and logs symptoms for health tracking. Built for an Android emulator, it processes pre-recorded videos for heart rate detection and CSV-based accelerometer data for respiratory rate calculations. The application features a custom SQLite database for storing vital sign data alongside user-reported symptoms. The UI is designed for simplicity, ensuring easy interaction with health monitoring tools. Future improvements include real-time sensor integration, cloud-based data streaming (e.g., Firebase/AWS), and predictive analysis using machine learning. This project demonstrates Android development, data handling, and health monitoring system design with potential for real-world deployment.",
    github: "https://github.com/royston16"
  }
];

export default projects;
  