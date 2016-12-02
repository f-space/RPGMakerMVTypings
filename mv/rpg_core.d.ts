//=============================================================================
// rpg_core.js v1.3.4
//=============================================================================

//-----------------------------------------------------------------------------
/**
 * This is not a class, but contains some methods that will be added to the
 * standard Javascript objects.
 */
declare class JsExtensions {
	/**
	 * @class JsExtensions
	 */
	private constructor();
}

declare interface Number {
	/**
	 * Returns a number whose value is limited to the given range.
	 *
	 * @method Number.prototype.clamp
	 * @param {Number} min The lower boundary
	 * @param {Number} max The upper boundary
	 * @return {Number} A number in the range (min, max)
	 */
	clamp(min: number, max: number): number;

	/**
	 * Returns a modulo value which is always positive.
	 *
	 * @method Number.prototype.mod
	 * @param {Number} n The divisor
	 * @return {Number} A modulo value
	 */
	mod(n: number): number;

	/**
	 * Makes a number string with leading zeros.
	 *
	 * @method Number.prototype.padZero
	 * @param {Number} length The length of the output string
	 * @return {String} A string with leading zeros
	 */
	padZero(length: number): string;
}

declare interface String {
	/**
	 * Replaces %1, %2 and so on in the string to the arguments.
	 *
	 * @method String.prototype.format
	 * @param {Any} ...args The objects to format
	 * @return {String} A formatted string
	 */
	format(...args: any[]): string;

	/**
	 * Makes a number string with leading zeros.
	 *
	 * @method String.prototype.padZero
	 * @param {Number} length The length of the output string
	 * @return {String} A string with leading zeros
	 */
	padZero(length: number): string;

	/**
	 * Checks whether the string contains a given string.
	 *
	 * @method String.prototype.contains
	 * @param {String} string The string to search for
	 * @return {Boolean} True if the string contains a given string
	 */
	contains(string: string): boolean;
}

declare interface Array<T> {
	/**
	 * Checks whether the two arrays are same.
	 *
	 * @method Array.prototype.equals
	 * @param {Array} array The array to compare to
	 * @return {Boolean} True if the two arrays are same
	 */
	equal(array: Array<T>): boolean;

	/**
	 * Makes a shallow copy of the array.
	 *
	 * @method Array.prototype.clone
	 * @return {Array} A shallow copy of the array
	 */
	clone(): Array<T>;

	/**
	 * Checks whether the array contains a given element.
	 *
	 * @method Array.prototype.contains
	 * @param {Any} element The element to search for
	 * @return {Boolean} True if the array contains a given element
	 */
	contains(element: T): boolean;
}

declare interface Math {
	/**
	 * Generates a random integer in the range (0, max-1).
	 *
	 * @static
	 * @method Math.randomInt
	 * @param {Number} max The upper boundary (excluded)
	 * @return {Number} A random integer
	 */
	randomInt(max: number): number;
}

//-----------------------------------------------------------------------------
/**
 * The static class that defines utility methods.
 */
declare class Utils {
	/**
	 * @class Utils
	 */
	private constructor();

	/**
	 * The name of the RPG Maker. 'MV' in the current version.
	 *
	 * @static
	 * @property RPGMAKER_NAME
	 * @type String
	 * @final
	 */
	public static readonly RPGMAKER_NAME: string;

	/**
	 * The version of the RPG Maker.
	 *
	 * @static
	 * @property RPGMAKER_VERSION
	 * @type String
	 * @final
	 */
	public static readonly RPGMAKER_VERSION: string;

	/**
	 * Checks whether the option is in the query string.
	 *
	 * @static
	 * @method isOptionValid
	 * @param {String} name The option name
	 * @return {Boolean} True if the option is in the query string
	 */
	public static isOptionValid(name: string): boolean;

	/**
	 * Checks whether the platform is NW.js.
	 *
	 * @static
	 * @method isNwjs
	 * @return {Boolean} True if the platform is NW.js
	 */
	public static isNwjs(): boolean;

	/**
	 * Checks whether the platform is a mobile device.
	 *
	 * @static
	 * @method isMobileDevice
	 * @return {Boolean} True if the platform is a mobile device
	 */
	public static isMobileDevice(): boolean;

	/**
	 * Checks whether the browser is Mobile Safari.
	 *
	 * @static
	 * @method isMobileSafari
	 * @return {Boolean} True if the browser is Mobile Safari
	 */
	public static isMobileSafari(): boolean;

	/**
	 * Checks whether the browser is Android Chrome.
	 *
	 * @static
	 * @method isAndroidChrome
	 * @return {Boolean} True if the browser is Android Chrome
	 */
	public static isAndroidChrome(): boolean;

	/**
	 * Checks whether the browser can read files in the game folder.
	 *
	 * @static
	 * @method canReadGameFiles
	 * @return {Boolean} True if the browser can read files in the game folder
	 */
	public static canReadGameFiles(): boolean;

	/**
	 * Makes a CSS color string from RGB values.
	 *
	 * @static
	 * @method rgbToCssColor
	 * @param {Number} r The red value in the range (0, 255)
	 * @param {Number} g The green value in the range (0, 255)
	 * @param {Number} b The blue value in the range (0, 255)
	 * @return {String} CSS color string
	 */
	public static rgbToCssColor(r: number, g: number, b: number): string;
}

//-----------------------------------------------------------------------------
/**
 * The resource class. Allows to be collected as a garbage if not use for some time or ticks
 */
declare class CacheEntry {


	/**
	 * @class CacheEntry
	 * @constructor
	 * @param {ResourceManager} resource manager
	 * @param {string} key, url of the resource
	 * @param {string} item - Bitmap, HTML5Audio, WebAudio - whatever you want to store in the cache
	 */
	public constructor(cache: CacheMap, key: string, item: CacheEntryItem);

	public cache: CacheMap;
	public key: string;
	public item: CacheEntryItem;
	public cached: boolean;
	public touchTicks: number;
	public touchSeconds: number;
	public ttlTicks: number;
	public ttlSeconds: number;
	public freedByTTL: boolean;

	/**
	 * frees the resource
	 */
	public free(byTTL?: boolean): void;

	/**
	 * Allocates the resource
	 * @returns {CacheEntry}
	 */
	public allocate(): CacheEntry;

	/**
	 * Sets the time to live
	 * @param {number} ticks TTL in ticks, 0 if not set
	 * @param {number} time TTL in seconds, 0 if not set
	 * @returns {CacheEntry}
	 */
	public setTimeToLive(ticks?: number, seconds?: number): CacheEntry;

	public isStillAlive(): boolean;

	/**
	 * makes sure that resource wont freed by Time To Live
	 * if resource was already freed by TTL, put it in cache again
	 */
	public touch(): void;
}
type CacheEntryItem = Bitmap | Html5Audio | WebAudio;

/**
 * Cache for images, audio, or any other kind of resource
 */
declare class CacheMap {
	/** 
	 * @param manager
	 * @constructor
	 */
	public constructor(manager: any);

	public _inner: { [key: string]: CacheEntry };
	public _lastRemovedEntries: CacheEntry[];
	public manager: any;
	public updateTicks: number;;
	public lastCheckTTL: number;
	public delayCheckTTL: number;
	public updateSeconds: number;

	/**
	 * checks ttl of all elements and removes dead ones
	 */
	public checkTTL(): void;

	/**
	 * cache item
	 * @param key url of cache element
	 * @returns {*|null}
	 */
	public getItem(key: string): CacheEntryItem | null;

	public clear(): void;

	public setItem(key: string, item: CacheEntryItem): CacheEntry;

	public update(ticks: number, delta: number): void;
}

//-----------------------------------------------------------------------------
/**
 * The point class.
 */
declare class Point extends PIXI.Point {
	/**
	 * @class Point
	 * @constructor
	 * @param {Number} x The x coordinate
	 * @param {Number} y The y coordinate
	 */
	public constructor(x: number, y: number);
}

//-----------------------------------------------------------------------------
/**
 * The rectangle class.
 */
declare class Rectangle extends PIXI.Rectangle {
	/** 
	 * @class Rectangle
	 * @constructor
	 * @param {Number} x The x coordinate for the upper-left corner
	 * @param {Number} y The y coordinate for the upper-left corner
	 * @param {Number} width The width of the rectangle
	 * @param {Number} height The height of the rectangle
	 */
	public constructor(x: number, y: number, width: number, height: number);

	/**
	 * @static
	 * @property emptyRectangle
	 * @type Rectangle
	 * @private
	 */
	public static readonly emptyRectangle: Rectangle;
}

//-----------------------------------------------------------------------------
/**
 * The basic object that represents an image.
 */
declare class Bitmap {
	/** 
	 * @class Bitmap
	 * @constructor
	 * @param {Number} width The width of the bitmap
	 * @param {Number} height The height of the bitmap
	 */
	public constructor(width?: number, height?: number);

	public _canvas: HTMLCanvasElement;
	public _context: CanvasRenderingContext2D;
	public _baseTexture: PIXI.BaseTexture;
	public _image: HTMLImageElement | null;
	public _url: string;
	public _paintOpacity: number;
	public _smooth: boolean;
	public _loadListeners: Array<BitmapLoadListener>;
	public _isLoading: boolean;
	public _hasError: boolean;

	/**
	* Cache entry, for images. In all cases _url is the same as cacheEntry.key
	* @type CacheEntry
	*/
	public cacheEntry: CacheEntry | null;

	/**
	 * The face name of the font.
	 *
	 * @property fontFace
	 * @type String
	 */
	public fontFace: string;

	/**
	 * The size of the font in pixels.
	 *
	 * @property fontSize
	 * @type Number
	 */
	public fontSize: number;

	/**
	 * Whether the font is italic.
	 *
	 * @property fontItalic
	 * @type Boolean
	 */
	public fontItalic: boolean;

	/**
	 * The color of the text in CSS format.
	 *
	 * @property textColor
	 * @type String
	 */
	public textColor: string;

	/**
	 * The color of the outline of the text in CSS format.
	 *
	 * @property outlineColor
	 * @type String
	 */
	public outlineColor: string;

	/**
	 * The width of the outline of the text.
	 *
	 * @property outlineWidth
	 * @type Number
	 */
	public outlineWidth: number;

	/**
	 * Loads a image file and returns a new bitmap object.
	 *
	 * @static
	 * @method load
	 * @param {String} url The image url of the texture
	 * @return Bitmap
	 */
	public static load(url: string): Bitmap;

	/**
	 * Takes a snapshot of the game screen and returns a new bitmap object.
	 *
	 * @static
	 * @method snap
	 * @param {Stage} stage The stage object
	 * @return Bitmap
	 */
	public static snap(stage: Stage): Bitmap;

	/**
	 * Checks whether the bitmap is ready to render.
	 *
	 * @method isReady
	 * @return {Boolean} True if the bitmap is ready to render
	 */
	public isReady(): boolean;

	/**
	 * Checks whether a loading error has occurred.
	 *
	 * @method isError
	 * @return {Boolean} True if a loading error has occurred
	 */
	public isError(): boolean;

	/**
	 * touch the resource
	 * @method touch
	 */
	public touch(): void;

	/**
	 * [read-only] The url of the image file.
	 *
	 * @property url
	 * @type String
	 */
	public readonly url: string;

	/**
	 * [read-only] The base texture that holds the image.
	 *
	 * @property baseTexture
	 * @type PIXI.BaseTexture
	 */
	public readonly baseTexture: PIXI.BaseTexture;

	/**
	 * [read-only] The bitmap canvas.
	 *
	 * @property canvas
	 * @type HTMLCanvasElement
	 */
	public readonly canvas: HTMLCanvasElement;

	/**
	 * [read-only] The 2d context of the bitmap canvas.
	 *
	 * @property context
	 * @type CanvasRenderingContext2D
	 */
	public readonly context: CanvasRenderingContext2D;

	/**
	 * [read-only] The width of the bitmap.
	 *
	 * @property width
	 * @type Number
	 */
	public readonly width: number;

	/**
	 * [read-only] The height of the bitmap.
	 *
	 * @property height
	 * @type Number
	 */
	public readonly height: number;

	/**
	 * [read-only] The rectangle of the bitmap.
	 *
	 * @property rect
	 * @type Rectangle
	 */
	public readonly rect: Rectangle;

	/**
	 * Whether the smooth scaling is applied.
	 *
	 * @property smooth
	 * @type Boolean
	 */
	public smooth: boolean;

	/**
	 * The opacity of the drawing object in the range (0, 255).
	 *
	 * @property paintOpacity
	 * @type Number
	 */
	public paintOpacity: number;

	/**
	 * Resizes the bitmap.
	 *
	 * @method resize
	 * @param {Number} width The new width of the bitmap
	 * @param {Number} height The new height of the bitmap
	 */
	public resize(width?: number, height?: number): void;

	/**
	 * Performs a block transfer.
	 *
	 * @method blt
	 * @param {Bitmap} source The bitmap to draw
	 * @param {Number} sx The x coordinate in the source
	 * @param {Number} sy The y coordinate in the source
	 * @param {Number} sw The width of the source image
	 * @param {Number} sh The height of the source image
	 * @param {Number} dx The x coordinate in the destination
	 * @param {Number} dy The y coordinate in the destination
	 * @param {Number} [dw=sw] The width to draw the image in the destination
	 * @param {Number} [dh=sh] The height to draw the image in the destination
	 */
	public blt(source: Bitmap, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw?: number, dh?: number): void;

	/**
	 * Performs a block transfer, using assumption that original image was not modified (no hue)
	 *
	 * @method blt
	 * @param {Bitmap} source The bitmap to draw
	 * @param {Number} sx The x coordinate in the source
	 * @param {Number} sy The y coordinate in the source
	 * @param {Number} sw The width of the source image
	 * @param {Number} sh The height of the source image
	 * @param {Number} dx The x coordinate in the destination
	 * @param {Number} dy The y coordinate in the destination
	 * @param {Number} [dw=sw] The width to draw the image in the destination
	 * @param {Number} [dh=sh] The height to draw the image in the destination
	 */
	public bltImage(source: Bitmap, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw?: number, dh?: number): void;

	/**
	 * Returns pixel color at the specified point.
	 *
	 * @method getPixel
	 * @param {Number} x The x coordinate of the pixel in the bitmap
	 * @param {Number} y The y coordinate of the pixel in the bitmap
	 * @return {String} The pixel color (hex format)
	 */
	public getPixel(x: number, y: number): string;

	/**
	 * Returns alpha pixel value at the specified point.
	 *
	 * @method getAlphaPixel
	 * @param {Number} x The x coordinate of the pixel in the bitmap
	 * @param {Number} y The y coordinate of the pixel in the bitmap
	 * @return {String} The alpha value
	 */
	public getAlphaPixel(x: number, y: number): number;

	/**
	 * Clears the specified rectangle.
	 *
	 * @method clearRect
	 * @param {Number} x The x coordinate for the upper-left corner
	 * @param {Number} y The y coordinate for the upper-left corner
	 * @param {Number} width The width of the rectangle to clear
	 * @param {Number} height The height of the rectangle to clear
	 */
	public clearRect(x: number, y: number, width: number, height: number): void;

	/**
	 * Clears the entire bitmap.
	 *
	 * @method clear
	 */
	public clear(): void;

	/**
	 * Fills the specified rectangle.
	 *
	 * @method fillRect
	 * @param {Number} x The x coordinate for the upper-left corner
	 * @param {Number} y The y coordinate for the upper-left corner
	 * @param {Number} width The width of the rectangle to clear
	 * @param {Number} height The height of the rectangle to clear
	 * @param {String} color The color of the rectangle in CSS format
	 */
	public fillRect(x: number, y: number, width: number, height: number, color: string): void;

	/**
	 * Fills the entire bitmap.
	 *
	 * @method fillAll
	 * @param {String} color The color of the rectangle in CSS format
	 */
	public fillAll(color: string): void;

	/**
	 * Draws the rectangle with a gradation.
	 *
	 * @method gradientFillRect
	 * @param {Number} x The x coordinate for the upper-left corner
	 * @param {Number} y The y coordinate for the upper-left corner
	 * @param {Number} width The width of the rectangle to clear
	 * @param {Number} height The height of the rectangle to clear
	 * @param {String} color1 The start color of the gradation
	 * @param {String} color2 The end color of the gradation
	 * @param {Boolean} vertical Whether it draws a vertical gradient
	 */
	public gradientFillRect(x: number, y: number, width: number, height: number, color1: string, color2: string, vertical?: boolean): void;

	/**
	 * Draw the filled circle.
	 *
	 * @method drawCircle
	 * @param {Number} x The x coordinate of the center of the circle
	 * @param {Number} y The y coordinate of the center of the circle
	 * @param {Number} radius The radius of the circle
	 * @param {String} color The color of the circle in CSS format
	 */
	public drawCircle(x: number, y: number, radius: number, color: string): void;

	/**
	 * Draws the outline text to the bitmap.
	 *
	 * @method drawText
	 * @param {String} text The text that will be drawn
	 * @param {Number} x The x coordinate for the left of the text
	 * @param {Number} y The y coordinate for the top of the text
	 * @param {Number} maxWidth The maximum allowed width of the text
	 * @param {Number} lineHeight The height of the text line
	 * @param {String} align The alignment of the text
	 */
	public drawText(text: string, x: number, y: number, maxWidth: number, lineHeight: number, align: string): void;

	/**
	 * Returns the width of the specified text.
	 *
	 * @method measureTextWidth
	 * @param {String} text The text to be measured
	 * @return {Number} The width of the text in pixels
	 */
	public measureTextWidth(text: string): number;

	/**
	 * Changes the color tone of the entire bitmap.
	 *
	 * @method adjustTone
	 * @param {Number} r The red strength in the range (-255, 255)
	 * @param {Number} g The green strength in the range (-255, 255)
	 * @param {Number} b The blue strength in the range (-255, 255)
	 */
	public adjustTone(r: number, g: number, b: number): void;

	/**
	 * Rotates the hue of the entire bitmap.
	 *
	 * @method rotateHue
	 * @param {Number} offset The hue offset in 360 degrees
	 */
	public rotateHue(offset: number): void;

	/**
	 * Applies a blur effect to the bitmap.
	 *
	 * @method blur
	 */
	public blur(): void;

	/**
	 * Add a callback function that will be called when the bitmap is loaded.
	 *
	 * @method addLoadListener
	 * @param {Function} listner The callback function
	 */
	public addLoadListener(listener: BitmapLoadListener): void;

	public _makeFontNameText(): string;
	public _drawTextOutline(text: string, tx: number, ty: number, maxWidth: number): void;
	public _drawTextBody(text: string, tx: number, ty: number, maxWidth: number): void;
	public _onLoad(): void;
	public _callLoadListeners(): void;
	public _onError(): void;
	public _setDirty(): void;

	/**
	 * updates texture is bitmap was dirty
	 * @method checkDirty
	 */
	public checkDirty(): void;
}
type BitmapLoadListener = () => void;

//-----------------------------------------------------------------------------

declare var waitForLoading: boolean;
declare var register: boolean;

declare function handleiOSTouch(ev: TouchEvent): void;

/**
 * The static class that carries out graphics processing.
 */
declare class Graphics {
	/** 
	 * @class Graphics
	 */
	private constructor();

	/**
	 * Initializes the graphics system.
	 *
	 * @static
	 * @method initialize
	 * @param {Number} width The width of the game screen
	 * @param {Number} height The height of the game screen
	 * @param {String} type The type of the renderer.
	 *                 'canvas', 'webgl', or 'auto'.
	 */
	public static initialize(width?: number, height?: number, type?: RendererType): void;

	public static _width: number;
	public static _height: number;
	public static _rendererType: RendererType;
	public static _boxWidth: number;
	public static _boxHeight: number;

	public static _scale: number;
	public static _realScale: number;

	public static _errorPrinter: HTMLParagraphElement | null;
	public static _canvas: HTMLCanvasElement | null;
	public static _video: HTMLVideoElement | null;
	public static _upperCanvas: HTMLCanvasElement | null;
	public static _renderer: Renderer | null;
	public static _fpsMeter: FPSMeter | null;
	public static _modeBox: HTMLDivElement | null;
	public static _skipCount: number;
	public static _maxSkip: number;
	public static _rendered: boolean;
	public static _loadingImage: HTMLImageElement | null;
	public static _loadingCount: number;
	public static _fpsMeterToggled: boolean;
	public static _stretchEnabled: boolean;

	public static _canUseDifferenceBlend: boolean;
	public static _canUseSaturationBlend: boolean;
	public static _hiddenCanvas: HTMLCanvasElement | null;

	/**
	 * The total frame count of the game screen.
	 *
	 * @static
	 * @property frameCount
	 * @type Number
	 */
	public static frameCount: number;

	/**
	 * The alias of PIXI.blendModes.NORMAL.
	 *
	 * @static
	 * @property BLEND_NORMAL
	 * @type Number
	 * @final
	 */
	public static readonly BLEND_NORMAL: number;

	/**
	 * The alias of PIXI.blendModes.ADD.
	 *
	 * @static
	 * @property BLEND_ADD
	 * @type Number
	 * @final
	 */
	public static readonly BLEND_ADD: number;

	/**
	 * The alias of PIXI.blendModes.MULTIPLY.
	 *
	 * @static
	 * @property BLEND_MULTIPLY
	 * @type Number
	 * @final
	 */
	public static readonly BLEND_MULTIPLY: number;

	/**
	 * The alias of PIXI.blendModes.SCREEN.
	 *
	 * @static
	 * @property BLEND_SCREEN
	 * @type Number
	 * @final
	 */
	public static readonly BLEND_SCREEN: number;

	/**
	 * Marks the beginning of each frame for FPSMeter.
	 *
	 * @static
	 * @method tickStart
	 */
	public static tickStart(): void;

	/**
	 * Marks the end of each frame for FPSMeter.
	 *
	 * @static
	 * @method tickEnd
	 */
	public static tickEnd(): void;

	/**
	 * Renders the stage to the game screen.
	 *
	 * @static
	 * @method render
	 * @param {Stage} stage The stage object to be rendered
	 */
	public static render(stage: Stage): void;

	/**
	 * Checks whether the renderer type is WebGL.
	 *
	 * @static
	 * @method isWebGL
	 * @return {Boolean} True if the renderer type is WebGL
	 */
	public static isWebGL(): boolean;

	/**
	 * Checks whether the current browser supports WebGL.
	 *
	 * @static
	 * @method hasWebGL
	 * @return {Boolean} True if the current browser supports WebGL.
	 */
	public static hasWebGL(): boolean;

	/**
	 * Checks whether the canvas blend mode 'difference' is supported.
	 *
	 * @static
	 * @method canUseDifferenceBlend
	 * @return {Boolean} True if the canvas blend mode 'difference' is supported
	 */
	public static canUseDifferenceBlend(): boolean;

	/**
	 * Checks whether the canvas blend mode 'saturation' is supported.
	 *
	 * @static
	 * @method canUseSaturationBlend
	 * @return {Boolean} True if the canvas blend mode 'saturation' is supported
	 */
	public static canUseSaturationBlend(): boolean;

	/**
	 * Sets the source of the "Now Loading" image.
	 *
	 * @static
	 * @method setLoadingImage
	 */
	public static setLoadingImage(src: string): void;

	/**
	 * Initializes the counter for displaying the "Now Loading" image.
	 *
	 * @static
	 * @method startLoading
	 */
	public static startLoading(): void;

	/**
	 * Increments the loading counter and displays the "Now Loading" image if necessary.
	 *
	 * @static
	 * @method updateLoading
	 */
	public static updateLoading(): void;

	/**
	 * Erases the "Now Loading" image.
	 *
	 * @static
	 * @method endLoading
	 */
	public static endLoading(): void;

	/**
	 * Displays the error text to the screen.
	 *
	 * @static
	 * @method printError
	 * @param {String} name The name of the error
	 * @param {String} message The message of the error
	 */
	public static printError(name: string, message: string): void;

	/**
	 * Shows the FPSMeter element.
	 *
	 * @static
	 * @method showFps
	 */
	public static showFps(): void;

	/**
	 * Hides the FPSMeter element.
	 *
	 * @static
	 * @method hideFps
	 */
	public static hideFps(): void;

	/**
	 * Loads a font file.
	 *
	 * @static
	 * @method loadFont
	 * @param {String} name The face name of the font
	 * @param {String} url The url of the font file
	 */
	public static loadFont(name: string, url: string): void;

	/**
	 * Checks whether the font file is loaded.
	 *
	 * @static
	 * @method isFontLoaded
	 * @param {String} name The face name of the font
	 * @return {Boolean} True if the font file is loaded
	 */
	public static isFontLoaded(name: string): boolean;

	/**
	 * Starts playback of a video.
	 *
	 * @static
	 * @method playVideo
	 * @param {String} src
	 */
	public static playVideo(src: string): void;

	/**
	 * Checks whether the video is playing.
	 *
	 * @static
	 * @method isVideoPlaying
	 * @return {Boolean} True if the video is playing
	 */
	public static isVideoPlaying(): boolean;

	/**
	 * Checks whether the browser can play the specified video type.
	 *
	 * @static
	 * @method canPlayVideoType
	 * @param {String} type The video type to test support for
	 * @return {Boolean} True if the browser can play the specified video type
	 */
	public static canPlayVideoType(type: string): boolean;

	/**
	 * Converts an x coordinate on the page to the corresponding
	 * x coordinate on the canvas area.
	 *
	 * @static
	 * @method pageToCanvasX
	 * @param {Number} x The x coordinate on the page to be converted
	 * @return {Number} The x coordinate on the canvas area
	 */
	public static pageToCanvasX(x: number): number;

	/**
	 * Converts a y coordinate on the page to the corresponding
	 * y coordinate on the canvas area.
	 *
	 * @static
	 * @method pageToCanvasY
	 * @param {Number} y The y coordinate on the page to be converted
	 * @return {Number} The y coordinate on the canvas area
	 */
	public static pageToCanvasY(y: number): number;

	/**
	 * Checks whether the specified point is inside the game canvas area.
	 *
	 * @static
	 * @method isInsideCanvas
	 * @param {Number} x The x coordinate on the canvas area
	 * @param {Number} y The y coordinate on the canvas area
	 * @return {Boolean} True if the specified point is inside the game canvas area
	 */
	public static isInsideCanvas(x: number, y: number): boolean;

	/**
	 * Calls pixi.js garbage collector
	 */
	public static callGC(): void;

	/**
	 * The width of the game screen.
	 *
	 * @static
	 * @property width
	 * @type Number
	 */
	public static width: number;

	/**
	 * The height of the game screen.
	 *
	 * @static
	 * @property height
	 * @type Number
	 */
	public static height: number;

	/**
	 * The width of the window display area.
	 *
	 * @static
	 * @property boxWidth
	 * @type Number
	 */
	public static boxWidth: number;

	/**
	 * The height of the window display area.
	 *
	 * @static
	 * @property boxHeight
	 * @type Number
	 */
	public static boxHeight: number;

	/**
	 * The zoom scale of the game screen.
	 *
	 * @static
	 * @property scale
	 * @type Number
	 */
	public static scale: number;

	public static _createAllElements(): void;
	public static _updateAllElements(): void;
	public static _updateRealScale(): void;
	public static _makeErrorHtml(name: string, message: string): string;
	public static _defaultStretchMode(): boolean;
	public static _testCanvasBlendModes(): void;
	public static _modifyExistingElements(): void;
	public static _createErrorPrinter(): void;
	public static _updateErrorPrinter(): void;
	public static _createCanvas(): void;
	public static _updateCanvas(): void;
	public static _createVideo(): void;
	public static _updateVideo(): void;
	public static _createUpperCanvas(): void;
	public static _updateUpperCanvas(): void;
	public static _clearUpperCanvas(): void;
	public static _paintUpperCanvas(): void;
	public static _createRenderer(): void;
	public static _updateRenderer(): void;
	public static _createFPSMeter(): void;
	public static _createModeBox(): void;
	public static _createGameFontLoader(): void;
	public static _createFontLoader(name: string): void;
	public static _centerElement(element: HTMLElement): void;
	public static _disableTextSelection(): void;
	public static _disableContextMenu(): void;
	public static _applyCanvasFilter(): void;
	public static _onVideoLoad(): void;
	public static _onVideoError(): void;
	public static _onVideoEnd(): void;
	public static _updateVisibility(videoVisible: boolean): void;
	public static _isVideoVisible(): boolean;
	public static _setupEventHandlers(): void;
	public static _onWindowResize(): void;
	public static _onKeyDown(event: KeyboardEvent): void;
	public static _switchFPSMeter(): void;
	public static _switchStretchMode(): void;
	public static _switchFullScreen(): void;
	public static _isFullScreen(): boolean;
	public static _requestFullScreen(): void;
	public static _cancelFullScreen(): void;
}
type Renderer = PIXI.CanvasRenderer | PIXI.WebGLRenderer;
type RendererType = 'canvas' | 'webgl' | 'auto';



//-----------------------------------------------------------------------------
/**
 * The static class that handles input data from the keyboard and gamepads.
 */
declare class Input {
	/** 
	 * @class Input
	 */
	private constructor();

	/**
	 * Initializes the input system.
	 *
	 * @static
	 * @method initialize
	 */
	public static initialize(): void;

	/**
	 * The wait time of the key repeat in frames.
	 *
	 * @static
	 * @property keyRepeatWait
	 * @type Number
	 */
	public static keyRepeatWait: number;

	/**
	 * The interval of the key repeat in frames.
	 *
	 * @static
	 * @property keyRepeatInterval
	 * @type Number
	 */
	public static keyRepeatInterval: number;

	/**
	 * A hash table to convert from a virtual key code to a mapped key name.
	 *
	 * @static
	 * @property keyMapper
	 * @type Object
	 */
	public static keyMapper: { [keyCode: number]: string };

	/**
	 * A hash table to convert from a gamepad button to a mapped key name.
	 *
	 * @static
	 * @property gamepadMapper
	 * @type Object
	 */
	public static gamepadMapper: { [gamepadButton: number]: string };

	/**
	 * Clears all the input data.
	 *
	 * @static
	 * @method clear
	 */
	public static clear(): void;

	public static _currentState: { [keyName: string]: boolean };
	public static _previousState: { [keyName: string]: boolean };
	public static _gamepadStates: boolean[][];
	public static _latestButton: string | null;
	public static _pressedTime: number;
	public static _dir4: number;
	public static _dir8: number;
	public static _preferredAxis: 'x' | 'y' | '';
	public static _date: number;

	/**
	 * Updates the input data.
	 *
	 * @static
	 * @method update
	 */
	public static update(): void;

	/**
	 * Checks whether a key is currently pressed down.
	 *
	 * @static
	 * @method isPressed
	 * @param {String} keyName The mapped name of the key
	 * @return {Boolean} True if the key is pressed
	 */
	public static isPressed(keyName: string): boolean;

	/**
	 * Checks whether a key is just pressed.
	 *
	 * @static
	 * @method isTriggered
	 * @param {String} keyName The mapped name of the key
	 * @return {Boolean} True if the key is triggered
	 */
	public static isTriggered(keyName: string): boolean;

	/**
	 * Checks whether a key is just pressed or a key repeat occurred.
	 *
	 * @static
	 * @method isRepeated
	 * @param {String} keyName The mapped name of the key
	 * @return {Boolean} True if the key is repeated
	 */
	public static isRepeated(keyName: string): boolean;

	/**
	 * Checks whether a key is kept depressed.
	 *
	 * @static
	 * @method isLongPressed
	 * @param {String} keyName The mapped name of the key
	 * @return {Boolean} True if the key is long-pressed
	 */
	public static isLongPressed(keyName: string): boolean;

	/**
	 * [read-only] The four direction value as a number of the numpad, or 0 for neutral.
	 *
	 * @static
	 * @property dir4
	 * @type Number
	 */
	public static readonly dir4: number;

	/**
	 * [read-only] The eight direction value as a number of the numpad, or 0 for neutral.
	 *
	 * @static
	 * @property dir8
	 * @type Number
	 */
	public static readonly dir8: number;

	/**
	 * [read-only] The time of the last input in milliseconds.
	 *
	 * @static
	 * @property date
	 * @type Number
	 */
	public static readonly date: number;

	public static _wrapNwjsAlert(): void;
	public static _setupEventHandlers(): void;
	public static _onKeyDown(event: KeyboardEvent): void;
	public static _shouldPreventDefault(keyCode: number): boolean;
	public static _onKeyUp(event: KeyboardEvent): void;
	public static _onLostFocus(): void;
	public static _pollGamepads(): void;
	public static _updateGamepadState(gamepad: Gamepad): void;
	public static _updateDirection(): void;
	public static _signX(): number;
	public static _signY(): number;
	public static _makeNumpadDirection(x: number, y: number): number;
	public static _isEscapeCompatible(keyName: string): boolean;
}

//-----------------------------------------------------------------------------
/**
 * The static class that handles input data from the mouse and touchscreen.
 */
declare class TouchInput {
	/** 
	 * @class TouchInput
	 */
	private constructor();

	/**
	 * Initializes the touch system.
	 *
	 * @static
	 * @method initialize
	 */
	public static initialize(): void;

	/**
	 * The wait time of the pseudo key repeat in frames.
	 *
	 * @static
	 * @property keyRepeatWait
	 * @type Number
	 */
	public static keyRepeatWait: number;

	/**
	 * The interval of the pseudo key repeat in frames.
	 *
	 * @static
	 * @property keyRepeatInterval
	 * @type Number
	 */
	public static keyRepeatInterval: number;

	/**
	 * Clears all the touch data.
	 *
	 * @static
	 * @method clear
	 */
	public static clear(): void;

	public static _mousePressed: boolean;
	public static _screenPressed: boolean;
	public static _pressedTime: number;
	public static _events: {
		triggered: boolean;
		cancelled: boolean;
		moved: boolean;
		released: boolean;
		wheelX: number;
		wheelY: number;
	}
	public static _triggered: boolean;
	public static _cancelled: boolean;
	public static _moved: boolean;
	public static _released: boolean;
	public static _wheelX: number;;
	public static _wheelY: number;;
	public static _x: number;
	public static _y: number;
	public static _date: number;

	/**
	 * Updates the touch data.
	 *
	 * @static
	 * @method update
	 */
	public static update(): void;

	/**
	 * Checks whether the mouse button or touchscreen is currently pressed down.
	 *
	 * @static
	 * @method isPressed
	 * @return {Boolean} True if the mouse button or touchscreen is pressed
	 */
	public static isPressed(): boolean;

	/**
	 * Checks whether the left mouse button or touchscreen is just pressed.
	 *
	 * @static
	 * @method isTriggered
	 * @return {Boolean} True if the mouse button or touchscreen is triggered
	 */
	public static isTriggered(): boolean;

	/**
	 * Checks whether the left mouse button or touchscreen is just pressed
	 * or a pseudo key repeat occurred.
	 *
	 * @static
	 * @method isRepeated
	 * @return {Boolean} True if the mouse button or touchscreen is repeated
	 */
	public static isRepeated(): boolean;

	/**
	 * Checks whether the left mouse button or touchscreen is kept depressed.
	 *
	 * @static
	 * @method isLongPressed
	 * @return {Boolean} True if the left mouse button or touchscreen is long-pressed
	 */
	public static isLongPressed(): boolean;

	/**
	 * Checks whether the right mouse button is just pressed.
	 *
	 * @static
	 * @method isCancelled
	 * @return {Boolean} True if the right mouse button is just pressed
	 */
	public static isCancelled(): boolean;

	/**
	 * Checks whether the mouse or a finger on the touchscreen is moved.
	 *
	 * @static
	 * @method isMoved
	 * @return {Boolean} True if the mouse or a finger on the touchscreen is moved
	 */
	public static isMoved(): boolean;

	/**
	 * Checks whether the left mouse button or touchscreen is released.
	 *
	 * @static
	 * @method isReleased
	 * @return {Boolean} True if the mouse button or touchscreen is released
	 */
	public static isReleased(): boolean;

	/**
	 * [read-only] The horizontal scroll amount.
	 *
	 * @static
	 * @property wheelX
	 * @type Number
	 */
	public static readonly wheelX: number;

	/**
	 * [read-only] The vertical scroll amount.
	 *
	 * @static
	 * @property wheelY
	 * @type Number
	 */
	public static readonly wheelY: number;

	/**
	 * [read-only] The x coordinate on the canvas area of the latest touch event.
	 *
	 * @static
	 * @property x
	 * @type Number
	 */
	public static readonly x: number;

	/**
	 * [read-only] The y coordinate on the canvas area of the latest touch event.
	 *
	 * @static
	 * @property y
	 * @type Number
	 */
	public static readonly y: number;

	/**
	 * [read-only] The time of the last input in milliseconds.
	 *
	 * @static
	 * @property date
	 * @type Number
	 */
	public static readonly date: number;

	public static _setupEventHandlers(): void;
	public static _onMouseDown(event: MouseEvent): void;
	public static _onLeftButtonDown(event: MouseEvent): void;
	public static _onMiddleButtonDown(event: MouseEvent): void;
	public static _onRightButtonDown(event: MouseEvent): void;
	public static _onMouseMove(event: MouseEvent): void;
	public static _onMouseUp(event: MouseEvent): void;
	public static _onWheel(event: WheelEvent): void;
	public static _onTouchStart(event: TouchEvent): void;
	public static _onTouchMove(event: TouchEvent): void;
	public static _onTouchEnd(event: TouchEvent): void;
	public static _onTouchCancel(event: TouchEvent): void;
	public static _onPointerDown(event: PointerEvent): void;
	public static _onTrigger(x: number, y: number): void;
	public static _onCancel(x: number, y: number): void;
	public static _onMove(x: number, y: number): void;
	public static _onRelease(x: number, y: number): void;
}

//-----------------------------------------------------------------------------
/**
 * The basic object that is rendered to the game screen.
 */
declare class Sprite extends PIXI.Sprite {
	/** 
	 * @class Sprite
	 * @constructor
	 * @param {Bitmap} bitmap The image for the sprite
	 */
	public constructor(bitmap?: Bitmap | null);

	public static readonly voidFilter: PIXI.filters.VoidFilter;

	public initialize(...args: any[]): void;

	public z: number | undefined;

	public _bitmap: Bitmap | null | undefined;
	public _frame: Rectangle;
	public _realFrame: Rectangle;
	public _blendColor: number[];
	public _colorTone: number[];
	public _canvas: HTMLCanvasElement | null;
	public _context: CanvasRenderingContext2D | null;
	public _tintTexture: PIXI.BaseTexture | null;

	/**
	 * use heavy renderer that will reduce border artifacts and apply advanced blendModes
	 * @type {boolean}
	 * @private
	 */
	public _isPicture: boolean;

	public spriteId: number;
	public opaque: boolean;

	// Number of the created objects.
	public static _counter: number;

	/**
	 * The image for the sprite.
	 *
	 * @property bitmap
	 * @type Bitmap
	 */
	public bitmap: Bitmap | null | undefined;

	/**
	 * The width of the sprite without the scale.
	 *
	 * @property width
	 * @type Number
	 */
	public width: number;

	/**
	 * The height of the sprite without the scale.
	 *
	 * @property height
	 * @type Number
	 */
	public height: number;

	/**
	 * The opacity of the sprite (0 to 255).
	 *
	 * @property opacity
	 * @type Number
	 */
	public opacity: number;

	/**
	 * Updates the sprite for each frame.
	 *
	 * @method update
	 */
	public update(): void;

	/**
	 * Sets the x and y at once.
	 *
	 * @method move
	 * @param {Number} x The x coordinate of the sprite
	 * @param {Number} y The y coordinate of the sprite
	 */
	public move(x: number, y: number): void;

	/**
	 * Sets the rectagle of the bitmap that the sprite displays.
	 *
	 * @method setFrame
	 * @param {Number} x The x coordinate of the frame
	 * @param {Number} y The y coordinate of the frame
	 * @param {Number} width The width of the frame
	 * @param {Number} height The height of the frame
	 */
	public setFrame(x: number, y: number, width: number, height: number): void;

	/**
	 * Gets the blend color for the sprite.
	 *
	 * @method getBlendColor
	 * @return {Array} The blend color [r, g, b, a]
	 */
	public getBlendColor(): number[];

	/**
	 * Sets the blend color for the sprite.
	 *
	 * @method setBlendColor
	 * @param {Array} color The blend color [r, g, b, a]
	 */
	public setBlendColor(color: number[]): void;

	/**
	 * Gets the color tone for the sprite.
	 *
	 * @method getColorTone
	 * @return {Array} The color tone [r, g, b, gray]
	 */
	public getColorTone(): number[];

	/**
	 * Sets the color tone for the sprite.
	 *
	 * @method setColorTone
	 * @param {Array} tone The color tone [r, g, b, gray]
	 */
	public setColorTone(tone: number[]): void;

	public _onBitmapLoad(): void;
	public _refresh(): void;
	public _isInBitmapRect(x: number, y: number, w: number, h: number): boolean;
	public _needsTint(): boolean;
	public _createTinter(w: number, h: number): void;
	public _executeTint(x: number, y: number, w: number, h: number): void;

	public _renderCanvas_PIXI(renderer: PIXI.CanvasRenderer): void;
	public _renderWebGL_PIXI(renderer: PIXI.WebGLRenderer): void;
	public _renderCanvas(renderer: PIXI.CanvasRenderer): void;

	/**
	 * checks if we need to speed up custom blendmodes
	 * @param renderer
	 * @private
	 */
	public _speedUpCustomBlendModes(renderer: PIXI.WebGLRenderer): void;

	public _renderWebGL(renderer: PIXI.WebGLRenderer): void;
}

//-----------------------------------------------------------------------------
/**
 * The tilemap which displays 2D tile-based game map.
 */
declare class Tilemap extends PIXI.Container {
	/** 
	 * @class Tilemap
	 * @constructor
	 */
	public constructor();

	public initialize(...args: any[]): void;

	public _margin: number;
	public _width: number;
	public _height: number;
	public _tileWidth: number;
	public _tileHeight: number;
	public _mapWidth: number;
	public _mapHeight: number;
	public _mapData: number[] | null;
	public _layerWidth: number;
	public _layerHeight: number;
	public _lastTiles: number[][][][];

	/**
	 * The bitmaps used as a tileset.
	 *
	 * @property bitmaps
	 * @type Array
	 */
	public bitmaps: Bitmap[];

	/**
	 * The origin point of the tilemap for scrolling.
	 *
	 * @property origin
	 * @type Point
	 */
	public origin: Point;

	/**
	 * The tileset flags.
	 *
	 * @property flags
	 * @type Array
	 */
	public flags: number[];

	/**
	 * The animation count for autotiles.
	 *
	 * @property animationCount
	 * @type Number
	 */
	public animationCount: number;

	/**
	 * Whether the tilemap loops horizontal.
	 *
	 * @property horizontalWrap
	 * @type Boolean
	 */
	public horizontalWrap: boolean;

	/**
	 * Whether the tilemap loops vertical.
	 *
	 * @property verticalWrap
	 * @type Boolean
	 */
	public verticalWrap: boolean;

	/**
	 * The width of the screen in pixels.
	 *
	 * @property width
	 * @type Number
	 */
	public width: number;

	/**
	 * The height of the screen in pixels.
	 *
	 * @property height
	 * @type Number
	 */
	public height: number;

	/**
	 * The width of a tile in pixels.
	 *
	 * @property tileWidth
	 * @type Number
	 */
	public tileWidth: number;

	/**
	 * The height of a tile in pixels.
	 *
	 * @property tileHeight
	 * @type Number
	 */
	public tileHeight: number;

	/**
	 * Sets the tilemap data.
	 *
	 * @method setData
	 * @param {Number} width The width of the map in number of tiles
	 * @param {Number} height The height of the map in number of tiles
	 * @param {Array} data The one dimensional array for the map data
	 */
	public setData(width: number, height: number, data: number[]): void;

	/**
	 * Checks whether the tileset is ready to render.
	 *
	 * @method isReady
	 * @type Boolean
	 * @return {Boolean} True if the tilemap is ready
	 */
	public isReady(): boolean;

	/**
	 * Updates the tilemap for each frame.
	 *
	 * @method update
	 */
	public update(): void;

	/**
	 * Forces to repaint the entire tilemap.
	 *
	 * @method refresh
	 */
	public refresh(): void;

	/**
	 * Forces to refresh the tileset
	 *
	 * @method refresh
	 */
	public refreshTileset(): void;

	/**
	 * @method updateTransform
	 * @private
	 */
	public updateTransform(): void;

	public _createLayers(): void;

	public _lowerBitmap: Bitmap | undefined;
	public _upperBitmap: Bitmap | undefined;
	public _lowerLayer: Sprite | undefined;
	public _upperLayer: Sprite | undefined;

	public _updateLayerPositions(startX: number, startY: number): void;
	public _paintAllTiles(startX: number, startY: number): void;
	public _paintTiles(startX: number, startY: number, x: number, y: number): void;
	public _readLastTiles(i: number, x: number, y: number): number[];
	public _writeLastTiles(i: number, x: number, y: number, tiles: number[]): void;
	public _drawTile(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
	public _drawNormalTile(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
	public _drawAutotile(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
	public _drawTableEdge(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
	public _drawShadow(bitmap: Bitmap, shadowBits: number, dx: number, dy: number): void;
	public _readMapData(x: number, y: number, z: number): number;
	public _isHigherTile(tileId: number): boolean;
	public _isTableTile(tileId: number): boolean;
	public _isOverpassPosition(mx: number, my: number): boolean;
	public _sortChildren(): void;
	public _compareChildOrder(a: Sprite, b: Sprite): number;

	// Tile type checkers

	public static readonly TILE_ID_B: number;
	public static readonly TILE_ID_C: number;
	public static readonly TILE_ID_D: number;
	public static readonly TILE_ID_E: number;
	public static readonly TILE_ID_A5: number;
	public static readonly TILE_ID_A1: number;
	public static readonly TILE_ID_A2: number;
	public static readonly TILE_ID_A3: number;
	public static readonly TILE_ID_A4: number;
	public static readonly TILE_ID_MAX: number;

	public static isVisibleTile(tileId: number): boolean;

	public static isAutotile(tileId: number): boolean;

	public static getAutotileKind(tileId: number): number;

	public static getAutotileShape(tileId: number): number;

	public static makeAutotileId(kind: number, shape: number): number;

	public static isSameKindTile(tileID1: number, tileID2: number): boolean;

	public static isTileA1(tileId: number): boolean;

	public static isTileA2(tileId: number): boolean;

	public static isTileA3(tileId: number): boolean;

	public static isTileA4(tileId: number): boolean;

	public static isTileA5(tileId: number): boolean;

	public static isWaterTile(tileId: number): boolean;

	public static isWaterfallTile(tileId: number): boolean;

	public static isGroundTile(tileId: number): boolean;

	public static isShadowingTile(tileId: number): boolean;

	public static isRoofTile(tileId: number): boolean;

	public static isWallTopTile(tileId: number): boolean;

	public static isWallSideTile(tileId: number): boolean;

	public static isWallTile(tileId: number): boolean;

	public static isFloorTypeAutotile(tileId: number): boolean;

	public static isWallTypeAutotile(tileId: number): boolean;

	public static isWaterfallTypeAutotile(tileId: number): boolean;

	// Autotile shape number to coordinates of tileset images

	public static readonly FLOOR_AUTOTILE_TABLE: number[][][];

	public static readonly WALL_AUTOTILE_TABLE: number[][][];

	public static readonly WATERFALL_AUTOTILE_TABLE: number[][][];
}

//-----------------------------------------------------------------------------
/**
 * The tilemap which displays 2D tile-based game map using shaders
 */
declare class ShaderTilemap extends Tilemap {
	/** 
	 * @class Tilemap
	 * @constructor
	 */
	public constructor();

	public roundPixels: boolean;

	/**
	 * Uploads animation state in renderer
	 *
	 * @method _hackRenderer
	 * @private
	 */
	public _hackRenderer(renderer: Renderer): Renderer;

	/**
	 * PIXI render method
	 *
	 * @method renderCanvas
	 * @param {Object} pixi renderer
	 */
	public renderCanvas(renderer: PIXI.CanvasRenderer): void;

	/**
	 * PIXI render method
	 *
	 * @method renderWebGL
	 * @param {Object} pixi renderer
	 */
	public renderWebGL(renderer: PIXI.WebGLRenderer): void;

	/**
	 * Forces to repaint the entire tilemap AND update bitmaps list if needed
	 *
	 * @method refresh
	 */
	public refresh(): void;

	/**
	 * Call after you update tileset
	 *
	 * @method updateBitmaps
	 */
	public refreshTileset(): void;

	/**
	 * @method updateTransform
	 * @private
	 */
	public updateTransform(): void;

	public _createLayers(): void;

	public lowerZLayer: PIXI.tilemap.ZLayer | undefined;
	public upperZLayer: PIXI.tilemap.ZLayer | undefined;
	public lowerLayer: PIXI.tilemap.CompositeRectTileLayer | undefined;
	public upperLayer: PIXI.tilemap.CompositeRectTileLayer | undefined;

	public _updateLayerPositions(startX: number, startY: number): void;
	public _paintAllTiles(startX: number, startY: number): void;
	public _paintTiles(startX: number, startY: number, x: number, y: number): void;
	public _drawTile(layer: PIXI.tilemap.RectTileLayer, tileId: number, dx: number, dy: number): void;
	public _drawTile(bitmap: Bitmap, tileId: number, dx: number, dy: number): never;
	public _drawNormalTile(layer: PIXI.tilemap.RectTileLayer, tileId: number, dx: number, dy: number): void;
	public _drawNormalTile(bitmap: Bitmap, tileId: number, dx: number, dy: number): never;
	public _drawAutotile(layer: PIXI.tilemap.RectTileLayer, tileId: number, dx: number, dy: number): void;
	public _drawAutotile(bitmap: Bitmap, tileId: number, dx: number, dy: number): never;
	public _drawTableEdge(layer: PIXI.tilemap.RectTileLayer, tileId: number, dx: number, dy: number): void;
	public _drawTableEdge(bitmap: Bitmap, tileId: number, dx: number, dy: number): never;
	public _drawShadow(layer: PIXI.tilemap.RectTileLayer, shadowBits: number, dx: number, dy: number): void;
	public _drawShadow(bitmap: Bitmap, shadowBits: number, dx: number, dy: number): never;
}

//-----------------------------------------------------------------------------
/**
 * The sprite object for a tiling image.
 */
declare class TilingSprite extends PIXI.extras.PictureTilingSprite {
	/** 
	 * @class TilingSprite
	 * @constructor
	 * @param {Bitmap} bitmap The image for the tiling sprite
	 */
	public constructor(bitmap?: Bitmap | null);

	public initialize(...args: any[]): void;

	public _bitmap: Bitmap | null | undefined;
	public _width: number;
	public _height: number;
	public _frame: Rectangle;
	public spriteId: number;
	/**
	 * The origin point of the tiling sprite for scrolling.
	 *
	 * @property origin
	 * @type Point
	 */
	public origin: Point;

	public _renderCanvas_PIXI(renderer: PIXI.CanvasRenderer): void;
	public _renderWebGL_PIXI(renderer: PIXI.WebGLRenderer): void;
	public _renderCanvas(renderer: PIXI.CanvasRenderer): void;
	public _renderWebGL(renderer: PIXI.WebGLRenderer): void;

	/**
	 * The image for the tiling sprite.
	 *
	 * @property bitmap
	 * @type Bitmap
	 */
	public bitmap: Bitmap | null | undefined;

	/**
	 * The opacity of the tiling sprite (0 to 255).
	 *
	 * @property opacity
	 * @type Number
	 */
	public opacity: number;

	/**
	 * Updates the tiling sprite for each frame.
	 *
	 * @method update
	 */
	public update(): void;

	/**
	 * Sets the x, y, width, and height all at once.
	 *
	 * @method move
	 * @param {Number} x The x coordinate of the tiling sprite
	 * @param {Number} y The y coordinate of the tiling sprite
	 * @param {Number} width The width of the tiling sprite
	 * @param {Number} height The height of the tiling sprite
	 */
	public move(x: number, y: number, width: number, height: number): void;

	/**
	 * Specifies the region of the image that the tiling sprite will use.
	 *
	 * @method setFrame
	 * @param {Number} x The x coordinate of the frame
	 * @param {Number} y The y coordinate of the frame
	 * @param {Number} width The width of the frame
	 * @param {Number} height The height of the frame
	 */
	public setFrame(x: number, y: number, width: number, height: number): void;

	/**
	 * @method updateTransform
	 * @private
	 */
	public updateTransform(): void;

	public updateTransformTS(): void;

	public _onBitmapLoad(): void;
	public _refresh(): void;
	public _speedUpCustomBlendModes(renderer: PIXI.WebGLRenderer): void;
	public _renderWebGL(renderer: PIXI.WebGLRenderer): void;
}

//-----------------------------------------------------------------------------
/**
 * The sprite which covers the entire game screen.
 */
declare class ScreenSprite extends PIXI.Container {
	/** 
	 * @class ScreenSprite
	 * @constructor
	 */
	public constructor();

	public initialize(...args: any[]): void;

	public _graphics: PIXI.Graphics;

	public _red: number;
	public _green: number;
	public _blue: number;
	public _colorText: string;

	/**
	 * The opacity of the sprite (0 to 255).
	 *
	 * @property opacity
	 * @type Number
	 */
	public opacity: number;

	public static YEPWarned: boolean;
	public static warnYep(): void;

	public readonly anchor: { x: number, y: number };
	public blendMode: number;

	/**
	 * Sets black to the color of the screen sprite.
	 *
	 * @method setBlack
	 */
	public setBlack(): void;

	/**
	 * Sets white to the color of the screen sprite.
	 *
	 * @method setWhite
	 */
	public setWhite(): void;

	/**
	 * Sets the color of the screen sprite by values.
	 *
	 * @method setColor
	 * @param {Number} r The red value in the range (0, 255)
	 * @param {Number} g The green value in the range (0, 255)
	 * @param {Number} b The blue value in the range (0, 255)
	 */
	public setColor(r: number, g: number, b: number): void;
}

//-----------------------------------------------------------------------------
/**
 * The window in the game.
 */
declare class Window extends PIXI.Container {
	/** 
	 * @class Window
	 * @constructor
	 */
	public constructor();

	public initialize(...args: any[]): void;

	public _isWindow: boolean;
	public _windowskin: Bitmap | null;
	public _width: number;
	public _height: number;
	public _cursorRect: Rectangle;
	public _openness: number;
	public _animationCount: number;

	public _padding: number;
	public _margin: number;
	public _colorTone: number[];

	public _windowSpriteContainer: PIXI.Container;
	public _windowBackSprite: Sprite;
	public _windowCursorSprite: Sprite;
	public _windowFrameSprite: Sprite;
	public _windowContentsSprite: Sprite;
	public _windowArrowSprites: Sprite[];
	public _downArrowSprite: Sprite;
	public _upArrowSprite: Sprite;
	public _windowPauseSignSprite: Sprite;

	/**
	 * The origin point of the window for scrolling.
	 *
	 * @property origin
	 * @type Point
	 */
	public origin: Point;

	/**
	 * The active state for the window.
	 *
	 * @property active
	 * @type Boolean
	 */
	public active: boolean;

	/**
	 * The visibility of the down scroll arrow.
	 *
	 * @property downArrowVisible
	 * @type Boolean
	 */
	public downArrowVisible: boolean;

	/**
	 * The visibility of the up scroll arrow.
	 *
	 * @property upArrowVisible
	 * @type Boolean
	 */
	public upArrowVisible: boolean;

	/**
	 * The visibility of the pause sign.
	 *
	 * @property pause
	 * @type Boolean
	 */
	public pause: boolean;

	/**
	 * The image used as a window skin.
	 *
	 * @property windowskin
	 * @type Bitmap
	 */
	public windowskin: Bitmap | null;

	/**
	 * The bitmap used for the window contents.
	 *
	 * @property contents
	 * @type Bitmap
	 */
	public contents: Bitmap;

	/**
	 * The width of the window in pixels.
	 *
	 * @property width
	 * @type Number
	 */
	public width: number;

	/**
	 * The height of the window in pixels.
	 *
	 * @property height
	 * @type Number
	 */
	public height: number;

	/**
	 * The size of the padding between the frame and contents.
	 *
	 * @property padding
	 * @type Number
	 */
	public padding: number;

	/**
	 * The size of the margin for the window background.
	 *
	 * @property margin
	 * @type Number
	 */
	public margin: number;

	/**
	 * The opacity of the window without contents (0 to 255).
	 *
	 * @property opacity
	 * @type Number
	 */
	public opacity: number;

	/**
	 * The opacity of the window background (0 to 255).
	 *
	 * @property backOpacity
	 * @type Number
	 */
	public backOpacity: number;

	/**
	 * The opacity of the window contents (0 to 255).
	 *
	 * @property contentsOpacity
	 * @type Number
	 */
	public contentOpacity: number;

	/**
	 * The openness of the window (0 to 255).
	 *
	 * @property openness
	 * @type Number
	 */
	public openness: number;

	/**
	 * Updates the window for each frame.
	 *
	 * @method update
	 */
	public update(): void;

	/**
	 * Sets the x, y, width, and height all at once.
	 *
	 * @method move
	 * @param {Number} x The x coordinate of the window
	 * @param {Number} y The y coordinate of the window
	 * @param {Number} width The width of the window
	 * @param {Number} height The height of the window
	 */
	public move(x?: number, y?: number, width?: number, height?: number): void;

	/**
	 * Returns true if the window is completely open (openness == 255).
	 *
	 * @method isOpen
	 */
	public isOpen(): boolean;

	/**
	 * Returns true if the window is completely closed (openness == 0).
	 *
	 * @method isClosed
	 */
	public isClosed(): boolean;

	/**
	 * Sets the position of the command cursor.
	 *
	 * @method setCursorRect
	 * @param {Number} x The x coordinate of the cursor
	 * @param {Number} y The y coordinate of the cursor
	 * @param {Number} width The width of the cursor
	 * @param {Number} height The height of the cursor
	 */
	public setCursorRect(x?: number, y?: number, width?: number, height?: number): void;

	/**
	 * Changes the color of the background.
	 *
	 * @method setTone
	 * @param {Number} r The red value in the range (-255, 255)
	 * @param {Number} g The green value in the range (-255, 255)
	 * @param {Number} b The blue value in the range (-255, 255)
	 */
	public setTone(r: number, g: number, b: number): void;

	/**
	 * Adds a child between the background and contents.
	 *
	 * @method addChildToBack
	 * @param {Object} child The child to add
	 * @return {Object} The child that was added
	 */
	public addChildToBack(child: PIXI.DisplayObject): PIXI.DisplayObject;

	/**
	 * @method updateTransform
	 * @private
	 */
	public updateTransform(): void;

	public _createAllParts(): void;
	public _onWindowskinLoad(): void;
	public _refreshAllParts(): void;
	public _refreshBack(): void;
	public _refreshFrame(): void;
	public _refreshCursor(): void;
	public _refreshContents(): void;
	public _refreshArrows(): void;
	public _refreshPauseSign(): void;
	public _updateCorsor(): void;
	public _updateContents(): void;
	public _updateArrows(): void;
	public _updatePauseSign(): void;
}

//-----------------------------------------------------------------------------
/**
 * The layer which contains game windows.
 */
declare class WindowLayer extends PIXI.Container {
	/** 
	 * @class WindowLayer
	 * @constructor
	 */
	public constructor();

	public initialize(...args: any[]): void;

	public _width: number;
	public _height: number;
	public _tempCanvas: HTMLCanvasElement | null;
	public _translationMatrix: number[];

	public _windowMask: PIXI.Graphics;
	public _windowRect: PIXI.Rectangle;

	public _renderSprite: Sprite | null;
	public filterArea: PIXI.Rectangle;
	public filters: PIXI.Filter[];

	public onRemoveAsAChild(): void;

	public static voidFilter: PIXI.filters.VoidFilter;

	/**
	 * The width of the window layer in pixels.
	 *
	 * @property width
	 * @type Number
	 */
	public width: number;

	/**
	 * The height of the window layer in pixels.
	 *
	 * @property height
	 * @type Number
	 */
	public height: number;

	/**
	 * Sets the x, y, width, and height all at once.
	 *
	 * @method move
	 * @param {Number} x The x coordinate of the window layer
	 * @param {Number} y The y coordinate of the window layer
	 * @param {Number} width The width of the window layer
	 * @param {Number} height The height of the window layer
	 */
	public move(x: number, y: number, width: number, height: number): void;

	/**
	 * Updates the window layer for each frame.
	 *
	 * @method update
	 */
	public update(): void;

	/**
	 * @method _renderCanvas
	 * @param {Object} renderSession
	 * @private
	 */
	public renderCanvas(renderer: PIXI.CanvasRenderer): void;

	public _canvasClearWindowRect(renderSession: PIXI.CanvasRenderer, window: Window): void;

	/**
	 * @method _renderWebGL
	 * @param {Object} renderSession
	 * @private
	 */
	public renderWebGL(renderer: PIXI.WebGLRenderer): void;

	public _maskWindow(window: Window, shift: { x: number, y: number }): void;
}

//-----------------------------------------------------------------------------
/**
 * The weather effect which displays rain, storm, or snow.
 */
declare class Weather extends PIXI.Container {
	/** 
	 * @class Weather
	 * @constructor
	 */
	public constructor();

	public _width: number;
	public _height: number;
	public _sprites: Sprite[];

	public _rainBitmap: Bitmap;
	public _stormBitmap: Bitmap;
	public _snowBitmap: Bitmap;
	public _dimmerSprite: ScreenSprite;

	/**
	 * The type of the weather in ['none', 'rain', 'storm', 'snow'].
	 *
	 * @property type
	 * @type String
	 */
	public type: string;

	/**
	 * The power of the weather in the range (0, 9).
	 *
	 * @property power
	 * @type Number
	 */
	public power: number;

	/**
	 * The origin point of the weather for scrolling.
	 *
	 * @property origin
	 * @type Point
	 */
	public origin: Point;

	/**
	 * Updates the weather for each frame.
	 *
	 * @method update
	 */
	public update(): void;

	public _createBitmaps(): void;
	public _createDimmer(): void;
	public _updateDimmer(): void;
	public _updateAllSprites(): void;
	public _addSprite(): void;
	public _removeSprite(): void;
	public _updateSprite(sprite: Sprite): void;
	public _updateRainSprite(sprite: Sprite): void;
	public _updateStormSprite(sprite: Sprite): void;
	public _updateSnowSprite(sprite: Sprite): void;
	public _rebornSprite(sprite: Sprite): void;
}

//-----------------------------------------------------------------------------
/**
 * The color matrix filter for WebGL.
 */
declare class ToneFilter extends PIXI.filters.ColorMatrixFilter {
	/** 
	 * @class ToneFilter
	 * @extends PIXI.Filter
	 * @constructor
	 */
	public constructor();

	/**
	 * Changes the hue.
	 *
	 * @method adjustHue
	 * @param {Number} value The hue value in the range (-360, 360)
	 */
	public adjustHue(value: number): void;

	/**
	 * Changes the saturation.
	 *
	 * @method adjustSaturation
	 * @param {Number} value The saturation value in the range (-255, 255)
	 */
	public adjustSaturation(value: number): void;

	/**
	 * Changes the tone.
	 *
	 * @method adjustTone
	 * @param {Number} r The red strength in the range (-255, 255)
	 * @param {Number} g The green strength in the range (-255, 255)
	 * @param {Number} b The blue strength in the range (-255, 255)
	 */
	public adjustTone(r?: number, g?: number, b?: number): void;
}

//-----------------------------------------------------------------------------
/**
 * The sprite which changes the screen color in 2D canvas mode.
 */
declare class ToneSprite extends PIXI.Container {
	/** 
	 * @class ToneSprite
	 * @constructor
	 */
	public constructor();

	public intialize(): void;

	public _red: number;
	public _green: number;
	public _blue: number;
	public _gray: number;

	/**
	 * Clears the tone.
	 *
	 * @method reset
	 */
	public clear(): void;

	/**
	 * Sets the tone.
	 *
	 * @method setTone
	 * @param {Number} r The red strength in the range (-255, 255)
	 * @param {Number} g The green strength in the range (-255, 255)
	 * @param {Number} b The blue strength in the range (-255, 255)
	 * @param {Number} gray The grayscale level in the range (0, 255)
	 */
	public setTone(r?: number, g?: number, b?: number, gray?: number): void;

	public _renderCanvas(renderer: PIXI.CanvasRenderer): void;
	public _renderWebGL(renderer: PIXI.WebGLRenderer): void;
}

//-----------------------------------------------------------------------------
/**
 * The root object of the display tree.
 */
declare class Stage extends PIXI.Container {
	/** 
	 * @class Stage
	 * @constructor
	 */
	public constructor();

	public initialize(...args: any[]): void;
}

//-----------------------------------------------------------------------------
/**
 * The audio object of Web Audio API.
 */
declare class WebAudio {
	/** 
	 * @class WebAudio
	 * @constructor
	 * @param {String} url The url of the audio file
	 */
	public constructor(url: string);

	public intialize(url: string): void;

	public _url: string;
	public _buffer: AudioBuffer | null;
	public _sourceNode: AudioBufferSourceNode | null;
	public _gainNode: GainNode | null;
	public _pannerNode: PannerNode | null;
	public _totalTime: number;
	public _sampleRate: number;
	public _loopStart: number;
	public _loopLength: number;
	public _startTime: number;
	public _volume: number;
	public _pitch: number;
	public _pan: number;
	public _endTimer: number | null;
	public _loadListeners: WebAudioLoadListener[];
	public _stopListeners: WebAudioStopListener[];
	public _hasError: boolean;
	public _autoPlay: boolean;

	public static _context: AudioContext | null;
	public static _canPlayOgg: string;
	public static _canPlayM4a: string;
	public static _masterGainNode: GainNode | null;
	public static _initialized: boolean;
	public static _unlocked: boolean;

	/**
	 * Initializes the audio system.
	 *
	 * @static
	 * @method initialize
	 * @param {Boolean} noAudio Flag for the no-audio mode
	 * @return {Boolean} True if the audio system is available
	 */
	public static initialize(noAudio: boolean): boolean;

	/**
	 * Checks whether the browser can play ogg files.
	 *
	 * @static
	 * @method canPlayOgg
	 * @return {Boolean} True if the browser can play ogg files
	 */
	public static canPlayOgg(): boolean;

	/**
	 * Checks whether the browser can play m4a files.
	 *
	 * @static
	 * @method canPlayM4a
	 * @return {Boolean} True if the browser can play m4a files
	 */
	public static canPlayM4a(): boolean;

	public static _createContext(): void;
	public static _detectCodecs(): void;
	public static _createMasterGainNode(): void;
	public static _setupEventHandlers(): void;
	public static _onTouchStart(): void;
	public static _onVisibilityChange(): void;
	public static _onHide(): void;
	public static _onShow(): void;
	public static _shouldMuteOnHide(): boolean;
	public static _fadeIn(duration: number): void;
	public static _fadeOut(duration: number): void;

	/**
	 * Clears the audio data.
	 *
	 * @method clear
	 */
	public clear(): void;

	/**
	 * [read-only] The url of the audio file.
	 *
	 * @property url
	 * @type String
	 */
	public readonly url: string;

	/**
	 * The volume of the audio.
	 *
	 * @property volume
	 * @type Number
	 */
	public volume: number;

	/**
	 * The pitch of the audio.
	 *
	 * @property pitch
	 * @type Number
	 */
	public pitch: number;

	/**
	 * The pan of the audio.
	 *
	 * @property pan
	 * @type Number
	 */
	public pan: number;

	/**
	 * Checks whether the audio data is ready to play.
	 *
	 * @method isReady
	 * @return {Boolean} True if the audio data is ready to play
	 */
	public isReady(): boolean;

	/**
	 * Checks whether a loading error has occurred.
	 *
	 * @method isError
	 * @return {Boolean} True if a loading error has occurred
	 */
	public isError(): boolean;

	/**
	 * Checks whether the audio is playing.
	 *
	 * @method isPlaying
	 * @return {Boolean} True if the audio is playing
	 */
	public isPlaying(): boolean;

	/**
	 * Plays the audio.
	 *
	 * @method play
	 * @param {Boolean} loop Whether the audio data play in a loop
	 * @param {Number} offset The start position to play in seconds
	 */
	public play(loop: boolean, offset: number): void;

	/**
	 * Stops the audio.
	 *
	 * @method stop
	 */
	public stop(): void;

	/**
	 * Performs the audio fade-in.
	 *
	 * @method fadeIn
	 * @param {Number} duration Fade-in time in seconds
	 */
	public fadeIn(duration: number): void;

	/**
	 * Performs the audio fade-out.
	 *
	 * @method fadeOut
	 * @param {Number} duration Fade-out time in seconds
	 */
	public fadeOut(duration: number): void;

	/**
	 * Gets the seek position of the audio.
	 *
	 * @method seek
	 */
	public seek(): number;

	/**
	 * Add a callback function that will be called when the audio data is loaded.
	 *
	 * @method addLoadListener
	 * @param {Function} listner The callback function
	 */
	public addLoadListener(listener: WebAudioLoadListener): void;

	/**
	 * Add a callback function that will be called when the playback is stopped.
	 *
	 * @method addStopListener
	 * @param {Function} listner The callback function
	 */
	public addStopListener(listener: WebAudioStopListener): void;

	public _load(url: string): void;
	public _onXhrLoad(xhr: XMLHttpRequest): void;
	public _startPlaying(loop: boolean, offset: number): void;
	public _createNodes(): void;
	public _connectNodes(): void;
	public _removeNodes(): void;
	public _createEndTimer(): void;
	public _removeEndTimer(): void;
	public _updatePanner(): void;
	public _onLoad(): void;
	public _readLoopComments(array: Uint8Array): void;
	public _readOgg(array: Uint8Array): void;
	public _readMp4(array: Uint8Array): void;
	public _readMetaData(array: Uint8Array, index: number, size: number): void;
	public _readLittleEndian(array: Uint8Array, index: number): number;
	public _readBigEndian(array: Uint8Array, index: number): number;
	public _readFourCharacters(array: Uint8Array, index: number): string;
}
type WebAudioLoadListener = () => void;
type WebAudioStopListener = () => void;

//-----------------------------------------------------------------------------
/**
 * The static class that handles HTML5 Audio.
 */
declare class Html5Audio {
	/** 
	 * @class Html5Audio
	 * @constructor
	 */
	private constructor();

	public static _initialized: boolean;
	public static _unlocked: boolean;
	public static _audioElement: HTMLAudioElement | null;
	public static _gainTweenInterval: number | null;
	public static _tweenGain: number;
	public static _tweenTargetGain: number;
	public static _tweenGainStep: number;
	public static _staticSePath: string | null;

	public static _volume: number;
	public static _loadListeners: Html5AudioLoadListener[];
	public static _hasError: boolean;
	public static _autoPlay: boolean;
	public static _isLoading: boolean;
	public static _buffered: boolean;

	/**
	 * Sets up the Html5 Audio.
	 *
	 * @static
	 * @method setup
	 * @param {String} url The url of the audio file
	 */
	public static setup(url: string): void;

	/**
	 * Initializes the audio system.
	 *
	 * @static
	 * @method initialize
	 * @return {Boolean} True if the audio system is available
	 */
	public static initialize(): boolean;

	public static _setupEventHandlers(): void;
	public static _onTouchStart(): void;
	public static _onVisibilityChange(): void;
	public static _onLoadedData(): void;
	public static _onError(): void;
	public static _onEnded(): void;
	public static _onHide(): void;
	public static _onShow(): void;

	/**
	 * Clears the audio data.
	 *
	 * @static
	 * @method clear
	 */
	public static clear(): void;

	/**
	 * Set the URL of static se.
	 *
	 * @static
	 * @param {String} url
	 */
	public static setStaticSe(url: string): void;

	/**
	 * [read-only] The url of the audio file.
	 *
	 * @property url
	 * @type String
	 */
	public static readonly url: string;

	/**
	 * The volume of the audio.
	 *
	 * @property volume
	 * @type Number
	 */
	public static volume: number;

	/**
	 * Checks whether the audio data is ready to play.
	 *
	 * @static
	 * @method isReady
	 * @return {Boolean} True if the audio data is ready to play
	 */
	public static isReady(): boolean;

	/**
	 * Checks whether a loading error has occurred.
	 *
	 * @static
	 * @method isError
	 * @return {Boolean} True if a loading error has occurred
	 */
	public static isError(): boolean;

	/**
	 * Checks whether the audio is playing.
	 *
	 * @static
	 * @method isPlaying
	 * @return {Boolean} True if the audio is playing
	 */
	public static isPlaying(): boolean;

	/**
	 * Plays the audio.
	 *
	 * @static
	 * @method play
	 * @param {Boolean} loop Whether the audio data play in a loop
	 * @param {Number} offset The start position to play in seconds
	 */
	public static play(loop: boolean, offset: number): void;

	/**
	 * Stops the audio.
	 *
	 * @static
	 * @method stop
	 */
	public static stop(): void;

	/**
	 * Performs the audio fade-in.
	 *
	 * @static
	 * @method fadeIn
	 * @param {Number} duration Fade-in time in seconds
	 */
	public static fadeIn(duration: number): void;

	/**
	 * Performs the audio fade-out.
	 *
	 * @static
	 * @method fadeOut
	 * @param {Number} duration Fade-out time in seconds
	 */
	public static fadeOut(duration: number): void;

	/**
	 * Gets the seek position of the audio.
	 *
	 * @static
	 * @method seek
	 */
	public static seek(): number;

	/**
	 * Add a callback function that will be called when the audio data is loaded.
	 *
	 * @static
	 * @method addLoadListener
	 * @param {Function} listner The callback function
	 */
	public static addLoadListener(listener: Html5AudioLoadListener): void;

	public static _load(url: string): void;
	public static _startPlaying(loop: boolean, offset: number): void;
	public static _onLoad(): void;
	public static _startGainTween(duration: number): void;
	public static _applyTweenValue(volume: number): void;
}
type Html5AudioLoadListener = () => void;

//-----------------------------------------------------------------------------
/**
 * The static class that handles JSON with object information.
 */
declare class JsonEx {
	/** 
	 * @class JsonEx
	 */
	private constructor();

	/**
	 * The maximum depth of objects.
	 *
	 * @static
	 * @property maxDepth
	 * @type Number
	 * @default 100
	 */
	public static maxDepth: number;

	/**
	 * Converts an object to a JSON string with object information.
	 *
	 * @static
	 * @method stringify
	 * @param {Object} object The object to be converted
	 * @return {String} The JSON string
	 */
	public static stringify(object: any): string;

	/**
	 * Parses a JSON string and reconstructs the corresponding object.
	 *
	 * @static
	 * @method parse
	 * @param {String} json The JSON string
	 * @return {Object} The reconstructed object
	 */
	public static parse(json: string): any;

	/**
	 * Makes a deep copy of the specified object.
	 *
	 * @static
	 * @method makeDeepCopy
	 * @param {Object} object The object to be copied
	 * @return {Object} The copied object
	 */
	public static makeDeepCopy<T>(object: T): T;

	public static _encode<T>(value: T, depth: number): T;
	public static _decode<T>(value: T): T;
	public static _getConstructorName(value: Function): string;
	public static _resetPrototype<T>(value: T, prototype: any): T;
}

declare class Decrypter {
	private constructor();

	public static hasEncryptedImages: boolean;
	public static hasEncryptedAudio: boolean;
	public static _requestImgFile: string[];
	public static _headerlength: number;
	public static _xhrOk: number;
	public static _encryptionKey: string;
	public static _ignoreList: string[];
	public static readonly SIGNATURE: string;
	public static readonly VER: string;
	public static readonly REMAIN: string;

	public static checkImgIgnore(url: string): boolean;
	public static decryptImg(url: string, bitmap: Bitmap): void;
	public static decryptHTML5Audio(url: string, bgm: MV.AudioFile, pos: number): void;
	public static cutArrayHeader(arrayBuffer: ArrayBuffer, length: number): ArrayBuffer;
	public static decryptArrayBuffer(arrayBuffer: ArrayBuffer): ArrayBuffer;
	public static createBlobUrl(arrayBuffer: ArrayBuffer): string;
	public static extToEncryptExt(url: string): string;
	public static readEncryptionkey(): void;
}
