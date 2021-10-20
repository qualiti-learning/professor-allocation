import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import ListView from "../../components/ListView";
import Modal from "../../components/Modal";
import Page from "../../components/Page";
import api from "../../services/axios";

const columns = [
  {
    value: "ID",
    id: "id",
  },
  {
    value: "Name",
    id: "name",
  },
];

const INITIAL_STATE = { id: 0, name: "" };

const endpoint = "/departments";

const Departments = () => {
  const [visible, setVisible] = useState(false);
  const [department, setDepartment] = useState(INITIAL_STATE);

  const handleSave = async (refetch) => {
    try {
      if (department.id) {
        await api.put(`${endpoint}/${department.id}`, {
          name: department.name,
        });

        toast.success("Atualizado com sucesso!");
      } else {
        await api.post(endpoint, { name: department.name });

        toast.success("Cadastrado com sucesso!");
      }

      setVisible(false);

      await refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const actions = [
    {
      name: "Edit",
      action: (_departament) => {
        setDepartment(_departament);
        setVisible(true);
      },
    },
    {
      name: "Remove",
      action: async (item, refetch) => {
        if (
          window.confirm(
            "Você tem certeza que deseja remover este departamento?"
          )
        ) {
          try {
            await api.delete(`${endpoint}/${item.id}`);
            await refetch();
            toast.info(`Departmentso: ${item.name} foi removido`);
          } catch (error) {
            toast.info(error.message);
          }
        }
      },
    },
  ];

  return (
    <Page title="Departments">
      <Button
        className="mb-2"
        onClick={() => {
          setDepartment(INITIAL_STATE);
          setVisible(true);
        }}
      >
        Create Department
      </Button>

      <ListView actions={actions} columns={columns} endpoint={endpoint}>
        {({ refetch }) => (
          <Modal
            title={`${department.id ? "Update" : "Create"} Department`}
            show={visible}
            handleClose={() => setVisible(false)}
            handleSave={() => handleSave(refetch)}
          >
            <Form>
              <Form.Group>
                <Form.Label>Department Name</Form.Label>
                <Form.Control
                  name="departament"
                  onChange={(event) =>
                    setDepartment({ ...department, name: event.target.value })
                  }
                  value={department.name}
                />
              </Form.Group>
            </Form>
          </Modal>
        )}
      </ListView>
    </Page>
  );
};

export default Departments;
