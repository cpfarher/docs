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

### paint layout and composite
* Each time something is change in the DOM/CSS, the browser follow this to update the UI: Style, Layour(reflow), paint(repaint), composite (combine layers).
* A composite only prop only affects the compositing layer in the pipeline and does not fire layout and pain. (```transform, opacity and filter in some cases```). On this way you get best performance on animations.
* ```will-change```prepeare the browser for future changes over one property.
* ```diplay:none```the element does not render, so does not use space. Can cause reflow. While ```visibility:hidden``` it use space, but does not paint, so does not cause reflow.
* ```contains``` wllows to isolate components to avoid changes that affect the layout or a paint of other elements

### Primitives types - Referece vs Value pass
* JS always pass as value. But if the value is a reference to an object, the internal changes on the object will be visible outside of the function. While, replace the reference inside the function won't affect the original object.
* You can modify the props inside the function, but do not replace the original object when you pass an object to a function for example.
* Value copy: ```string, number, boolean, undefined, null, bigint, symbol. ```
* Reference pass: ```Objects, arrays, functions```. But the Reference pass as value

### Var, let const
* ```var``` ignores blocks like if, for, etc. tight to functions. Var hoisted and initialized.
* ```let and const``` tight to scope where were declare - so outside of them not exists - . Both were in a TDS (temporal dead zone) until the declaration will be execute.
* ```const``` does not alloy re assign, but allows mutate objects and arrays
