## README Modulo2

## Project Name: 
Disconnect

## Creators
(Alejandro Jimenez Regalon + Thibault Delfaud) x (awesomeness) = Disconnect

## What is Disconnect?
Disconnect is an online app that helps you find the nearest musical events around you.

## Technologies
- Mockup: https://app.moqups.com/r10YTb0erF/view/page/aa9df7b72
- Trello: https://trello.com/b/PiHqKdYY/disconnect
- Heroku: https://ironhack-disconnect.herokuapp.com/ (connected to the GIT MASTER branch)

### Front end
- HTML, CSS
- Back end
- JavaScript (Node.js, Express.js)
- MongoDB (Mongoose)

### App functionnalities
- Multiple user types
- Visitor (simple visitor, can browse per artists or venue and buy tickets for a specific event)
- Partner (owner of a venue, can add one or more venues + add events for each venues)

## ROUTES
|   Method   |  Endpoint    |     Description  
|------------|--------------|-------------------
|    GET     |    /         |    HomePage   
|    GET     |    /login    |    Login page  
|    POST    |    /login    |    Send user info and logged in 
|    GET     |    /register |    Register page
|    POST    |    /register |    Send user and get the cookie
|    GET     |    /         |

## MODALS

User model
    {
        id_user:        auto
        name:           String
        surnames:       String
        email:          String
        password:       String
        addres:         String
    }

Partner partner
    {
        id_partner:     auto
        name:           String
        surnames:       String
        email:          String
        password:       String

    }

Disco
    {
        id_disco:       auto
        name:           String
        place:          String
        picture:        String
        description:    String
    }

Event
    {
        id_event:       auto
        name:           String
        place:          String
        picture:        String
        description:    String
        
    }

### CRUD
- Create: Partner can create a venue, and events for each venue
- Read: both users can read artists, venues and events
- Update: Partner can change venue and events
- Delete: Partner can delete venues and events

### Dependencies
- Spotify API https://www.npmjs.com/package/spotify-web-api-node
- Map Box API https://docs.mapbox.com/api/

## Links
TRELLO  -  https://trello.com/b/PiHqKdYY
GITHUB  -  https://github.com/Thibault-d/Disconnect
HEROKU  -
SLIDES  - 