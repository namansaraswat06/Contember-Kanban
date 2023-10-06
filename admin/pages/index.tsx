import * as React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import "./kanban.css";
const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
    ],
    inProgress: [],
    done: [],
  });

  const handleDragStart = (e, task, sourceColumn) => {
    e.dataTransfer.setData("task", JSON.stringify({ task, sourceColumn }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn, index) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData("task"));
    const { task, sourceColumn } = droppedTask;

    if (targetColumn !== sourceColumn) {
      const updatedTasks = { ...tasks };
      const taskIndex = updatedTasks[sourceColumn].findIndex(
        (t) => t.id === task.id
      );

      if (taskIndex !== -1) {
        updatedTasks[sourceColumn].splice(taskIndex, 1);
        updatedTasks[targetColumn].splice(index, 0, task); // Insert at the specified index
        setTasks(updatedTasks);
      }
    }
  };

  const handleCardDrag = (e, task, sourceColumn, columnIndex, cardIndex) => {
    e.preventDefault();
    const draggedTaskIndex = tasks[sourceColumn].findIndex(
      (t) => t.id === task.id
    );

    if (draggedTaskIndex !== -1) {
      const updatedTasks = { ...tasks };
      const targetIndex =
        columnIndex === 0
          ? cardIndex
          : columnIndex === 1
          ? tasks.inProgress.length + cardIndex
          : tasks.done.length + cardIndex;
      updatedTasks[sourceColumn].splice(draggedTaskIndex, 1);
      updatedTasks[sourceColumn].splice(targetIndex, 0, task);
      setTasks(updatedTasks);
    }
  };

  return (
    <Container fluid className="mainKanban">
      <Row className="mainKanban">
        <Col onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "todo")}>
          <div className="column">
            <h3 style={{ textAlign: "center" }}>Todo</h3>
            {tasks.todo.map((task, index) => (
              <Card
                key={task.id}
                className="task mainCard"
                draggable
                onDragStart={(e) => handleDragStart(e, task, "todo")}
                onDragOver={(e) => handleCardDrag(e, task, "todo", 0, index)}
                onDrop={(e) => handleDrop(e, "todo", index)}
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
                      <Card.Text className="cardStackDetail">ToDo</Card.Text>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="cardBody">
                  <div>
                    <div className="cardDatesDetail">
                      <div className="CardDates">
                        <Card.Text className="cardLabel text-muted">
                          Created Date: <span>{task.CreatedDate}</span>{" "}
                        </Card.Text>
                        <Card.Text></Card.Text>
                      </div>
                      <div className="CardDates">
                        <Card.Text className="cardLabel text-muted">
                          Modified Date: <span>{task.modifiedDate}</span>
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
            ))}
          </div>
        </Col>
        <Col
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "inProgress")}
        >
          <div className="column">
            <h3 style={{ textAlign: "center" }}>In Progress</h3>
            {tasks.inProgress.map((task, index) => (
              <Card
                key={task.id}
                className="task mainCard"
                draggable
                onDragStart={(e) => handleDragStart(e, task, "inProgress")}
                onDragOver={(e) => handleCardDrag(e, task, "inProgress", index)}
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
                        In Progress
                      </Card.Text>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="cardBody">
                  <div>
                    <div className="cardDatesDetail">
                      <div className="CardDates">
                        <Card.Text className="cardLabel text-muted">
                          Created Date: <span>{task.CreatedDate}</span>{" "}
                        </Card.Text>
                        <Card.Text></Card.Text>
                      </div>
                      <div className="CardDates">
                        <Card.Text className="cardLabel text-muted">
                          Modified Date: <span>{task.modifiedDate}</span>
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
            ))}
          </div>
        </Col>
        <Col onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "done")}>
          <div className="column">
            <h3 style={{ textAlign: "center" }}>Done</h3>
            {tasks.done.map((task, index) => (
              <Card
                key={task.id}
                className="task mainCard"
                draggable
                onDragStart={(e) => handleDragStart(e, task, "done")}
                onDragOver={(e) => handleCardDrag(e, task, "done", index)}
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
                      <Card.Text className="cardStackDetail">Done</Card.Text>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="cardBody">
                  <div>
                    <div className="cardDatesDetail">
                      <div className="CardDates">
                        <Card.Text className="cardLabel text-muted">
                          Created Date: <span>{task.CreatedDate}</span>{" "}
                        </Card.Text>
                        <Card.Text></Card.Text>
                      </div>
                      <div className="CardDates">
                        <Card.Text className="cardLabel text-muted">
                          Modified Date: <span>{task.modifiedDate}</span>
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
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default KanbanBoard;
