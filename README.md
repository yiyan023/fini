# What was the project / assignment? 🚀
To create an app that displays a card-based image viewer that shows restaurants in the local area of the device

# What were the requirements? ✅
- Use the Location Service and the Yelp API to load restaurants in the current area of the device
- The main view will contain a stack of cards.
- Use the Location Service and the Yelp API to load restaurants in the current area of the device.
- The main view will contain a stack of cards.
- Each card should display the name of the restaurant, the restaurant image, and the rating.
- The viewer should have two buttons, one for the next card and one for the previous one.
- The next button dismisses the current card at the top of the stack. Dismissal should animate the card offscreen to the left revealing the next card.
- The previous button brings back the previously shown card. This should animate the previous card back on screen from the left.
- Your implementation should work on multiple screen sizes.
- Your implementation should automatically load more results from the Yelp API when the user reaches near the end of the card stack.
- The feed should allow the user to browse endlessly. When the user nears the end of the card stack, the app should automatically load more results from the Yelp API. This should load seamlessly in the background with minimal impact to the user experience.
- The user interface doesn’t need to match the demonstration gif exactly—feel free to be creative.

# How long did you spend working on the problem? What did you find to be the most difficult part? ⏰
I spent approximately 3 hours working on the problem, and the most challenging task was navigating how to create the card stack animation. Specifically, understanding the event callbacks and card props from the react-native-deck-swiper library (i.e. swiping left to reveal the previous card, swiping right to reveal the next card, showing the image & rating from Yelp API) had a steep learning curve that I had to figure out during the assignment.

This link helped me grasp the basics & implement functions into my project: [https://www.npmjs.com/package/react-native-deck-swiper](url). 

# What trade-offs did you make? What did you choose to spend time on, and what did you choose to ignore or do quickly for the sake of completing the project? ⁉️
After creating the card stack animation with react-native-deck-swiper, I realized that this library did not support the customization of their event callbacks. As a result, I could not animate the previous card back on the screen from the left. But with everything I accomplished, recreating my work to change one animation felt like a waste of all my work. Consequently, I made this trade-off to focus on adding creative improvements to the user interface. From a marketing perspective, creating a visually appealing user interface is also beneficial for attracting a larger audience. Thus, after completing the basic functionality requirements for this project, I decided to spend more time creating an aesthetically pleasing front end by experimenting with images, fonts and margins.

# If you finished with extra time, what improvements did you make that go above and beyond the requirements? ✨
- Customized user interface to be compatible with landscape mode – however, I removed the image of the restaurant to make the card stack as visually appealing as possible with the remaining time
- Logo, font and margin customizations were made to add vibrance to the user interface
- Converted the restaurant ratings (number) to a star-scale model: gold-filled stars for full ratings and gold-outlined stars for half ratings
- Turned the buttons into arrow symbols using the TouchableOpacity component, which allows the developer to handle touch events in a declarative way
- The user can also swipe the cards without pressing the buttons
