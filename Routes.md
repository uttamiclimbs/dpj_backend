# Collaboration Routes :-

# Creating Collaboration Between Artists

url :- http://localhost:4500/api/v1/collaborator/add

Payload :- {
"title":"Testing",
"description":"Testing",
"category":"Category Testing",
"banner":File Uploding,
"startDate":"2024-12-06",
"endDate":"2024-12-12",
"startTime":"05:00",
"endTime":"11:00",
}

# Response From Server

For Success
{
"status": "success",
message: `Collaboration Created Successfully`,
}

For Error
{
"status": "error",
message: `Failed To Add New Event ${error.message}`,
}

# Creating Artists As Collaboration

url :- http://localhost:4500/api/v1/collaborator/add/collaborator/:id

Payload :-{
"collaborators":[
{
id:Candidate Id,
name:"Testing",
email:"testing@gmail.com",
amount:2500
},
{
id:Candidate Id,
name:"Testing",
email:"testing@gmail.com",
amount:2500
}
]
}

# Response From Server

For Success
{
"status": "success",
"message": "Successfully Added Collaborators in The Following Collaboration Event",
}

For Error
{
"status": "error",
"message": "Failed To Add New Event ${error.message}",
}

# Editing Collaboration Between Artists

url :- http://localhost:4500/api/v1/collaborator/edit/basic/:id

const { id } = req.params;

Payload :- {
"title":"Testing",
"description":"Testing",
"category":"Category Testing",
"banner":File Uploding,
"startDate":"2024-12-06",
"endDate":"2024-12-12",
"startTime":"05:00",
"endTime":"11:00",
"banner":fileupload
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

address: "Create your physical Collaboration by providing the details below"
banner: File {name: 'Rectangle 317.png', lastModified: 1733489274041, lastModifiedDate: Fri Dec 06 2024 18:17:54 GMT+0530 (India Standard Time), webkitRelativePath: '', size: 85798, …}
category: "Music"
description: "Create your physical Collaboration by providing the details below\n"
endDate: "2024-12-13"
endTime: "00:00"
eventType: "Physical"
startDate: "2024-12-12"
startTime: "00:00"
title: "event "
