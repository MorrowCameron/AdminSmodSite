# Smile and Nod Admin Site

This project is a companion administration interface for [smileandnodimprov.com](https://smileandnodimprov.com). It enables team members to update site content easily from a separate platform without directly editing the production site.

## Project Overview

The admin site allows users to:
- Upload and manage banner images and image carousels
- Edit show descriptions, contact details, and user-submitted reviews
- Add, remove, and update current members and alumni
- Persist changes locally with plans for database integration

## Access

The site is temporarily protected with a single password for demonstration purposes:
`smileandnod` which can be used on the login page.

## Running the website
- `cd frontend`
- `npm start`

## Information for Smod Members:
Hi Team Smile and Nod, it's me, Cameron Morrow, a former member of team. If you need to update this package know that the frontend holds the React side and backend is the database (important!). In case you are doing some changes I might expect, I'd recommend the following:

### Changing color schemes:
1. Go to `frontend/src/pages/global.css`
2. Update the variables in root to be the color scheme you would prefer.

### Adding Pages:
1. Add a route to the page on `frontend/src/App.js`
2. Create the page in `frontend/src/pages`
3. Implement and test the pages, you wont be able to actually update the website unless you also switch the pages there to pull from the database

### Add/Remove team members:
- No need to change the code, just log into the admin site and remove from there. Changing the code risks more than doing it the proper way.

## Help! We broke it and are scared!
If you need to contact me for help, my email is morrowcameron2002@gmail.com 
