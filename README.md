# Grubber, the ideal delivery experience.

Grubber is a unique food delivery website that strives to provide food as fresh and fast as possible. Our policy at Grubber is to provide absolute assurance of your food as fresh as possible. We do not simply want to just provide service, but also an experience you will not forget. Grubber has the perfect User experience, although we do not just stop there. At Grubber you can host your restaurant with an intuitive design.

At Grubber a User can experience the follow: 

# Grubber - User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to the home page of Welp.
      * So that I can easily log out to keep my information secure.


## Restaurants

### Create Restaurants

* As a logged in user, I want to be able to create new restaurants.
  * When I'm on the `/restaurants/new` page:
    * I can create a new restaurant.
    * When creating a restaurant there will be an option to set a thumbnail image for the restaurant.
    * When creating a restaurant there will be options to set 3 starting menu items, following restaurant details, etc.

### Viewing Restaurants

* As a logged in _or_ logged out user, I am able to view all restaurants.
  * When I'm on the `/restaurants` page:
    * I can view the all restaurants currently available.

* As a logged in _or_ logged out user, I am able to view a specific Restaurant and its associated Reviews, and Menu Items.
  * When I'm on the `/restaurants/:id` page:
    * I can view the content of the Restaurant, as well as the associated Reviews, and Menu Items.

### Updating Restaurants

* As a logged in user, and owner of the restaurant. I am able to update information about my restaurant.
  * When I'm on the `/restaurants/:id` page:
    * I can click "Edit" to make permanent changes to Restaurant I posted.
    * I can click the "Add Menu Items" button to add new Menu Items to my restaurant.

### Deleting Restaurants

* As a logged in user, and owner of the restaurant I can permanetley delete the restaurant.
  * When I'm on the `/restaurants/:id` page:
    * I can click the "Delete" button to permanentely delete the restaurant.
    * After deletin I am redirected to the view all restaurants page.

## Reviews

### Create Reviews

* As a logged in user, I am able to create new reviews for individual restaurants.
  * When I'm on the `/restaurant/:id` page:
    * I can click the "Create Review" button to be brought to the create review form.
    * On the review form I can set a star rating, and leave a description of my experience.


### Viewing Reviews

* As a logged in _or_ logged out user, I am able to view reviews on selected restaurants.
  * When I'm on the `/restaurants/:id` page:
    * I can view all reviews posted.
    * Reviews are posted by most recent at the top.

### Updating Reviews

* As a logged in user, and creator of the review I can make changes to the review.
  * When I'm on the `/restaurants/:id` page:
    * I can click "Edit" button next to my created review and directed to the form with my current review information filled in.
    * On the review form I can make permanent changes to my review.

### Deleting Reviews

* As a logged in user, I am able to permanently delete any review I own.
  * When I'm on the `/restaurants/:id` page:
    * I can click the "Delete" button to permanently delete a Review I own.
    * After deletion I am redirected to the restaurant page.


## Menu Items

### Creating Menu ITems

* A logged in user and owner of the restaurant I am able to create menu items.
  * When I'm on the 'restaurants/:id' page:
    * I can click the "Add Menu Item" button and be brought to a form to create a new menu item.
    * On the menu item form you will provide a name, description, and preview image for the item.


### Viewing Menu Items

* As a logged in _or_ logged out user, I am able to view all a restaurants menu items.
  * When I'm on the `/restaurants/:id` page:
    * I see all the menu items associated with the restaurant.
  

### Deleting Menu Items

* As a logged in user, and owner of the restaurant. I am able to delete created menu items.
  * When I'm on the `/restaurants/:id` page:
    * I can click the "Delete" button next to a menu item to permanently delete it.
    * After deletion I am redirected to the restaurant page.


## Shopping Cart

### Viewing Shopping Cart

* As a logged in, I am able to view all the items in my cart by clicking the shopping cart icon in the top right.
  * When I'm on any page besides a create/update page:
    * I see all the items I have added to my cart.

### Updating Shopping Cart

* As a logged in user, if I add and remove items in my shopping cart.
  * When I'm on any page except a create/update page:
    * I can click the shopping cart drop down and remove any items I have added, effectively updating my shopping cart.
    * On the `/restaurants/:id` page I can add menu items to my shopping cart, also effectively updating it.

### Checking out with my Shopping Cart

* As a logged in user, if I have at least 1 item in my shopping cart.
  * When I'm on any page except a create/update page:
    * I can click the shopping cart drop down and press the checkout button to be redirected to the checkout page.
    * On the checkout page I will see a break down of my items and their information, and a place order button.
    * I will aso be asked to fill out a delivery address before my order can be placed. After a successfully placed order I will get a confirmation message.
