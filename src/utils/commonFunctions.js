/**
 * This is a function that returns a debounced version of a given function with a specified
 * delay.
 * @param func - The function that needs to be debounced.
 * @param delay - The `delay` parameter is a number that represents the time in milliseconds
 * for which the execution of the `func` function should be delayed after the last call to the returned
 * function. This is used to implement a debounce function that delays the execution of a function
 * until a certain amount of time has passed without
 * @returns A debounced version of the input function `func`. The returned function takes the same
 * arguments as `func` and will only execute `func` after a delay of `delay` milliseconds has passed
 * since the last time the returned function was called. If the returned function is called again
 * before the delay has passed, the previous timeout is cleared and a new one is set.
 */
 export const debounce =(
    func,
    delay
  ) => {
    let timeoutId
  
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };