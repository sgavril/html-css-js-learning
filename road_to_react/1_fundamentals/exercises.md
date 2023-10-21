# Exercises

- Why is the Key attribute needed in React? - What problems can the Key attribute cause for dynamic lists?
    - Keys should be defined clearly to avoid needlessly rerendering performance hits https://dev.to/jtonzing/the-significance-of-react-keys---a-visual-explanation--56l7
```jsx
const stefans = [{ Name: "Stefan",}, { Name: "Stefon",}, { Name: "notStefan", }]
```
    - Every time we change a list, a new list is created
    - When a new list is created, the React reconciler checks for differences, if the key is non-unique then updates can lead to unexpected behaviour (ex: a component gets a state that belongs to another component)
- Recall the standard built-in array methods
    - map
    - filter
    - reduce