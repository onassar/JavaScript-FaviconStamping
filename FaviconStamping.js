
/**
 * FaviconStamping
 * 
 * @see     https://codepen.io/djekl/pen/QWKNNjv
 * @see     https://stackoverflow.com/questions/6300749/is-there-a-way-to-use-max-width-and-height-for-a-background-image
 * @see     https://github.com/microlinkhq/unavatar
 * @see     https://unavatar.io/
 * @access  public
 * @var     Object
 */
var FaviconStamping = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __config
     * 
     * @access  private
     * @var     Object
     */
    var __config = {

        /**
         * selectors
         * 
         * @access  private
         * @var     Object
         */
        selectors: [
            '.favicon'
        ]
    };

    /**
     * __string
     * 
     * @access  private
     * @var     String (default: 'FaviconStamping')
     */
    var __string = 'FaviconStamping';

    /**
     * Methods
     * 
     */

    /**
     * __getDuckDuckGoFaviconURL
     * 
     * @access  private
     * @param   HTMLElement $element
     * @return  String
     */
    var __getDuckDuckGoFaviconURL = function($element) {
        var hostname = __getHostname($element),
            faviconURL = 'https://icons.duckduckgo.com/ip3/' + (hostname) + '.ico';
        return faviconURL;
    };

    // /**
    //  * __getGoogleFaviconURL
    //  * 
    //  * @access  private
    //  * @param   HTMLElement $element
    //  * @return  String
    //  */
    // var __getGoogleFaviconURL = function($element) {
    //     var href = $element.getAttribute('href'),
    //         url = new URL(href),
    //         hostname = url.hostname,
    //         faviconURL = 'https://unavatar.io/' + (hostname) + '.ico';
    //     return faviconURL;
    // };

    // /**
    //  * __getUnavatarFaviconURL
    //  * 
    //  * @access  private
    //  * @param   HTMLElement $element
    //  * @return  String
    //  */
    // var __getUnavatarFaviconURL = function($element) {
    //     var href = $element.getAttribute('href'),
    //         url = new URL(href),
    //         hostname = url.hostname,
    //         faviconURL = 'https://unavatar.io/' + (hostname) + '.ico';
    //     return faviconURL;
    // };

    /**
     * __getHostname
     * 
     * @access  private
     * @param   HTMLElement $element
     * @return  String
     */
    var __getHostname = function($element) {
        var href = $element.getAttribute('href'),
            url = new URL(href),
            hostname = url.hostname;
        if (hostname === 'dash.cloudflare.com') {
            hostname = 'cloudflare.com';
        }
        return hostname;
    };

    /**
     * __getSelector
     * 
     * @access  private
     * @return  String
     */
    var __getSelector = function() {
        var selectors = __config.selectors,
            selector = selectors.join(',');
        return selector;
    };

    /**
     * __includeFavicon
     * 
     * @access  private
     * @param   HTMLElement $element
     * @return  void
     */
    var __includeFavicon = function($element) {
        var faviconURL = __getDuckDuckGoFaviconURL($element);
        $element.style.backgroundImage = 'url("' + (faviconURL) + '")';
        $element.style.backgroundRepeat = 'no-repeat';
        $element.style.paddingLeft = '20px';
        // $element.style.backgroundSize = 'contain';
        $element.style.backgroundSize = 'auto 75%';
        $element.style.backgroundPosition = 'left center';

    };

    /**
     * __scan
     * 
     * @access  private
     * @return  void
     */
    var __scan = function() {
        var selector = __getSelector(),
            $elements = document.querySelectorAll(selector);
        for (var $element of $elements) {
            __includeFavicon($element);
        }
    };

    /**
     * Public methods
     */
    return {

        /**
         * init
         * 
         * @access  public
         * @return  Boolean
         */
        init: function() {
            __scan();
            return true;
        },

        /**
         * setConfig
         * 
         * @access  public
         * @param   Object|String key
         * @param   undefined|String value
         * @return  Boolean
         */
        setConfig: function(key, value) {
            if (typeof key === 'object') {
                var config = key;
                __config = config;
                return true;
            }
            __config[key] = value;
            return true;
        }
    };
})();
