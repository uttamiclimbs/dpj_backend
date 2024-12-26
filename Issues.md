# API List for DPJ Backend

1. **User Authentication API**
    - `POST /api/auth/register`: User Login & user Registration
    - `POST /api/auth/login`: Document Upload & Verification Api (Pending)
    - `POST /api/auth/logout`: User Basic Profile  & User Profile Update
    - `POST /api/auth/logout`: Get User Detail's 


2. **Post API**
    - `GET /api/users`: Create Post & Edit Post
    - `GET /api/users/{id}`: List All Post Created By User & Get Detail Of A Particular Post 
    - `PUT /api/users/{id}`: List All Comment On A Signle Post, Add Comment & Edit Comment
    - `DELETE /api/users/{id}`: Adding & Removing Bookmark On a Post List Of All Bookmarks (Pending), 
    - `DELETE /api/users/{id}`: Adding & Removing Likes On a Post (Pending), 

2. **Collaboration API**
    - `GET /api/users`: Create Collab & Edit Collab 
    - `GET /api/users/{id}`: List All Collab Created By the User & Get List Of A Particular Collab Details (pending)
    - `PUT /api/users/{id}`: Add Collaborator, Get List Of all collaborator added in an event & Get Collaboration Request Status & Send Request to Different Artist For Collab & Change Status of Collab Request By Artist & Shows List Of All Artists
    

    

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
