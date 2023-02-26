'use strict';

const drag = ev => ev.dataTransfer.setData("text", ev.target.id);

const dragOver = ev => ev.preventDefault();

const droppable = ev =>  ev.target.classList.add("hover");

const dragLeave = ev => ev.target.classList.remove("hover");

const drop = ev => {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  ev.target.classList.remove("hover");
  ev.target.appendChild(document.getElementById(data));
}

const columnHeader = title => React.createElement('h1',{},title);

const droppableElement = (id, name) => React.createElement(
  'div',
  {
    onDrop: drop,
    onDragEnter: droppable,
    onDragOver: dragOver,
    onDragLeave: dragLeave,
    className: 'kanban-column',
    id: id
  },
  columnHeader(name), draggableElement(`${name} #1`), draggableElement(`${name} #2`), draggableElement(`${name} #3`)
);

const draggableElement = text => React.createElement(
  'div',
  {
    draggable: true,
    onDragStart: drag,
    className: 'kanban-card',
    id: text
  },
  text
  );

const board = () => React.createElement(
  'div', { className: 'board' },
  droppableElement('todo', 'To Do'),
  droppableElement('pending', 'Pending'),
  droppableElement('done', 'Done'),
);

const domNode = document.getElementById('app');
const root = ReactDOM.createRoot(domNode);
root.render(board());