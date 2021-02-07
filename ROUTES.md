ROUTES

//click on brand/ default load in

- /GET /   - HOMEPAGE (default listings)

//click on MUSIC

- /GET /:category_id - DISPLAY listings according to category_id

//click on pin

- /GET /:pin_id -DISPLAY pin details (title,comments everything)

//username input & login button

- /POST /login -If user exists, stores a cookie user_id & redirect to /user_id, else error.
- /POST /logout - clear cookies redirect /GET /

- /GET /:user_id DISPLAYS user's created pins + create pin button + delete button on each pin

   * click create pin button  

     * /GET /new displays create pin FORM

       *  ....fills form and clicks submit

       * /POST /new  -insert into query

   * click delete on PIN  
     * /DELETE /:pin_id  
       *  checks user_id on PIN (that returns true/false if user is the creator)  
       *  if true, deletes from pins, if false deletes from pin-collection   

//adding ratings

//click on pin

- /GET /:pin_id -DISPLAY pin details (title,comments everything) + rating FORM

//enter ratings and comment and username

- /POST /:pin_id  adds entry into reviews












