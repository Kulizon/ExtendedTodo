import styled from "styled-components";
import { useRef } from "react";
import ProjectInterface from "../../../interfaces/ProjectInterface";

import Project from "../../Project/Project";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";


import { fntWghtBld, fntWghtNrml } from "../../../resources/variables";

const StyledProjectList = styled.ul`
  margin: 2rem 0;

  h2 {
    font-weight: ${fntWghtNrml};
  }

  ul li {
    margin: 1rem;
  }

  ul li:first-of-type {
    margin-left: 0;
  }
  ul li:last-of-type {
    margin-right: 0;
  }
`;

const ProjectList = (props: {
  projects: ProjectInterface[];
  onDelete: (id: string, type: "PROJECT" | "TODO") => void;
  onToggleState?: (id: string, projectID?: string) => void;
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
      <h2>Your Projects 📋</h2>
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
                onToggleState={props.onToggleState}
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
