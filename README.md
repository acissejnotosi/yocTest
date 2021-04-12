# YOC Test: React Component For A Video Advertisement

## Description

In this project the videoAd component displays a video advertisement on a web page. The video is initially paused and the sound is turned off. When the video is at least 50% visible the play event is triggered. 

While the video is playing, several messages are displayed in the console.log of the browser. The intention of these messages is to alert the user when the video has started and how much percent of the video has been played. Also, after 2 seconds a message appears alerting that the video is now considered viewable according to IAB/MRC.

## Instalation

For instalation, please download or clone the project to your local git repository. Initialize Visual Studio Code and open the folder where the project is hold. Install the dependencies by using the command below.

### `npm install`

Use command below to run the app in the development mode .\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

## Browser Compatibility

The project was tested using Android and Galasy S5 dimensions on Google Chrome browser.

## Intersection Observer

To determine when the video advertisement was in the viewport with at least 50% threshold the IntersectionObserver API was used. For more information about the IntersectionObserver API please visit https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API.

## Testing

The Cypress testing framework was used for testing. Jest could be used for testing, but Cypress were a easier way to have things tested faster.

The tests were made based on the main functionalities in order to guarantee they were working correctly.
