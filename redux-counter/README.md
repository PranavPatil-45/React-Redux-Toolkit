

# Counter App

A simple **Counter Application** built with **Redux Toolkit** for state management. This app demonstrates the core concepts of Redux such as creating slices, dispatching actions, and reading state using selectors.

## Features

* Increment the counter
* Decrement the counter
* Reset the counter to zero
* State management handled with Redux Toolkit
* Clean and minimal UI

## Tech Stack

* **React** for UI rendering
* **Redux Toolkit** for state management
* **JavaScript** for logic implementation
* **CSS / Bootstrap** for styling (optional)

## How It Works

1. **Redux Slice**: A slice is created for the counter state containing actions for increment, decrement, and reset.
2. **Store**: The slice reducer is added to the store for global state management.
3. **React Components**: Components interact with the store using `useDispatch` to send actions and `useSelector` to read the counter value.

## Project Structure

```
src/
│── app/
│   └── store.js        # Redux store configuration
│── features/
│   └── counterSlice.js # Counter slice with actions and reducer
│── components/
│   └── Counter.js      # Counter component with buttons and display
│── App.js              # Main app component
│── index.js            # Application entry point
```

## Available Actions

* **Increment** → Increases counter value by 1
* **Decrement** → Decreases counter value by 1
* **Reset** → Sets counter value back to 0

## Installation

1. Clone or download the project files
2. Install dependencies:

   ```
   npm install
   ```
3. Start the development server:

   ```
   npm start
   ```

## Usage

* Click the **+** button to increase the counter
* Click the **-** button to decrease the counter
* Click **Reset** to set the counter back to zero

---

