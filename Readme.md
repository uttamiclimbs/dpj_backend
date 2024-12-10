# For Client End

# User Routes 

# User Login Url :- 
url :- http://localhost:4500/api/v1/user/login
Payload :-
{
   "email":uttamkrshaw@iclimbs.com,
   "password":"Uttam@5599"
}

Response From Server :- 
For Success :- 
{
  "status": "success",
  "message": "Login Successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI4NzY3MDQ0MzkzNGI2OTdlOWZhMjgiLCJuYW1lIjoiVXR0YW0gS3VtYXIgU2hhdyIsImVtYWlsIjoidXR0YW1rckBpY2xpbWJzLmNvbSIsImV4cCI6MTczMDczMjA1MSwiaWF0IjoxNzMwNzA2ODUxfQ.1Knar6xoESMLrP0_1yjeCBYrNdLoG5DKsWn1zKTnmDE"
}

For Error :- 

{
  "status": "error",
  "message": "Wrong Password Please Try Again"
}

# User Registration Url :- 

url :- http://localhost:4500/api/v1/user/register

Payload :- {
  "name":"Uttam Kumar Shaw",
  "email":"uttamkrshaw@iclimbs.com",
  "password":"Uttam@5599"
  "accountType":"artist"
}
 Different Account Types :- ["artist", "professional", "guest", "admin"], // Replace with your allowed values


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


# Different Example Of Job Type :-

Full-Time Employment
Part-Time Employment
Contract Employment
Freelance/Independent Contractor
Internship
Temporary/Seasonal Employment
Commission-Based Employment
Remote Employment
Gig Work
On-Call/Per Diem Employment