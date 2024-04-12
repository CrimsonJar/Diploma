// // About.js

import React from "react";
import SectionWrapper from "./SectionWrapper";
import aboutContent from "./Info/aboutContent";

const About = () => {
  return (
    <SectionWrapper
      title={aboutContent.title}
      content={<p>{aboutContent.description}</p>}
      specialTitle={aboutContent.specialConditionsTitle}
      specialContent={
        <ol>
          {aboutContent.conditionsList.map((condition, index) => (
            <li key={index}>{condition}</li>
          ))}
        </ol>
      }
    >
      {aboutContent.finalNotes.map((note, index) => (
        <p key={index}>{note}</p>
      ))}
    </SectionWrapper>
  );
};

export default About;
