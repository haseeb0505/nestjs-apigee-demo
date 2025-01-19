### **NestJS Apigee Demo Project**

#### **Project Overview**
The **NestJS Apigee Demo Project** showcases the integration of a NestJS application with the Apigee API Management Platform. It automates the creation, configuration, and deployment of API proxies for a `users` service. The project demonstrates how to dynamically manage API traffic and security policies using the Apigee Management API.

#### **Key Features**
- **Dynamic Proxy Creation**:
  - Automatically creates API proxies for `users` service endpoints such as:
    - `GET /users`
    - `POST /users`
    - `GET /users/:id`
    - `PUT /users/:id`
    - `DELETE /users/:id`
- **Policy Attachment**:
  - Applies traffic management and security policies to each API proxy:
    - **Quota Limiting**: Restricts the total number of requests per minute.
    - **Rate Limiting**: Limits the rate of requests within a time window.
    - **Spike Arrest**: Prevents sudden traffic spikes by throttling requests.
- **Proxy Deployment**:
  - Deploys API proxies to specified environments (e.g., `test` or `prod`) on Apigee.

#### **Technologies Used**
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Axios**: For making HTTP requests to the Apigee Management API.
- **Apigee**: For API proxy creation, policy management, and deployment.

#### **Setup Instructions**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/nestjs-apigee-demo.git
   cd nestjs-apigee-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the project root and add the following:
   ```env
   APIGEE_USERNAME=your-apigee-username
   APIGEE_PASSWORD=your-apigee-password
   APIGEE_ORGANIZATION=your-organization-name
   ```

4. Run the application:
   ```bash
   npm run start
   ```

5. Test the proxy creation and deployment:
   - Use Postman or `curl` to trigger the `create-user-proxies` endpoint:
     ```bash
     curl -X POST http://localhost:3000/apigee/create-user-proxies \
          -H "Content-Type: application/json" \
          -d '{"environment": "test"}'
     ```

#### **Folder Structure**
```
nestjs-apigee-demo/
├── src/
│   ├── apigee.controller.ts  # Handles Apigee proxy creation requests
│   ├── apigee.service.ts     # Contains logic for interacting with Apigee Management API
├── .env                      # Environment variables for Apigee credentials
├── package.json              # Project dependencies and scripts
└── README.md                 # Project description
```

#### **Future Enhancements**
- Add support for additional Apigee policies (e.g., OAuth2, JSON transformation).
- Automate proxy revision management for updates.
- Integrate with CI/CD pipelines for seamless deployment.

#### **Contributing**
Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

#### **License**
This project is licensed under the [MIT License](LICENSE).
