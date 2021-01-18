# MCIT On-Campus 2021 Winter Hackathon  
### Project/Team Name: Meeting a Doctor
##  

**Team Members**  Use format below  
Name         | Year
------------ | -------------
Jiawei Huang | 2022
Jiaxin Wang  | 2022
Le Pan       | 2022

**General Idea**  

Due to the influence of COVID-19, medical resources are less reachable, and people are concerned about how to allocate medical resources fairly and effectively. Instead of visiting different hospital websites to find out the earliest possible appointments and getting useful information from scarce resources, building up a medical platform to unite the hospitals in one region and realize resources sharing and arrangement among different hospitals could be a better solution. In this hackathon, we want to implement a mini-public medical platform that can break the boundaries between hospitals, realize cross-hospital appointments, online consultation, information sharing, and other one-stop services to get to the patients at the earliest time.

In this online doctor reservation web system, users will be able to access the general information of hospitals in Philadelphia, including its location, specialty, and doctor. Besides that, users can reserve a time slot to meet the doctor with a particular specialty on a specific day, and the system will provide all available doctors at that time. After the time is chosen, an agenda will be added to the users' calendar in this web app. Users will also be able to provide feedback to a specific doctor after the meeting.

**Anticipated Stack** 

Frontend: ReactJS with Bootstrap and CSS for styling
Backend: Spring Boot, Spring Security, JWT, SQL
Database: MySQL holding on AWS

**Presentation URL** 

YouTube Video demo link:
https://www.youtube.com/watch?v=0Rjwb37S-sw&list=PL2RUIUzoB9EGNPiywkWpvNcpy-2vV19aM&index=1&t=6s


**Test the app** 

1. Download code 
2. change the datasource configuration in hackathon\polling-app-server\src\main\resources\application.properties if you want to use your local database 
3. cd to the server side and run: ``` mvn spring-boot:run``` 
4. cd to the client side and run: ```npm install```
 

**Test data**

The available doctor names are doctor, doctor1 and doctor2, you can try the application by using these doctor names. if you use local database, please change the configuration in hackathon\polling-app-server\src\main\resources\application.properties and insert at least one available doctor name by using the following sql: INSERT INTO doctors (department, hospital, name, email) VALUES ('other', 'hospital', 'doctor', "123@123"); SELECT * FROM doctors;
