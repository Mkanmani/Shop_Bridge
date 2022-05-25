When the application loads the homePage gets loaded first.
Login:
Select Login from the homePage and it will navigate the user to Login Component.
  User enters the user id provided in the place holder for reference. An API call is made to validate the user. 
  Upon entering invalid credentials a error message will be displayed.
  Upon entering correct credentials the user will be redirected to the dashboard page
  
Dashboard:
The Dashboard component lists all the products available in the inventory currently by making a GET API request call.
  The product admin can add a new item by selecting the 'addItem' button present on the dashboard screen, provide the details needed and save the same.
  Upon successful POST API call the alert informs the product is added.
  
  The product admin can delete an existing item by selecting the 'Delete' button present on the dashboard screen against each product.Upon successful API call the alert    informs the product is deleted.
  
   The product admin can view and modify the details of an existing item by selecting the 'view and modify' button present on the dashboard screen against each product.The user will be navigated to product details page.

View and Modify Product Details:
The selected product details are displayed in detail and the user can go back to dashboard by selecting the 'go to dashboard' button
  The product admin can modify the existing product and once details are altered an PUT API call is made and upon success then an alert is displayed for Successful modification and user is navigated to dashboard again.  
   
  
