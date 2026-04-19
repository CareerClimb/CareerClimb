# CareerClimb

This project is a comprehensive job-search platform that finds opportunities across LinkedIn, Glassdoor, Indeed, and Monster. It utilizes a MongoDB database to store all job-related information, AWS EC2 and Cloudwatch to provide up-to-date job posts, and a ReactJS frontend for intuitive user interaction.

## Visit The Site

Feel free to check out the [project here!](https://www.careerclimb.net/home/)

<img width="1905" height="911" alt="image" src="https://github.com/user-attachments/assets/e01a23cc-239d-41f7-aa4b-165e49b3f845" />



## Features

- **MongoDB Database:** Stores detailed information about job postings, including dates, salary, location, requirements, and more.
- **NodeJS Backend:** Provides a secure user authentication service to manage user preferences efficiently. The backend is hosted on AWS.
- **ReactJS Frontend:** A user-friendly interface for searching, filtering, saving, and tracking applications. The frontend is hosted on an Amazon EC2 Instance and uses nginx caching for fast data retrieval.

## Installation

### Backend Setup

1. Clone this repository.
2. Open the `backend` directory in your preferred IDE.
3. Configure the `config.toml` file in the `backend` directory with your MongoDB database credentials.
4. Run `npm index.js` to start the backend service.

### Frontend Setup

1. Navigate to the `client` directory in your terminal.
2. Run `npm install` to install the necessary dependencies.
4. Run `npm start` to start the ReactJS application.
5. Access the frontend application via `http://localhost:3000`.


## Contributing

Contributions are welcome! If you'd like to enhance this project or report issues, please submit a pull request or open an issue.
