# Front Interview
QQ on interviews about something that I know and I used every day but I don't know or forget the "keyword names".

## React

### Controlled and uncontrolled components 
https://www.freecodecamp.org/news/what-are-controlled-and-uncontrolled-components-in-react
* **Controlled** components rely on React state to manage the form data. (```input, textarea, select```). That are managed by React state. This means that the value of the form element is set and updated through React state, making React the "single source of truth" for the form data. By controlling form elements via state, you gain more control over user interactions and can easily enforce validation, format data, and respond to changes.

* while **uncontrolled** components use the DOM itself to handle form data. Uncontrolled components in React manage their own state internally rather than relying on React state. This approach is useful for simple forms where you don't need to manipulate the input data through React state updates. Commonly use: *useRef*

### useCallback vs useMemo
https://medium.com/@jan.hesters/usecallback-vs-usememo-c23ad1dc60

both expect a function and an array of dependencies. The difference is that useCallback returns its function when the dependencies change while useMemo calls its function and returns the result.

* *useCallback*: returns a memoized callback. Gives you referential equality between renders for *functions*
* *useMemo*: returns a memoized value. gives you referential equality between renders fro *values*

### css grid vs flex

* css grid is a two dimensional grid based layout with rows and columns
* flexbox is one dimensional layout usefull in allocating and aligning the space among items in a grid container.

