import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";

const daysOfWeek = [
  {
    id: "SUNDAY",
    name: "Sunday",
  },
  {
    id: "MONDAY",
    name: "Monday",
  },
  {
    id: "TUESDAY",
    name: "Tuesdays",
  },
  {
    id: "WEDNESDAY",
    name: "Wednesday",
  },
  {
    id: "THURSDAY",
    name: "Thursday",
  },
  {
    id: "FRIDAY",
    name: "Friday",
  },
  {
    id: "SATURDAY",
    name: "Saturday",
  },
];

const AllocationForm = ({
  allocation,
  onChange,
  onSubmit,
  professors,
  courses,
}) => {
  const history = useHistory();

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Day of Week</Form.Label>
        <select
          className="form-control"
          name="dayOfWeek"
          onChange={onChange}
          value={allocation.dayOfWeek}
        >
          {daysOfWeek.map(({ id, name }, index) => (
            <option key={index} value={id}>
              {name}
            </option>
          ))}
        </select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Start Hour</Form.Label>
        <Form.Control
          name="startHour"
          onChange={onChange}
          type="time"
          value={allocation.startHour}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>End Hour</Form.Label>
        <Form.Control
          type="time"
          onChange={onChange}
          name="endHour"
          value={allocation.endHour}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Professor</Form.Label>
        <select
          className="form-control"
          name="professorId"
          onChange={onChange}
          value={allocation.professorId}
        >
          <option>Select one professor</option>
          {professors.map(({ id, name }, index) => (
            <option key={index} value={id}>
              {name}
            </option>
          ))}
        </select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Course</Form.Label>
        <select
          className="form-control"
          name="courseId"
          onChange={onChange}
          value={allocation.courseId}
        >
          <option>Select one course</option>
          {courses.map(({ id, name }, index) => (
            <option key={index} value={id}>
              {name}
            </option>
          ))}
        </select>
      </Form.Group>

      <div className="mt-3">
        <Button onClick={() => history.goBack()} variant="secondary">
          Back
        </Button>
        &ensp;
        <Button type="submit">Save Changes</Button>
      </div>
    </Form>
  );
};

export default AllocationForm;
