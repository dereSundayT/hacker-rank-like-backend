
Backend Url : https://hacker-rank-like-backend-2uib.onrender.com/api-docs

Start Command : npm run deploy && npm run start:prod

1 .  used postgres db instead of mysql because of the hosting platformed used only support postgres db

# Dependencies Used
   - Dependencies
     - @nestjs/config : 
     - @nestjs/swagger : 
     - prisma :
     - npm i --save class-validator class-transformer
     - bcrypt
     -  npm install --save @nestjs/jwt
Backend Core Module
  - auth
    - register [email,name,password,profile image]
    - login endpoint
  - user (Profile)
    - endpoint to get user profile
    - endpoint to update user profile
  - admin

Frontend Break down
   - profile
        - register
        - login 
        - get user profile
        - update user profile
     - test management 
       -  List/Display any 2 tests/problems for attempting/solving of your choice from hackerrank, leetcode to user. (Show attempt option to solve the problem alongside tests)
       -  List Previous attempts/results 
             - Show completed (on success)/attempted status (on fail), result status(Success/Unsuccessful) if previously test has been attempted.
             - View previous result/input/output on click see test details.
   - Admin Panel
     - List of User Profiles and stats like number of attempts, fail/success ratio
     - Detail view shows profile with list of attempted tests, code input/output
       (output securely to prevent XSS attack) and result (success/fail).