import * as React from 'react';

const welcome = {
  greeting: 'Hey',
  title: 'React',
};

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org',
    author:' Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function getTitle(title) {
  return title;
}

function App() {
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />

      <hr />
      <ul>
        {list.map(function(item) {
          /*Render each item of the list (below)*/
          /*return <li>{item.title}</li>;*/
          /*Each item in a list has a key ; good practice to use*/
          /*return <li key={item.objectID}>{item.title}</li>*/
          /*do NOT do this, React cannot identify order changes*/
          /*
          <ul>
            {list.map(function(item, index) {
              return(<li key={index}></li>);
            })}
          */
          /*More comprehensive example*/
          return(
            <li key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </li>
          )
        })}
      </ul>
      {/* Also, this is a comment in JSX */}
    </div>
  );
}

export default App;