import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      
      "Follow us on:": "Follow us on:" ,
      "Language": "Language" ,
      "English": "English" ,
      "Arabic": "Arabic" ,
      "Profile": "Profile" ,
      "Enter Your Product Name...": "Enter Your Product Name..." ,
      "Logout": "Logout" ,
      "Home": "Home" ,
      "Category": "Category" ,
      "Pages": "Pages" ,
      "About Us": "About Us" ,
      "Contact Us": "Contact Us" ,
      "Maintenance text": "Website Under Maintenance" ,
      "Maintenance description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum hasbeen the industry's standard dummy." ,
      "hours": "hours" ,
      "minutes": "minutes" ,
      "seconds": "seconds" ,
      "days": "days" ,
      "Error 404": "Error 404" ,
      "Error 404 text": "The page was not found." ,
      "Error 404 description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy." ,
      "Back to Home": "Back to Home" ,
      "backsoon text": "We will launch soon." ,
      "backsoon description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry since the 1500s." ,
      "Enter your email": "Enter your email"  ,
      "subscribe": "subscribe"  ,
      "About our business Firm": "About our business Firm"  ,
      "About Us description": "Electronic typesetting text of the printing and typesetting industry. when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dutmmy text ever since the 1500s, It has survived not only,but also the leap into electronic typesetting.</p> <p>Lorem Ipsum is simply dummy text of the printing. It has survived not only five centuries, but also the leap into electronic typesetting.</p><p>Also the leap into electronic typesetting printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."  ,
      "About Us text": "What is the we"  ,
      "FAQ": "FAQ"  ,
      "Customer service management": "Customer service management"  ,
      "FAQ text": "What is our services?"  ,
      "FAQ text one": "What is the multi vendor services?:"  ,
      "FAQ description one": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic  typesetting, remaining essentially unchanged."  ,
      "FAQ text two": "How to buy many products at a time?:"  ,
      "FAQ description two": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic  typesetting, remaining essentially unchanged."  ,
      "Best place to buy products": "Best place to buy products"  ,
      "First Name": "First Name"  ,
      "Last Name": "Last Name"  ,
      "Email": "Email"  ,
      "Phone Number": "Phone Number"  ,
      "Address": "Address"  ,
      "City": "City"  ,
      "Country": "Country"  ,
      "Region State": "Region State"  ,
      "Register": "Register"  ,
      "Post Code": "Post Code"  ,
      "Enter your first name": "Enter your first name"  ,
      "Enter your last name": "Enter your last name"  ,
      "Enter your phone number": "Enter your phone number"  ,
      "Enter your Address": "Enter your Address"  ,
      "Email Address": "Email Address"  ,
      "Forgot Password?": "Forgot Password?"  ,
      "password": "password"  ,
      "Comments/Questions": "Comments/Questions"  ,
      "Please leave your comments here.": "Please leave your comments here."  ,
      "Submit": "Submit"  ,
      "Call Us": "Call Us"  ,
      "Cart": "Cart"  ,
      "New Customer": "New Customer"  ,
      "Checkout Options": "Checkout Options"  ,
      "Register Account": "Register Account"  ,
      "uest Account": "uest Account"  ,
      "Returning Customer": "Returning Customer"  ,
      "Enter your password": "Enter your password"  ,
      "Enter your confirm password": "Enter your confirm password"  ,
      "Continue": "Continue"  ,
      "I want to use an existing address": "I want to use an existing address"  ,
      "I want to use new address": "I want to use new address"  ,
      "Place Order": "Place Order"  ,
      "Product": "Product"  ,
      "Summary": "Summary"  ,
      "Price": "Price"  ,
      "Total": "Total"  ,
      "Quantity": "Quantity"  ,
      "Continue Shopping": "Continue Shopping"  ,
      "Check Out": "Check Out"  ,
      "Estimate Shipping": "Estimate Shipping"  ,
      "Sub-Total": "Sub-Total"  ,
      "Enter your destination to get a shipping estimate": "Enter your destination to get a shipping estimate"  ,
      "Delivery Charges": "Delivery Charges"  ,
      "Coupan Discount": "Coupan Discount"  ,
      "Apply Coupan": "Apply Coupan"  ,
      "Apply": "Apply"  ,
      "Total Amount": "Total Amount"  ,
      "Size": "Size"  ,
      "My Cart": "My Cart"  ,
      "View Cart": "View Cart"  ,
      "Checkout": "Checkout"  ,
      "Color": "Color"  ,
      "Delivery Method": "Delivery Method"  ,
      "Please select the preferred shipping method to use on this": "Please select the preferred shipping method to use on this order."  ,
      "Free Shipping": "Free Shipping"  ,
      "Flat Rate": "Flat Rate"  ,
      "Add Comments About Your Order": "Add Comments About Your Order"  ,
      "Payment Method": "Payment Method"  ,
      "Cash On Delivery": "Cash On Delivery"  ,
      "I have read and agree": "I have read and agree to the Terms &amp; Conditions"  ,
      "By creating an account": "By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made."  ,
      "Please select the preferred payment method to use on this order.": "Please select the preferred payment method to use on this order."  ,
      "Features": "Features"  ,
      "Color Scheme": "Color Scheme"  ,
      "Backgroung": "Backgroung"  ,
      "Full Screen mode": "Full Screen mode"  ,
      "Mode": "Mode"  ,
      "On": "On"  ,
      "Off": "Off"  ,
      "Dark mode": "Dark mode"  ,
      "RTL mode": "RTL mode"  ,
      "Clear local storage": "Clear local storage"  ,
      "Clear Cache Default": "Clear Cache &amp; Default"  ,
      "Next": "Next"  ,
      "Previous": "Previous"  ,
      "Feature Items": "Feature Items"  ,
      "Limited Time Offer": "Limited Time Offer"  ,
      "Review": "Review"  ,
      "Testimonial": "Testimonial"  ,
      "Client Review": "Client Review"  ,
      "What say client about us": "What say client about us"  ,
      "Free shipping on all": "Free shipping on all US order or order above $200"  ,
      "30 Days Return": "30 Days Return"  ,
      "Simply return it within 30 days for an exchange": "Simply return it within 30 days for an exchange"  ,
      "Payment Secure": "Payment Secure"  ,
      "Contact us 24 hours a day, 7 days a week" : "Contact us 24 hours a day, 7 days a week" ,
      "Support": "Support"  ,
      "order": "order"  ,
      "Expected arrival": "Expected arrival"  ,
      "Grasshoppers": "Grasshoppers"  ,
      "processed": "processed"  ,
      "designing": "designing"  ,
      "shipped": "shipped"  ,
      "arrived": "arrived"  ,
      "enroute": "enroute"  ,
      "Subscribe Newsletter": "Subscribe Newsletter"  ,
      "Subscribe the ekka ecommerce to get in touch and get the future update.": "Subscribe the ekka ecommerce to get in touch and get the future update."  ,
      "Need Help?": "Need Help?"  ,
      "Chat with us on WhatsApp": "Chat with us on WhatsApp"  ,
      "mins ago": "mins ago"  ,
      "left": "left"  ,
      "All Rights Reserved": "All Rights Reserved"  ,
      "Copyright": "Copyright"  ,
      "Delivery Information": "Delivery Information"  ,
      "Minutes ago": "Minutes ago"  ,
      "Someone in new just bought": "Someone in new just bought"  ,
      "New Arrivals": "New Arrivals"  ,
      "Browse The Collection of Top Products": "Browse The Collection of Top Products"  ,
      "Sale": "Sale"  ,
      "New": "New"  ,
      "Be the first to review this product": "Be the first to review this product"  ,
      "Shop All Collection": "Shop All Collection"  ,
      "real time": "real time"  ,
      "sales accelerators": "sales accelerators"  ,
      "in stock": "in stock"  ,
      "Hurry up": "Hurry up"  ,
      "visitor right now!": "visitor right now!"  ,
      "Time is Running Out!": "Time is Running Out!"  ,
      "As low as": "As low as"  ,
      "IN STOCK": "IN STOCK"  ,
      "Add To Cart": "Add To Cart"  ,
      "More Information": "More Information"  ,
      "Reviews": "Reviews"  ,
      "Detail": "Detail"  ,
      "Add a Review": "Add a Review"  ,
      "Best Sellers": "Best Sellers"  ,
      "Our Top Collection": "Our Top Collection"  ,
      "All": "All"  ,
      "Enter your Post Code": "Enter your Post Code"  ,
      "Enter your Country": "Enter your Country"  ,
      "Enter your state": "Enter your state"  ,
      "Enter your City": "Enter your City"  ,
      "Password": "Password"  ,
      "Confirm Password": "Confirm Password"  ,
      "firstname field is required": "firstname field is required"  ,
      "lastname field is required": "lastname field is required"  ,
      "email field is required": "email field is required"  ,
      "email must be email": "email must be email"  ,
      "password field is required": "password field is required"  ,
      "confirm password field is required": "confirm password field is required"  ,
      "confirm password must be the same as password": "confirm password must be the same as password"  ,
      "address field is required": "address field is required"  ,
      "city field is required": "city field is required"  ,
      "country field is required": "country field is required"  ,
      "Done": "Done"  ,
      "please confirm your email": "please confirm your email"  ,
      "OK": "OK"  ,
      "Log In": "Log In"  ,
      "email or password is incorrect": "email or password is incorrect"  ,
      "your account is suspended": "your account is suspended"  ,
      "Confirm your email Please": "Confirm your email Please"  ,
      "the email already exists": "the email already exists"  ,
      "email not exist": "email not exist"  ,
      "something went wrong": "something went wrong"  ,
      "new Sent password": "new Sent password"  ,
      "Confirmation succeeded, you can login now": "Confirmation succeeded, you can login now"  ,
      "id not exist": "id not exist"  ,
      "Update": "Update"  ,
      "men": "men"  ,
      "Remove": "Remove"  ,
      "Wishlist": "Wishlist"  ,
      "shop now": "shop now"  ,
      "home": "home"  ,
      "lighting": "lighting"  ,
      "Sort by": "Sort by"  ,
      "Position": "Position"  ,
      "Latest": "Latest"  ,
      "Oldest": "Oldest"  ,
      "Price, low to high": "Price, low to high"  ,
      "Price, high to low": "Price, high to low"  ,
      "Name, A to Z": "Name, A to Z"  ,
      "Name, Z to A": "Name, Z to A"  ,
      "Showing": "Showing"  ,
      "of": "of"  ,
      "item(s)": "item(s)"  ,
      "Categories": "Categories"  ,
      "More": "More"  ,
      "Less": "Less"  ,
      "Price Range": "Price Range"  ,
      "Filter Products By": "Filter Products By"  ,
      "Rate": "Rate"  ,
      "comment field is required": "comment field is required"  ,
      "thank you for contacting us we will reply as soon as possible": "thank you for contacting us we will reply as soon as possible"  ,
      "something went wrong please try again": "something went wrong please try again"  ,
      "Thank you for subscribing we will back as soon as possible": "Thank you for subscribing we will back as soon as possible"  ,
      "Thank you for subscribing": "Thank you for subscribing"  ,
      "Privacy Policy": "Privacy Policy"  ,
      "Terms Condition": "Terms Condition"  ,
      "Get instant updates about our new products and special promos!": "Get instant updates about our new products and special promos!"  ,
      "Information": "Information"  ,
      "Services": "Services"  ,
      "File too large": "File too large"  ,
      "Edit Detail": "Edit Detail"  ,
      "Hello": "Hello"  ,
      "From your account you can easily view and track orders. You can manage and change your account information like address, contact information and history of orders.": "From your account you can easily view and track orders. You can manage and change your account information like address, contact information and history of orders."  ,
      "Account Information": "Account Information"  ,
      "User Profile": "User Profile"  ,
      "Orders": "Orders"  ,
      "Account Details": "Account Details"  ,
      "Shipping Address": "Shipping Address"  ,
      "Product History": "Product History"  ,
      "Shop Now": "Shop Now"  ,
      "Image": "Image"  ,
      "Name": "Name"  ,
      "Qty": "Qty"  ,
      "To": "To"  ,
      "My Menu": "My Menu"  
      
    }
  },
  ar: {
    translation: {
      "Welcome to React": "نننننننننننننننننننننننننننننننن"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;