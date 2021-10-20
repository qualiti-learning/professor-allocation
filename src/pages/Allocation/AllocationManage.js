import { withRouter } from "react-router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

import AllocationForm from "./AllocationForm";
import Page from "../../components/Page";
import api from "../../services/axios";

const AllocationManage = ({
  match: {
    params: { id },
  },
}) => {
  const [allocation, setAllocation] = useState({
    courseId: 0,
    dayOfWeek: "FRIDAY",
    endHour: "22:00-0300",
    professorId: 0,
    startHour: "19:00-0300",
  });
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);
  const history = useHistory();

  const isEdit = id !== "new";

  const getInitialData = async () => {
    const [responseCourse, responseProfessor] = await Promise.all([
      api.get("/courses"),
      api.get("/professors"),
    ]);

    if (isEdit) {
      const responseAllocation = await api.get(`/allocations/${id}`);

      setAllocation({
        ...responseAllocation.data,
        startHour: responseAllocation.data.startHour.replace("+0000", ""),
        endHour: responseAllocation.data.endHour.replace("+0000", ""),
        professorId: responseAllocation.data.professor.id,
        courseId: responseAllocation.data.course.id,
      });
    }

    setCourses(responseCourse.data);
    setProfessors(responseProfessor.data);
  };

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = ({ target: { name, value } }) => {
    setAllocation({
      ...allocation,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const data = {
      ...allocation,
      startHour: `${allocation.startHour}+0000`,
      endHour: `${allocation.endHour}+0000`,
    };

    try {
      if (isEdit) {
        await api.put(`/allocations/${id}`, data);
      } else {
        await api.post("/allocations", data);
      }
      toast.success(
        `Allocation ${isEdit ? "Updated" : "Created"} with Success`
      );
      history.push("/allocations");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Page title={isEdit ? "Update Allocation" : "Create Allocation"}>
      <AllocationForm
        allocation={allocation}
        courses={courses}
        onChange={onChange}
        onSubmit={onSubmit}
        professors={professors}
      />
    </Page>
  );
};

export default withRouter(AllocationManage);
