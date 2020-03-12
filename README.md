## README Modulo2

##  -------------------------------- Project Name: ------------------------------------
Disconnect

## -------------------------------------- Creators --------------------------------------
(Alejandro Jimenez Regalon + Thibault Delfaud) x (awesomeness) = Disconnect

## ------------------------------ What is Disconnect? ------------------------------
Disconnect is an online app that helps you find the nearest musical events around you.

## ------------------------------------ Front end -----------------------------------------
- HTML, CSS
- Back end
- JavaScript (Node.js, Express.js)
- MongoDB (Mongoose)

## ------------------------------ App functionnalities ------------------------------
- Multiple user types
- Visitor (simple visitor, can browse per artists or venue and buy tickets for a specific event)
- Partner (owner of a venue, can add one or more venues + add events for each venues)

## ROUTES
|   Method   |  Endpoint    |     Description  | Views
|------------|--------------|------------------|------------------
|    GET     |    /         |               HomePage                        |       
|    GET     |    /login    |               Login page                      |
|    POST    |    /login    |               Send user info and logged in    |   
|    GET     |    /register |               Register page                   |
|    POST    |    /register |               Send user and get the cookie    |
|    GET     |    /artists  |               Artists page - search           |
|    POST    |    /artists?search="..."  |  Search the Artists (Optional)   |
|    GET     |    /artists/results/:id  |   Artists page - search           |
|    GET     |    /artist/:id |             Artists page - One artist       |
|    GET     |    /venues |                 Venues page -                   | venues-browse.hbs
|    POST    |    /venues/:id |             Get the venue                   | venues-browse.hbs
|    GET    |    /venue/events/:id |        See all the events              | venues-events.hbs
|    GET    |    /venue/tickets/:id |       See all the tickets             | venues-tickets.hbs
|    GET    |    /venue/ticket/pay/:id |    See all the tickets             | venues-ticket-pay.hbs
|    GET     |    /partner/add/venue    |   See the form to add the venue   | 
|    POST    |    /partner/add/venue    |   Send the information to the BD  |   
|    GET     |    /partner/add/event    |   See the form to add the venue   |
|    POST    |    /partner/add/venue    |   Send the information to the BD  |

## ------------------------------ MODELS ------------------------------

```javascript
User model
    {
        id_user:        { Type: ObjectId(), required: true, unique: true}
        name:           { Type: String, required: true }
        surnames:       { Type: String, required: true }
        email:          { type: String, required: true , unique: true}
        password:       { Type: String, required: true }
    }

Partner model
    {
        id_partner:     { Type: ObjectId(), required: true, unique: true}
        name:           { Type: String, required: true }
        surnames:       { Type: String, required: true }
        email:          { Type: String, required: true , unique: true}
        password:       { Type: String, required: true }
    }

Venue model
    {
        id_venue:       { Type: ObjectId(), required: true, unique: true}
        name:           { Type: String, required: true }
        place:          { Type: String, required: true }
        altitude:       { Type: Number }
        latitude:       { Type: Number }
        picture:        { Type: String, required: true }
        description:    { Type: String, required: true }
        id_partner:     { Type: ObjectId(...), required: true, unique: true}
    }

Event model
    {
        id_event:       { Type: ObjectId(), required: true, unique: true}
        name:           { Type: String, required: true }
        place:          { Type: String, required: true }
        picture:        { Type: String, required: true }
        description:    { Type: String, required: true }
        date:           { Type: Date, required: true }
        id_venue        { Type: ObjectId(...), required: true, unique: true}
        id_artists      { Type: Array }
    }



```

##  ------------------------------ CRUD ------------------------------------
- Create: Partner can create a venue, and events for each venue
- Read: both users can read artists, venues and events
- Update: Partner can change venue and events
- Delete: Partner can delete venues and events

## -------------------------- Dependencies ----------------------------
- Spotify API https://www.npmjs.com/package/spotify-web-api-node
- Map Box API https://docs.mapbox.com/api/

## ------------------------------ Links --------------------------------------
TRELLO  -  https://trello.com/b/PiHqKdYY <BR>
GITHUB  -  https://github.com/Thibault-d/Disconnect <br>
HEROKU  -  https://ironhack-disconnect.herokuapp.com/<br>
SLIDES  -   ... <br>
MOCKUPS - https://app.moqups.com/r10YTb0erF/view/page/aa9df7b72 <BR>