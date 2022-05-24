# JavaScript-FaviconStamping

In my admin (and other) interfaces, I like to put a little favicon next to links
in order to quickly identify them. Therefore, I thought a small JavaScript
library that would inject favicons (from [DuckDuckGo](https://duckduckgo.com/)
at the moment) could be useful for others.

And thus we have `JavaScript-FaviconStamper`.

Simple goals:

- Lookup `HTMLElement`s that match the `config` selectors
- Check the `href` value for those elements (presumably `HTMLAnchorElement`s)
- Grab the `hostname` for that `HTMLElement`
- Make some space for a favicon
- Set the `background-image` (and other relevant properties) for the elemtn

### Usage
Usage:

``` javascript
FaviconStamper.init();
```

### Code: Before
``` html
<a href="https://olivernassar.com/" class="favicon">Oliver Nassar</a>
```

### Code: After
``` html
<a href="https://olivernassar.com/" class="favicon" style="background-image: url("https://icons.duckduckgo.com/ip3/olivernassar.com.ico"); background-repeat: no-repeat; padding-left: 20px; background-size: auto 75%; background-position: left center;">Oliver Nassar</a>
```

### UI


| Before  | After |
| ------------- | ------------- |
| ![](https://i.imgur.com/VK3RUIq.png)  | ![](https://i.imgur.com/O9O2jYu.png)  |
| Content Cell  | Content Cell  |


| Before    | After     |
|-----------------------|
| ![](https://i.imgur.com/VK3RUIq.png) | ![](https://i.imgur.com/O9O2jYu.png) |

