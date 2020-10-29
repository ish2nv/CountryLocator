# Country Locator

A intensively coded website that allows users to click anywhere on the map to find information about the country and the area clicked. For example, the countries capital, population, currency, nearby streets, current weather, weather forecast and related Wikipedia links of the area. It can also find the users current location and show results of what's nearby. This was easily achievable through the HTML geolocation API.

This project was achievable through other APIs (weather, nearby streets etc.), that helped obtain information. The only input required to gather the correct information is by providing the longitude and latitude values. That's all!

Another feature the website has is it highlights the selected countries border. This was achieveable through a bulky json file that contained the coordinates of all countries border. Once the other APIs figure out the country name of where the user clicked, finding the entry within the json file is straightforward

Click to view a demo: [Country Locator](https://shahali.org/)
