import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import ListView from "../../components/ListView";
import Modal from "../../components/Modal";
import Page from "../../components/Page";
import api from "../../services/axios";

const endpoint = "/professors";

const columns = [
  {
    value: "ID",
    id: "id",
  },
  {
    value: "Name",
    id: "name",
  },
  {
    value: "CPF",
    id: "cpf",
  },
  {
    value: "Departament",
    id: "department",
    render: (departament) => departament.name,
  },
];

const INITIAL_STATE = { id: 0, name: "", cpf: "", departmentId: 0 };

const Professor = () => {
  const [visible, setVisible] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [professor, setProfessor] = useState(INITIAL_STATE);

  useEffect(() => {
    api
      .get("/departments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const actions = [
    {
      name: "Edit",
      action: ({ id, name, cpf, department: { id: departmentId } }) => {
        setProfessor({ id, cpf, name, departmentId });
        setVisible(true);
      },
    },
    {
      name: "Remove",
      action: async (item, refetch) => {
        if (
          window.confirm(
            "Você tem certeza que deseja remover esta informação ?"
          )
        ) {
          try {
            await api.delete(`${endpoint}/${item.id}`);
            await refetch();
            toast.info(`Informação: ${item.name} foi removido`);
          } catch (error) {
            toast.info(error.message);
          }
        }
      },
    },
  ];

  const handleSave = async (refetch) => {
    const data = {
      name: professor.name,
      cpf: professor.cpf,
      departmentId: professor.departmentId,
    };

    try {
      if (professor.id) {
        await api.put(`${endpoint}/${professor.id}`, data);

        toast.success("Atualizado com sucesso!");
      } else {
        await api.post(endpoint, data);

        toast.success("Cadastrado com sucesso!");
      }

      setVisible(false);

      await refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onChange = ({ target: { name, value } }) => {
    setProfessor({
      ...professor,
      [name]: value,
    });
  };

  return (
    <Page title="Professors">
      <Button
        className="mb-2"
        onClick={() => {
          setProfessor(INITIAL_STATE);
          setVisible(true);
        }}
      >
        Create Professor
      </Button>

      <ListView actions={actions} columns={columns} endpoint={endpoint}>
        {({ refetch }) => (
          <Modal
            title={`${professor.id ? "Update" : "Create"} Professor`}
            show={visible}
            handleClose={() => setVisible(false)}
            handleSave={() => handleSave(refetch)}
          >
            <Form>
              <Form.Group>
                <Form.Label>Professor Name</Form.Label>
                <Form.Control
                  name="name"
                  onChange={onChange}
                  value={professor.name}
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Professor CPF</Form.Label>
                <Form.Control
                  name="cpf"
                  onChange={onChange}
                  value={professor.cpf}
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Department</Form.Label>
                <select
                  className="form-control"
                  name="departmentId"
                  onChange={onChange}
                  value={professor.departmentId}
                >
                  <option>Select one department</option>
                  {departments.map((department, index) => (
                    <option key={index} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Form>
          </Modal>
        )}
      </ListView>
    </Page>
  );
};

export default Professor;
