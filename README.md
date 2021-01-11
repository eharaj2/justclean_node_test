# express
IMPORTANT NOTES:

    1. Make sure you follow the steps mentioned under "PROJECT START STEPS" and ensure that the steps execute successfully. 
     

PROJECT START STEPS:

    Pre-requisites:
    1. Install node, npm, redis-server
    2. Install express (npm install express --save)

    Steps:
    1. To run this application, do the following:
        1.a. Go to the project root directory.
        1.b. Run the following commands respectively in the terminal/command line to build and run the app:
            - npm install
            - npm start
    2: Change the database configuration in config/config.json file    
    
    3. Go to http://localhost:8080 in your browser to view it.

API DETAILS

        #Get All Tower List With search
    1: http://localhost:8080/api/getTowerList?page=0&size=3&q=&show_with_offices=true

        #Create Tower
    2: http://localhost:8080/api/createTower
        body(x-www-form-urlencode)
        {
            name: value
            location: value,
            rating: value,
            number_of_offices: value,
            number_of_floors: value,
            latitude: value,
            longitude: value,
        }
        header {
            x-api-key: access_token_value
        }

        #Update Tower
    3: http://localhost:8080/api/updateTower 
        body(x-www-form-urlencode)   
         {
            id: tower_id,
            name: value,
            location: value,
            rating: value,
            number_of_offices: value,
            number_of_floors: value,
            latitude: value,
            longitude: value,
        }
        header {
            x-api-key: access_token_value
        }

        #Delete Tower
    4: http://localhost:8080/api/deleteTower?tower_id=1
        header {
            x-api-key: access_token_value
        }

        #Signup User
    5: http://localhost:8080/api/signup
        body(x-www-form-urlencode)
        {
            name: value,
            email: value,
            password: value
        }

        #Login 
    6: http://localhost:8080/api/login
        body(x-www-form-urlencode)
        {
            email: test@test.com,
            password: 123456
        }
