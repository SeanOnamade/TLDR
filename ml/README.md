# Server Setup and Testing Guide

Local instance server setup and testing guide. Follow these steps to get your server up and running, or test it using predefined scenarios.

---

## 📋 Prerequisites

Before starting, ensure you have the following installed on your machine:
- **Node.js** (Stable build on Node 22)

---

## 🚀 Setup Instructions

1. **Clone the Repository**  
   Clone the repository to your local machine:
   ```bash
   git clone <repo url>

2. **Navigate to server directory**  

   ```bash
   cd ml/sev

3. **Generate SSH Key and Certificate**  
   Run the following terminal command to generate an SSH key and certificate [***NOTE***: You will be prompted to fill out optional information about it]:
   ```bash
   openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

4. **Set Environment Variables**  
    Copy the generated key and certificate paths into the appropriate environment variables:

    a. locate the newly created key.pem and cert.pem

    b. copy the contents into a .env file
        - Create new .env file and copy contents

    ```bash
    touch .env

5. **Install dependencies**  
   Install required dependencies:
   ```bash
   npm install

------

## ✅ Testing
To run premade testing, run:

```bash
node run dd1_TESTS
```

----------
## ⌛️ Running
To run local instance after everything is set up:

```bash
node index.js
```


