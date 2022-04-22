# Employee Management System
An employee management system implemented in both monolith and microservice architecture.

The purpose of this project is to convert a monolith project to a microservice architecture project. In empoloyeeManagement, we can have four services:

* Auth Service:

  >Basically, this service has the duty of authentication and authorization. Each employee(user) can signup and login and managing these operations is on this service. After siging up, user management service keep track of your username and password so if the user wanted to login, this service check the credentials and authenticate the user. If authentication fails, user cannot login to system, otherwise auth-service generates a JWT-Token as a cookie so for the next operations employee want to do in this system, again auth-service use that JWT-Token to authorize employee and check the access controls. Also if user log out of system, JWT-Token will be removed.


* Employee Data Management Service:

  >This service keeps each employees personal data. In the first place, when employee sign up and make an account, this service take action and store employees data in its database. So after that user can edit and get his information.


* Attendance and Leave Management Service: 

  >This service manages which time each employee attend and leave. It also keep track of the leaving days and how many leave days each employee can have and how many of those are remained. Then, It gives dificit and additional work hours to salary management system so it can calculate the final salary for each employee.


* Salary Management System:
  >This service manages and calclates the salary information of each employee, for example for employee x what is the basic salary? Does he have any dificit/additional work hours to pay? Does he have any raise? If yes, how much is the raise? 
  Each employee can get his payroll from this service.



These four services has communication and dependencies but the duty of each one is separated and isolated (They have different databases). So, this is why in our point of view the monolith employee-management-system can be divided into these four services in microservice architecture.


In the following we're gonna show you the dependency diagram and internal calls diagram for this system and then explain each one.



## Dependency Diagram
![dependency diagram (1)](https://user-images.githubusercontent.com/52166819/164722219-f7c2b71a-b3d5-4f0c-b6ce-a0b3ee9c381a.svg)

As you can see in the above diagram, employee interacts with the 4 services. At the first of every action is registration/login, then employee can have interactions with 3 other services, for example asks for his payroll or salary amount. In attendance and leave management service, employee can insert his leave and attend time for each day and based on these times, this service calculates the additional/dificit work hours and keeps track of them. employee can also see his personal information or edit them with the help of data management service!







## Internal Calls Diagram
![Internal calls diagram](https://user-images.githubusercontent.com/52166819/164727960-f0e27e4e-274a-4da5-ba7f-64f9ef9d5fc3.svg)
 
In the above diagram internall calls added. we have two internal calls, one between auth service and data management service which is when employee register for a new account and insert his personal data, these data should be send to data management service to keep track of. The other internal call is between salary management service and attendance and leave management service which is when salary management service wants  to calculate the final salary for each employee, it should have the additional/deficit work hours of each employee in attendance and leave management service.