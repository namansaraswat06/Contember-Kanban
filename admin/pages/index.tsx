import * as React from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./kanban.css";

const initialData = {
  columns: {
    todo: {
      id: "todo",
      title: "To Do",
      taskIds: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      taskIds: [],
    },
    done: {
      id: "done",
      title: "Done",
      taskIds: [],
    },
  },
  tasks: {
    "1": {
      id: "1",
      Order: "1",
      Status: "Development",
      Priority: "Medium",
      username: "naman",
      serviceID: "001",
      assignedTo: "assigned_1",
      targetDate: "2023-04-06",
      CreatedDate: "2023-04-04",
      Description:
        "Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates will look with real data. Often, developers use third-party services to generate",
      customerName: "naman_1",
      modifiedDate: "2023-04-04",
    },
    "2": {
      id: "2",
      Order: "1",
      Status: "Testing",
      Priority: "Medium",
      username: "naman",
      serviceID: "002",
      assignedTo: "assigned_2",
      targetDate: "2023-07-05",
      CreatedDate: "2023-05-04",
      Description:
        "Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates will look with real data. Often, developers use third-party services to generate",
      customerName: "naman_2",
      modifiedDate: "2023-05-04",
    },
    "3": {
      id: "3",
      Order: "1",
      Status: "Testing",
      Priority: "Medium",
      username: "naman",
      serviceID: "003",
      assignedTo: "assigned_3",
      targetDate: "2023-08-05",
      CreatedDate: "2023-06-04",
      Description:
        "Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates will look with real data. Often, developers use third-party services to generate",
      customerName: "naman_3",
      modifiedDate: "2023-06-04",
    },
    "4": {
      id: "4",
      Order: "1",
      Status: "Development",
      Priority: "Low",
      username: "kanishk",
      serviceID: "004",
      assignedTo: "assigned_4",
      targetDate: "2023-09-10",
      CreatedDate: "2023-07-04",
      Description:
        "Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates will look with real data. Often, developers use third-party services to generate",
      customerName: "naman_4",
      modifiedDate: "2023-07-04",
    },
    "5": {
      id: "5",
      Order: "1",
      Status: "Development",
      Priority: "Medium",
      username: "kanishk",
      serviceID: "005",
      assignedTo: "assigned_5",
      targetDate: "2023-10-12",
      CreatedDate: "2023-08-04",
      Description:
        "Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates will look with real data. Often, developers use third-party services to generate",
      customerName: "naman_5",
      modifiedDate: "2023-08-04",
    },
    "6": {
      id: "6",
      Order: "1",
      Status: "Testing",
      Priority: "Medium",
      username: "naman",
      serviceID: "006",
      assignedTo: "assigned_6",
      targetDate: "2023-11-01",
      CreatedDate: "2023-09-04",
      Description:
        "Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates will look with real data. Often, developers use third-party services to generate",
      customerName: "naman_6",
      modifiedDate: "2023-09-04",
    },
    "7": {
      id: "7",
      Order: "1",
      Status: "Development",
      Priority: "Low",
      username: "kanishk",
      serviceID: "007",
      assignedTo: "assigned_7",
      targetDate: "12-04-2023",
      CreatedDate: "2023-10-04",
      Description:
        "Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates will look with real data. Often, developers use third-party services to generate",
      customerName: "naman_7",
      modifiedDate: "2023-10-04",
    },
    "8": {
      id: "8",
      Order: "1",
      Status: "Testing",
      Priority: "Low",
      username: "naman",
      serviceID: "008",
      assignedTo: "assigned_8",
      targetDate: "2023-12-13",
      CreatedDate: "2023-11-04",
      Description:
        "Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates will look with real data. Often, developers use third-party services to generate",
      customerName: "naman_8",
      modifiedDate: "2023-11-04",
    },
    "9": {
      id: "9",
      Order: "1",
      Status: "Development",
      Priority: "Medium",
      username: "kanishk",
      serviceID: "009",
      assignedTo: "assigned_9",
      targetDate: "2023-12-14",
      CreatedDate: "2023-12-04",
      Description:
        "Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates will look with real data. Often, developers use third-party services to generate",
      customerName: "naman_9",
      modifiedDate: "2023-12-04",
    },
    "10": {
      id: "10",
      Order: "1",
      Status: "Development",
      Priority: "High",
      username: "kanishk",
      serviceID: "010",
      assignedTo: "assigned_10",
      targetDate: "2023-10-15",
      CreatedDate: "2023-13-04",
      Description:
        "Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates will look with real data. Often, developers use third-party services to generate",
      customerName: "naman_10",
      modifiedDate: "2023-13-04",
    },
  },
};

function App() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const end = data.columns[destination.droppableId];

    if (start === end) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
    } else {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const endTaskIds = Array.from(end.taskIds);
      endTaskIds.splice(destination.index, 0, draggableId);
      const newEnd = {
        ...end,
        taskIds: endTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newStart.id]: newStart,
          [newEnd.id]: newEnd,
        },
      };

      setData(newState);
    }
  };

  return (
    <div
      className="responsive"
      style={{
        display: "flex",
      }}
    >
      <DragDropContext
        onDragEnd={onDragEnd}
        className="container container-fluid"
        responsive
      >
        {Object.values(data.columns).map((column) => (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided, snapshot) => (
              <div
                style={{ width: "50%" }}
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`column ${
                  snapshot.isDraggingOver ? "dragging-over" : ""
                }`}
              >
                <h3 className="kanbanHeader" style={{ textAlign: "center" }}>
                  {column.title}
                </h3>
                {column.taskIds.map((taskId, index) => {
                  const task = data.tasks[taskId];
                  return (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`task ${
                            snapshot.isDragging ? "dragging" : ""
                          }`}
                        >
                          <Card
                            key={task.id}
                            className="task mainCard"
                            draggable
                          >
                            <Card.Header className="cardHeaderPanel">
                              <div className="cardHeader">
                                <div>
                                  <Card.Text className="cardServiceId">
                                    Service ID
                                  </Card.Text>
                                  <Card.Text>{task.serviceID}</Card.Text>
                                </div>
                                <div className="headerChips">
                                  <Card.Text className="cardTargetDate">
                                    {task.targetDate}
                                  </Card.Text>
                                  <Card.Text className="cardStackDetail">
                                    {column.title}
                                  </Card.Text>
                                </div>
                              </div>
                            </Card.Header>
                            <Card.Body className="cardBody">
                              <div>
                                <div className="cardDatesDetail">
                                  <div className="CardDates">
                                    <Card.Text className="cardLabel text-muted">
                                      Created Date:{" "}
                                      <span>{task.CreatedDate}</span>{" "}
                                    </Card.Text>
                                    <Card.Text></Card.Text>
                                  </div>
                                  <div className="CardDates">
                                    <Card.Text className="cardLabel text-muted">
                                      Modified Date:{" "}
                                      <span>{task.modifiedDate}</span>
                                    </Card.Text>
                                    <Card.Text></Card.Text>
                                  </div>
                                </div>
                                <div>
                                  <Card.Text className="cardDescription">
                                    {task.Description}
                                  </Card.Text>
                                </div>
                              </div>
                              <div className="cardChipDetail">
                                <div className="cardChips">
                                  <div className="cardChipsDetails">
                                    <Card.Text className="cardLabel text-muted">
                                      Customer
                                    </Card.Text>
                                    <Card.Text className="cardLabelDetail">
                                      {task.customerName}
                                    </Card.Text>
                                  </div>
                                  <div className="cardChipsDetails">
                                    <Card.Text className="cardLabel text-muted">
                                      ID
                                    </Card.Text>
                                    <Card.Text className="cardLabelDetail">
                                      {task.id}
                                    </Card.Text>
                                  </div>
                                </div>
                                <div className="cardChips">
                                  <div className="cardChipsDetails">
                                    <Card.Text className="cardLabel text-muted">
                                      Assigned To
                                    </Card.Text>
                                    <Card.Text className="cardLabelDetail">
                                      {task.assignedTo}
                                    </Card.Text>
                                  </div>
                                  <div className="cardChipsDetails">
                                    <Card.Text className="cardLabel text-muted">
                                      Created By
                                    </Card.Text>
                                    <Card.Text className="cardLabelDetail">
                                      {task.username}
                                    </Card.Text>
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
