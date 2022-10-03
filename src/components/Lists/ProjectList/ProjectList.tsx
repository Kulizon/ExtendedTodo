import styled from "styled-components";
import { useRef } from "react";
import ProjectInterface from "../../../interfaces/ProjectInterface";
import TodoInterface from "../../../interfaces/TodoInterface";

import Project from "../../Project/Project";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { drk4, fntWghtNrml } from "../../../resources/variables";

const StyledProjectList = styled.ul`
  margin: 2rem 0;

  > h3 {
    margin-top: 1rem;
    color: ${drk4};
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    font-weight: ${fntWghtNrml};

    span {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
  }

  > h2 {
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
  onStartEdit?: (oldTodo: TodoInterface) => void;
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
      {props.projects.length === 0 ? (
        <h3>
          <span>❗️</span> You have no projects... try adding one!
        </h3>
      ) : (
        <Splide
          hasTrack={false}
          options={{ rewind: true, perPage: 3, arrows: false,   breakpoints: {
            800: {
              perPage: 2,
            }, 600: {
              perPage: 1,
            },
          } }}
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
                  onStartEdit={props.onStartEdit}
                ></Project>
              </SplideSlide>
            ))}
          </SplideTrack>
          <div className="my-carousel-progress">
            <div className="my-carousel-progress-bar"></div>
          </div>
        </Splide>
      )}
    </StyledProjectList>
  );
};

export default ProjectList;
