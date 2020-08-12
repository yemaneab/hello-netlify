import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
} from "reactstrap";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  let projectData = [];

  useEffect(() => {
    axios.get("http://localhost:1337/projects").then((resp) => {
      setProjects(resp.data);
    });
  }, []);

  projects.forEach((project, i) => {
    let status = "";
    switch (project.status) {
      case "success":
        status = "fa fa-circle text-success";
        break;

      case "warning":
        status = "fa fa-circle text-warning";

        break;

      default:
        break;
    }

    projectData[i] = {
      user: project.users[0],
      name: project.name,
      status: status,
      weeks: project.weeks,
      budget: `$${project.budget}`,
      userImage: `https://randomuser.me/api/portraits/men/${getRandomInt(
        1,
        100
      )}.jpg`,
    };
  });

  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-4 [General]                                                  */
    /*--------------------------------------------------------------------------------*/

    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <div>
            <CardTitle>Projects of the Month</CardTitle>
            <CardSubtitle>Overview of Latest Month</CardSubtitle>
          </div>
          <div className="ml-auto d-flex no-block align-items-center">
            <div className="dl">
              <Input type="select" className="custom-select">
                <option value="0">Monthly</option>
                <option value="1">Daily</option>
                <option value="2">Weekly</option>
                <option value="3">Yearly</option>
              </Input>
            </div>
          </div>
        </div>
        <Table className="no-wrap v-middle" responsive>
          <thead>
            <tr className="border-0">
              <th className="border-0">Team Lead</th>
              <th className="border-0">Project</th>

              <th className="border-0">Status</th>
              <th className="border-0">Weeks</th>
              <th className="border-0">Budget</th>
            </tr>
          </thead>
          <tbody>
            {projectData.map((project, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex no-block align-items-center">
                    <div className="mr-2">
                      <img
                        src={project.userImage}
                        // src={"http://localhost:1337" + project.user?.image.url}
                        alt="user"
                        className="rounded-circle"
                        width="45"
                      />
                    </div>
                    <div className="">
                      <h5 className="mb-0 font-16 font-medium">
                        {project.user?.name}
                      </h5>
                      <span>{project.user?.email}</span>
                    </div>
                  </div>
                </td>
                <td>{project.name}</td>

                <td>
                  <i className={project.status} id="tlp1"></i>
                </td>
                <td>{project.weeks}</td>
                <td className="blue-grey-text  text-darken-4 font-medium">
                  {project.budget}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Projects;
