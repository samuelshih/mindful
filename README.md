# Mindful
* [iOS Keyboard Extension](https://github.com/edwickable/mindful-keyboard/)
* [Pennapps XV Devpost](https://devpost.com/software/mindful-t7ovb5)

## Inspiration
We believe that your behavior online, communication with friends, interactions with your smartphone all relate to how you're feeling throughout the day. We thought - wouldn't it be helpful to track your mental health and emotions as you use your phone?

## What does it do?
Mindful helps you document your mental health passively. Just by using your iPhone, you'll get data recorded analyzing your emotions throughout the day. You can see this data represented with line and radar graphs on an associated website.

## How does it work?
We built a custom iOS keyboard extension that sends your writing to IBM Watson's Alchemy API for sentiment analysis. This request is formatted and stored in a Node.js app where we persist entries by minute or hour. Within each time block, we compute average sentiment scores and then output them into different graphs. The line graph shows the average percent of Anger, Disgust, Fear, Joy, and Sadness detected in your writing. The radar graph aggregates the current total average of the five emotions throughout the day. Finally, the circular pie charts gives isolated statistics about each emotion in an easy to read way.

## Accomplishments that we're proud of
We managed to work with iOS and node.js, having connected multiple elements of a complex architecture with REST API endpoints. Also, we're proud of creating a useful app that we would use ourselves.

## What we learned
We learned about data visualizations, formatting data from HTTP results, how to integrate a mobile app with a web server, and this is our first time using Objective-C.

## What's next for Mindful
We hope to expand Mindful to use user's data from Facebook, Twitter, Emails, etc. To scale up, we hope to add a database that can store the sentiment analysis data for multiple users who can be authenticated with OAuth. This would make Mindful a market ready product.


```
For the demo, emotions are indexed by a timestamp which reads <hours>_<minute>, which have values 0-23 and 0-60 respectively
```
