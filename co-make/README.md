### TO-DO LIST


# Authentication
    - add private routes to everything except login and register


# Up-vote
    - get upvote functionality working
        - redux-persist needs to update when deleting like_Id from initial state

# NavBar
    - create a hamburger menu to display all nav items

# Logout
    - create logout functionality, should push you back to the main landing page


# BACKEND
    - change register to include all profile information, not just username and password
    - give the user a token once they register so they dont need to login after they register
    - send username when logging in

# Register
    - once backed is updated, change register form to include name, age, etc..
    - store token & user_id to local storage and push user to /issues


# Profile
    - profile page where the user can view all of the posts that they have posted
    - ??? display some of the users info
    - ??? have an option to edit some of their information


# Issues
    - add a username next to that person's post so we know who posted
    - make username clickable to view persons profile

    - EDIT ISSUE
        - change how the edit button redirect the user to the edit form
        - add functionality to edit your post
        - make it so you can only see button when its your post
        - have a useEffect to auto populate the form with its post
        - change the text field to be bigger for description

    - DELETE ISSUE
        - add functionality to delete your post
        - make it so you can only see button when its your post