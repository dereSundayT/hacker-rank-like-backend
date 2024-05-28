Problem Statement:
You need to create a simple application that allows the user to complete/solve
programming tests/problems just like LeetCode or Hackerrank.

Tools
• Backend – Node.js (or any language of your choice), Framework of your choice –
Nest.js or ExpressJs or any other framework (or framework of your choice)
• Frontend – VueJS/React - based on your choice
• APIs and 3rd party dependencies – Judge0, Monaco Editor.
• Deployment: Heroku, Vercel, Github for git control

Backend Core Module
  - auth
    - register [email,name,password,profile image]
    - login endpoint
  - user (Profile)
    - endpoint to get user profile
    - endpoint to update user profile
  - admin

Frontend

Technical Requirements
1) User panel to fill/complete tests.
   Profile – with user details – email, name, profile image
   Registration with above details
2) List of tests –
   • List/Display any 2 tests/problems for attempting/solving of your choice from
   hackerrank, leetcode to user.
   • Show attempt option to solve the problem alongside tests
   List Previous attempts/results
   • Show completed (on success)/attempted status (on fail), result status
   (Sucess/Unsuccessful) if previously test has been attempted.
   • View previous result/input/output on click see test details.
3) Code Editor and Compiler
   • Use Monaco + Guide0 API to build code editor and compiler
   • Users can input code and run/emulate code.
   • And submit if they want for review if satisfied.
   • Output is shown in the output window.
   • And result of this attempt success/fail is also displayed
   • Submit code, result to list of attempts option.
   • Store code input, output and result in mysql.
   You can reference for your help: www.freecodecamp.org/news/how-to-build-react-
   based-code-editor/
4) Admin Panel with admin user and password of choice
   • List of User Profiles and stats like number of attempts, fail/success ratio
   • Detail view shows profile with list of attempted tests, code input/output
   (output securely to prevent XSS attack) and result (success/fail).

Instructions
   • Write clear, modular, well-commented code following best practices.
   • Ensure Stability and security of the application.
   • Submit the test and deliverables in 96 hours.

Deliverables:
   • Source code for the Node.js/framework backend and Vue.js/React frontend.
   • Database migration files for MySQL.
   • Github link & live demo link to the url where you have uploaded this (showcasing the
   functionality).
   • Documentation on codebase.
   • Unit and feature tests demonstrating the application’s functionality and security
   measures.
   A README.md file detailing setup instructions, dependencies, and how to run the
   tests.

Evaluation Criteria:
   • Functionality: Completeness of features as per requirements.
   • Code Quality: Clarity, structure, and use of best practices in coding.
   • Security Practices: Implementation of security features against XSS, CSRF, and SQL
   Injection, Input and Output Sanitization, Upload File Security.
   • Design and UX: Functional, Responsiveness, working, easy to use frontend.
   • Testing: Coverage and effectiveness of tests.