# Collaboration Routes :- 
# Creating Collaboration Between Artists 

url :- http://localhost:4500/api/v1/collaborator/add

Payload :- {
  "name":"Uttam Kumar Shaw",
  "email":"uttamkrshaw@iclimbs.com",
  "password":"Uttam@5599"
}

# Response From Server
For Success
{
  "status": "success",
  "message": "Registration Successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI4N2U0ZTY3MjA3NDBjNThiZDkyYjMiLCJuYW1lIjoiVXR0YW0gS3VtYXIgU2hhdyIsImVtYWlsIjoidXR0YW1rcnNoYXdAaWNsaW1icy5jb20iLCJleHAiOjE3MzA3MzIyMjIsImlhdCI6MTczMDcwNzAyMn0.KPytgnSBjErwinogDAgrll34QcD5Tx2uOrPP3dMT5DU"
}

For Error
{
  "status": "error",
  "message": "User Already Exists with this Email ID. Please Try again with another Email ID",
  "redirect": "/user/login"
}
