import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

import api from "../../services/axios";
import Page from "../../components/Page";
import ListView from "../../components/ListView";

const formatHour = (time) => {
  const [hour] = time.split("+");
  return hour;
};

const Allocation = () => {
  const history = useHistory();

  const columns = [
    {
      value: "ID",
      id: "id",
    },
    {
      value: "Day of Week",
      id: "dayOfWeek",
    },
    {
      value: "Start Hour",
      id: "startHour",
      render: (time) => formatHour(time),
    },
    {
      value: "End Hour",
      id: "endHour",
      render: (time) => formatHour(time),
    },
    {
      value: "Professor",
      id: "professor",
      render: (professor) => professor.name,
    },
    {
      value: "Department",
      id: "professor",
      render: (professor) => professor.department.name,
    },
    {
      value: "Course",
      id: "course",
      render: (course) => course.name,
    },
  ];

  const actions = [
    {
      name: "Edit",
      action: (allocation) => {
        history.push(`/allocations/${allocation.id}`);
      },
    },
    {
      name: "Remove",
      action: async (item, refetch) => {
        if (
          window.confirm("Você tem certeza que deseja remover este alocação ?")
        ) {
          try {
            await api.delete(`/allocations/${item.id}`);
            await refetch();
            toast.info("Alocação Removida");
          } catch (error) {
            toast.info(error.message);
          }
        }
      },
    },
  ];

  return (
    <Page title="Allocations">
      <Button className="mb-3" onClick={() => history.push("/allocations/new")}>
        Create Allocation
      </Button>
      <ListView actions={actions} columns={columns} endpoint="/allocations" />
    </Page>
  );
};

export default Allocation;
