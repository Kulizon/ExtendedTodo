import styled from "styled-components";
import { useRef } from "react";
import ProjectInterface from "../../../interfaces/ProjectInterface";

import Project from "../../Project/Project";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const StyledProjectList = styled.ul`
  font-size: 1em;
  margin: 1em;
  padding: 1rem;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const ProjectList = (props: {
  projects: ProjectInterface[];
  onDelete: (id: string, type: "PROJECT" | "TODO") => void;
}) => {
  const carouselRef = useRef<any>();

  const changeProgressBar = () => {
    if (!carouselRef.current) return;
    const bar = carouselRef.current.splide.root.querySelector(
      ".my-carousel-progress-bar"
    );
    const end = carouselRef.current.splide.Components.Controller.getEnd() + 1;
    const rate = Math.min((carouselRef.current.splide.index + 1) / end, 1);
    bar.style.width = String(100 * rate) + "%";
  };

  return (
    <StyledProjectList>
      <Splide
        hasTrack={false}
        options={{ rewind: true, perPage: 3, arrows: false }}
        ref={carouselRef}
        onMove={() => changeProgressBar()}
      >
        <SplideTrack>
          {props.projects.map((p) => (
            <SplideSlide key={p.id}>
              <Project
                project={p}
                onDelete={props.onDelete}
                onChangeProgressBar={changeProgressBar}
              ></Project>
            </SplideSlide>
          ))}
        </SplideTrack>
        <div className="my-carousel-progress">
          <div className="my-carousel-progress-bar"></div>
        </div>
      </Splide>
    </StyledProjectList>
  );
};

export default ProjectList;
