# Feature Request Sample App

Live Demo : http://bit.ly/1qKMvG8

This project is a respones to github.com/IntuitiveWebSolutions/EngineeringMidLevel

This project is a proof of concept, many things are missing(error handling), information hiding, simple convention(one week of Javascript exp :)), so I decided to focus on fully implementing the requirement(**Build a web application that allows the user to create "feature requests".**).

##### Prerequisites
Node and Mongodb

### Installation
```sh
$ sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8081
$ git clone https://github.com/RGSSoftware/FeatureRequest
$ cd FeatureRequest
$ node initDb.js
$ node sever.js
```

#### Models
```sh
feature = {
    created_at : Date,
    title: String,
    desription: String,
    priority : Number,
    clientId: mongoose.Schema.ObjectId,
    ticketURL: String,
    productId: mongoose.Schema.ObjectId,
    targetDate: Date,
    next: mongoose.Schema.ObjectId,
    prev: mongoose.Schema.ObjectId
    }
```
Fields next and prev are part of a double link list implementation for use case (**Client Priority:**).Whenever a new feature for a specific client is inserted all continuous priority links are updated (priority+1) in order to make room for that inserted link, therefore maintaining a sorted link list and fully implement the use case.

```sh
client = {
    name: String
}
```

```sh
product = {
    area: String
}
```

#### Backend
I used a simple express node server meant to serve a basic api.

#### Web Frontend
Simple Angularjs Material app that's consuming the api.

#### Infrastructure
FREE Amazon EC2 t2.micro instance.
