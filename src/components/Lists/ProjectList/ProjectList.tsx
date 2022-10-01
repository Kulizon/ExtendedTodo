import styled from "styled-components";
import ProjectInterface from "../../../interfaces/ProjectInterface";

import Project from "../../Project/Project";

const StyledProjectList = styled.ul`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  ul {
    background: red;
  }
`;

const ProjectList = (props: {
  projects: ProjectInterface[];
  onDelete: (id: string, type: "PROJECT" | "TODO") => void;
}) => {
  return (
    <StyledProjectList>
      {props.projects.map((p) => (
        <Project project={p} key={p.id} onDelete={props.onDelete}></Project>
      ))}
    </StyledProjectList>
  );
};

export default ProjectList;
