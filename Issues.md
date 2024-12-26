# API List for DPJ Backend

1. **User Authentication API**
    - `POST /api/auth/register`: Update User Profile Full
    - `POST /api/auth/login`: Document Upload & Verification Api
    - `POST /api/auth/logout`: 

2. **Artist API**
    - `GET /api/users`: Apply For a Job
    - `GET /api/users/{id}`: Current Status Of Jobs Applied By Artist
    - `PUT /api/users/{id}`: Get Artist Information
    - `DELETE /api/users/{id}`: Get Business Informations
    

3. **Issue Management API**
    - `GET /api/issues`: Retrieve a list of issues
    - `GET /api/issues/{id}`: Retrieve details of a specific issue
    - `POST /api/issues`: Create a new issue
    - `PUT /api/issues/{id}`: Update an existing issue
    - `DELETE /api/issues/{id}`: Delete an issue

4. **Comment Management API**
    - `GET /api/issues/{issueId}/comments`: Retrieve comments for a specific issue
    - `POST /api/issues/{issueId}/comments`: Add a comment to a specific issue
    - `PUT /api/issues/{issueId}/comments/{commentId}`: Update a comment
    - `DELETE /api/issues/{issueId}/comments/{commentId}`: Delete a comment

5. **Notification API**
    - `GET /api/notifications`: Retrieve a list of notifications
    - `POST /api/notifications`: Create a new notification
    - `PUT /api/notifications/{id}`: Update a notification
    - `DELETE /api/notifications/{id}`: Delete a notification

6. **File Upload API**
    - `POST /api/upload`: Upload a file
    - `GET /api/upload/{fileId}`: Retrieve a file
    - `DELETE /api/upload/{fileId}`: Delete a file
