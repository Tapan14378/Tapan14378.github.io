// listing vars here so they're in the global scope
var cards, nCards, cover, openContent, openContentText, pageIsOpen = false,
    openContentImage, closeContent, windowWidth, windowHeight, currentCard;

// Define an array of paragraph texts corresponding to each card
var paragraphTexts = [
  '<p>Explores breast cancer prediction using machine learning. Begins with preprocessing to clean and normalize data. Implements three models: Logistic Regression, Random Forest, and ANN-based Deep Learning. Evaluates model performance metrics and compares results. Concludes with a comprehensive comparison of strengths, weaknesses, and insights gained. <a href="https://github.com/Tapan14378/Breast-cancer-prediction"> Github link</a></p>',
  '<p>This code uses YOLOv3, a model for spotting objects in real-time. Its programmed to count the number of people seen in each video frame taken by a camera. YOLOv3 is set up with pre-trained weights and settings. It recognizes various objects, like people, which are listed in a file. The code takes frames from the camera, tweaks them a bit, and runs them through YOLOv3 to spot objects. It marks the frames with boxes and labels for "person" detections. The code also tracks how many people it sees, showing the count in green on each frame. It keeps going until the user stops it.<a href="https://github.com/Tapan14378/People-detection"> Github link</a></p>',
  '<p>The Object Detection Assistance code is a revolutionary application designed to empower visually impaired individuals in locating specific objects in their surroundings. Leveraging advanced object detection algorithms, this software interprets spoken commands from the user and actively scans the environment using a camera feed to identify the requested objects. The system is activated through voice commands provided by the user, initiating the object detection process, which occurs in real-time, ensuring quick and accurate results. Upon detecting the target object in the camera view, the system emits a distinct beep, serving as an auditory cue to alert the user of its presence. As the user approaches the detected object, the frequency of the beeps increases, indicating closeness, thus assisting the user in navigating towards the object with precision and confidence. The interface is designed to be intuitive and accessible, catering to users with varying levels of technological expertise, with clear audio prompts guiding the user through the interaction process, ensuring a seamless experience. The system supports the recognition of a wide range of objects, allowing users to specify their desired targets with flexibility, whether its a bottle, a chair, or a smartphone. This code has the potential to significantly enhance the independence and mobility of visually impaired individuals, promoting greater autonomy in daily activities such as navigation, shopping, and household chores, while fostering inclusivity and empowerment within the visually impaired community.<a href="https://github.com/Tapan14378/Object-detection-for-Blind"> Github link</a></p>',
  '<p>This computer vision program employs pose detection to analyze a persons movements and identify if they are performing a deadlift exercise. It utilizes the Mediapipe library for pose estimation and OpenCV for video input and visualization. The code initializes variables to track repetitions and body position, sets up the webcam as the video source, and processes each frame to estimate pose and detect facial landmarks. By examining the positions of shoulders and hips, it determines whether the person is in the "up" or "down" position of the deadlift. This information is displayed in real-time, providing feedback on repetitions and body state.<a href="https://github.com/Tapan14378/Deadlift_detection"> Github link</a></p>',
  '<p>This solver, based on constraint programming principles, utilizes Google or similar tools for ride matching, efficiently pairing individuals with similar travel destinations. By analyzing all customer requests, it identifies optimal matches, thereby reducing the number of vehicles on the road and minimizing carbon emissions. Additionally, it introduces a flexible option for "shifters" who can alternate between driving and riding roles, further optimizing resource utilization and promoting environmental sustainability. Through its seamless matching process and integration of versatile user roles, this solver contributes to easier traffic management and fosters a greener, more eco-friendly transportation ecosystem.<a href="https://github.com/Tapan14378/Dissertation-Solver"> Github link</a></p>',
  '<p>As a self-taught web developer with a passion for learning and growth, Ive created this platform entirely from scratch, alongside another website equipped with a SQL database, login, and register page, all without any prior web development experience. Through dedicated self-study, tutorial watching, and leveraging open-source resources, Ive honed my skills and embraced the journey of turning my ideas into digital reality. Join me on this exciting path of exploration and discovery! <a href="https://github.com/Tapan14378/Tapan14378.github.io"> Github Link </a> for this website And for <a href="https://github.com/Tapan14378/Dissertation-Website"> Github Link </a> SQL based RideShare Match: Optimizing website</p>'
];

// initiate the process
init();

function init() {
  resize();
  selectElements();
  attachListeners();
}

// select all the elements in the DOM that are going to be used
function selectElements() {
  cards = document.getElementsByClassName('card'),
  nCards = cards.length,
  cover = document.getElementById('cover'),
  openContent = document.getElementById('open-content'),
  openContentText = document.getElementById('open-content-text'),
  openContentImage = document.getElementById('open-content-image')
  closeContent = document.getElementById('close-content');
}

/* Attaching three event listeners here:
  - a click event listener for each card
  - a click event listener to the close button
  - a resize event listener on the window
*/
function attachListeners() {
  for (var i = 0; i < nCards; i++) {
    attachListenerToCard(i);
  }
  closeContent.addEventListener('click', onCloseClick);
  window.addEventListener('resize', resize);
}

function attachListenerToCard(i) {
  cards[i].addEventListener('click', function(e) {
    var card = getCardElement(e.target);
    onCardClick(card, i);
  })
}

/* When a card is clicked */
function onCardClick(card, i) {
  // set the current card
  currentCard = card;
  // add the 'clicked' class to the card, so it animates out
  currentCard.className += ' clicked';
  // animate the card 'cover' after a 500ms delay
  setTimeout(function() {animateCoverUp(currentCard, i)}, 500);
  // animate out the other cards
  animateOtherCards(currentCard, true);
  // add the open class to the page content
  openContent.className += ' open';
}

/*
* This effect is created by taking a separate 'cover' div, placing
* it in the same position as the clicked card, and animating it to
* become the background of the opened 'page'.
* It looks like the card itself is animating in to the background,
* but doing it this way is more performant (because the cover div is
* absolutely positioned and has no children), and there's just less
* having to deal with z-index and other elements in the card
*/
function animateCoverUp(card, i) {
  // get the position of the clicked card
  var cardPosition = card.getBoundingClientRect();
  // get the style of the clicked card
  var cardStyle = getComputedStyle(card);
  setCoverPosition(cardPosition);
  setCoverColor(cardStyle);
  scaleCoverToFillWindow(cardPosition);
  // update the content of the opened page
  openContentText.innerHTML = '<h1>'+card.children[2].textContent+'</h1>'+paragraphTexts[i];
  openContentImage.src = card.children[1].src;
  setTimeout(function() {
    // update the scroll position to 0 (so it is at the top of the 'opened' page)
    window.scroll(0, 0);
    // set page to open
    pageIsOpen = true;
  }, 300);
}

function animateCoverBack(card) {
  var cardPosition = card.getBoundingClientRect();
  // the original card may be in a different position, because of scrolling, so the cover position needs to be reset before scaling back down
  setCoverPosition(cardPosition);
  scaleCoverToFillWindow(cardPosition);
  // animate scale back to the card size and position
  cover.style.transform = 'scaleX('+1+') scaleY('+1+') translate3d('+(0)+'px, '+(0)+'px, 0px)';
  setTimeout(function() {
    // set content back to empty
    openContentText.innerHTML = '';
    openContentImage.src = '';
    // style the cover to 0x0 so it is hidden
    cover.style.width = '0px';
    cover.style.height = '0px';
    pageIsOpen = false;
    // remove the clicked class so the card animates back in
    currentCard.className = currentCard.className.replace(' clicked', '');
  }, 301);
}

function setCoverPosition(cardPosition) {
  // style the cover so it is in exactly the same position as the card
  cover.style.left = cardPosition.left + 'px';
  cover.style.top = cardPosition.top + 'px';
  cover.style.width = cardPosition.width + 'px';
  cover.style.height = cardPosition.height + 'px';
}

function setCoverColor(cardStyle) {
  // style the cover to be the same color as the card
  cover.style.backgroundColor = cardStyle.backgroundColor;
}

function scaleCoverToFillWindow(cardPosition) {
  // calculate the scale and position for the card to fill the page,
  var scaleX = windowWidth / cardPosition.width;
  var scaleY = windowHeight / cardPosition.height;
  var offsetX = (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
  var offsetY = (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
  // set the transform on the cover - it will animate because of the transition set on it in the CSS
  cover.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+') translate3d('+(offsetX)+'px, '+(offsetY)+'px, 0px)';
}

/* When the close is clicked */
function onCloseClick() {
  // remove the open class so the page content animates out
  openContent.className = openContent.className.replace(' open', '');
  // animate the cover back to the original position card and size
  animateCoverBack(currentCard);
  // animate in other cards
  animateOtherCards(currentCard, false);
}

function animateOtherCards(card, out) {
  var delay = 100;
  for (var i = 0; i < nCards; i++) {
    // animate cards on a stagger, 1 each 100ms
    if (cards[i] === card) continue;
    if (out) animateOutCard(cards[i], delay);
    else animateInCard(cards[i], delay);
    delay += 100;
  }
}

// animations on individual cards (by adding/removing card names)
function animateOutCard(card, delay) {
  setTimeout(function() {
    card.className += ' out';
   }, delay);
}

function animateInCard(card, delay) {
  setTimeout(function() {
    card.className = card.className.replace(' out', '');
  }, delay);
}

// this function searches up the DOM tree until it reaches the card element that has been clicked
function getCardElement(el) {
  if (el.className.indexOf('card ') > -1) return el;
  else return getCardElement(el.parentElement);
}

// resize function - records the window width and height
function resize() {
  if (pageIsOpen) {
    // update position of cover
    var cardPosition = currentCard.getBoundingClientRect();
    setCoverPosition(cardPosition);
    scaleCoverToFillWindow(cardPosition);
  }
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}
