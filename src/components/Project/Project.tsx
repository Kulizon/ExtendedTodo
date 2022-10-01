import styled from "styled-components";
import ProjectInterface from "../../interfaces/ProjectInterface";

const StyledProject = styled.div`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Project = (props: {
  project: ProjectInterface;
  onDelete: (id: string, type: "PROJECT" | "TODO") => void;
}) => {
  const deleteHandler = () => {
    props.onDelete(props.project.id, "PROJECT");
  };

  return (
    <StyledProject>
      <h3>{props.project.title}</h3>
      <p>{props.project.description}</p>
     <button onClick={deleteHandler}>Delete</button>
    </StyledProject>
  );
};

export default Project;
