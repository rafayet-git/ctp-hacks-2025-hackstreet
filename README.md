# Check My Fit
2025 CTP Hackathon project for group Hackstreet Boys

[Devpost](https://devpost.com/software/closetmate-x64y2m)

## Installation

### Prerequisites

- Node.js (tested on version v24)
- A MySQL database

### Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/rafayet-git/ctp-hacks-2025-hackstreet.git
    cd ctp-hacks-2025-hackstreet
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Configure environment variables**
    ```bash
    cp .env.example .env
    ```
    
    Edit the `.env` file with your MySQL database credentials:
    ```bash
    MYSQL_HOST="example.com"
    MYSQL_PORT="1234"
    MYSQL_USER="admin"
    MYSQL_PASSWORD="password"
    ```
    
    If required, add SSL certificates by creating a `certs/ca.pem` file:
    ```bash
    mkdir certs
    mv your-ssl-cert.pem certs/ca.pem
    ```

4. **Start the application**
    ```bash
    npm start
    ```
    
    The application will be available at `http://localhost:3000`