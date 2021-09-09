# Places Api 
API to manage places

Prerequisites
-------------
1. install docker
1. install docker-compose
1. install git
1. clone repository: `git clone --recursive https://github.com/kevinmoran100/globalsupportplaces`

Getting Started
---------------
1. start service: `docker-compose up`
2. Use the api

# Routes
## Create a place
[POST] http://localhost:3000/api/places

*Body*:
~~~
{
    "name": "Los Angeles City College",
    "latitude": 33.76696,
    "longitude": -119.79779
}
~~~ 
*Response*:
~~~
{
    "id": 1,
    "name": "Los Angeles City College",
    "latitude": 33.76696,
    "longitude": -119.79779,
    "updatedAt": "2021-09-09T01:51:28.461Z",
    "createdAt": "2021-09-09T01:51:28.461Z"
}
~~~ 
## Get distance
[GET] http://localhost:3000/api/places/distance?placeOne=Los Angeles City College&placeTwo=Fresno City College&unit=m

*Response*:
~~~
{
    "distance": "333678.8605",
    "unit": "m"
}
~~~ 

## Get all places
[GET] http://localhost:3000/api/places/

*Response*:
~~~
[
    {
        "id": 2,
        "name": "Fresno City College",
        "latitude": 36.76696,
        "longitude": -119.79779,
        "createdAt": "2021-09-09T01:02:37.243Z",
        "updatedAt": "2021-09-09T01:02:37.243Z"
    },
    {
        "id": 3,
        "name": "Fresno City College",
        "latitude": 36.76696,
        "longitude": -119.79779,
        "createdAt": "2021-09-09T01:07:18.902Z",
        "updatedAt": "2021-09-09T01:07:18.902Z"
    }
]
~~~ 

## Delete a place
[DELETE] http://localhost:3000/api/places/1

*Response*:
~~~
{
    "message": "Place deleted."
}
~~~ 