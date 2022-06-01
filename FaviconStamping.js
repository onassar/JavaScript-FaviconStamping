
/**
 * FaviconStamping
 * 
 * @see     https://codepen.io/djekl/pen/QWKNNjv
 * @see     https://stackoverflow.com/questions/6300749/is-there-a-way-to-use-max-width-and-height-for-a-background-image
 * @see     https://github.com/microlinkhq/unavatar
 * @see     https://unavatar.io/
 * @see     https://css-tricks.com/favicons-next-to-external-links/
 * @see     https://www.google.com/s2/u/0/favicons?domain=css-tricks.com
 * @todo    Add ability to choose between favicon providers
 * @todo    Add DOM change event listeners to handle dynamically added elements
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
         * defaultProviderKey
         * 
         * @access  private
         * @var     String (default: 'duckDuckGo')
         */
        defaultProviderKey: 'duckDuckGo',
        // defaultProviderKey: 'google',

        /**
         * hostnameOverrideMapping
         * 
         * Stores a hash which is used to determine whether specific hostnames
         * should have their hostname swapped out when requesting a favicon.
         * This is useful for hostnames which may not have favicon settings
         * configured, but are naturally associated with another hostname.
         * 
         * @access  private
         * @var     Object
         */
        hostnameOverrideMapping: {
            'dash.cloudflare.com': 'cloudflare.com'
        },

        /**
         * hostnameProviderMapping
         * 
         * Stores a hash which is used to determine whether specific hostnames
         * should have their provider overridden (likely because one provider
         * doesn't return a good icon for specific hostnames).
         * 
         * @access  private
         * @var     Object
         */
        hostnameProviderMapping: {
            'canva.com': 'google',
            'www.canva.com': 'google'
        },

        /**
         * selectors
         * 
         * The selectors to stamp with a favicon.
         * 
         * @access  private
         * @var     Array
         */
        selectors: [
            '.favicon'
        ],

        /**
         * styles
         * 
         * @access  private
         * @var     Object
         */
        styles: {
            paddingLeft: '20px'
        }
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
     * __getFaviconURL
     * 
     * @access  private
     * @param   HTMLElement $element
     * @return  String
     */
    var __getFaviconURL = function($element) {
        var providerFunction = __getProviderFunction($element),
            faviconURL = providerFunction($element);
        return faviconURL;
    };

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
        hostname = __config.hostnameOverrideMapping[hostname] || hostname;
        return hostname;
    };

    /**
     * __getProviderFunction
     * 
     * @access  private
     * @param   HTMLElement $element
     * @return  Function
     */
    var __getProviderFunction = function($element) {
        var defaultProviderKey = __config.defaultProviderKey,
            hostname = __getHostname($element),
            providerKey = __config.hostnameProviderMapping[hostname] || defaultProviderKey,
            fn = __providers[providerKey];
        return fn;
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
        var faviconURL = __getFaviconURL($element);
        $element.style.backgroundImage = 'url("' + (faviconURL) + '")';
        $element.style.backgroundRepeat = 'no-repeat';
        $element.style.paddingLeft = __config.styles.paddingLeft;
        // $element.style.backgroundSize = 'contain';
        $element.style.backgroundSize = 'auto 75%';
        $element.style.backgroundPosition = 'left center';

    };

    /**
     * __providers
     * 
     * @access  private
     * @var     Object
     */
    var __providers = {

        /**
         * 1Password
         * 
         * @todo    Implement
         * @access  private
         * @param   HTMLElement $element
         * @return  String
         */
        '1Password': function($element) {
            throw new Error('Implement');
            // var href = $element.getAttribute('href'),
            //     url = new URL(href),
            //     hostname = url.hostname,
            //     faviconURL = 'https://c.1password.com/richicons/images/login/120/' + (hostname) + '.png';
            // return faviconURL;
        },

        /**
         * duckDuckGo
         * 
         * @access  private
         * @param   HTMLElement $element
         * @return  String
         */
        duckDuckGo: function($element) {
            var hostname = __getHostname($element),
                faviconURL = 'https://icons.duckduckgo.com/ip3/' + (hostname) + '.ico';
            return faviconURL;
        },

        /**
         * google
         * 
         * @access  private
         * @param   HTMLElement $element
         * @return  String
         */
        google: function($element) {
            var hostname = __getHostname($element),
                faviconURL = 'https://www.google.com/s2/favicons?domain=' + (hostname);
            return faviconURL;
        },

        /**
         * __getUnavatarFaviconURL
         * 
         * @todo    Implement
         * @access  private
         * @param   HTMLElement $element
         * @return  String
         */
        unavatar: function($element) {
            throw new Error('Implement');
            // var href = $element.getAttribute('href'),
            //     url = new URL(href),
            //     hostname = url.hostname,
            //     faviconURL = 'https://unavatar.io/' + (hostname) + '.ico';
            // return faviconURL;
        }
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
