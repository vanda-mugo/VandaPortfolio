import React from "react";

import "./slick.css";
import "./slick-theme.css";
import Slider from "react-slick";

import "./Skills.css";
import cpp from "../../assets/icons/LanguageIcons/cpp.svg";
import python from "../../assets/icons/LanguageIcons/python.svg";
import javascript from "../../assets/icons/LanguageIcons/javascript.svg";
import typescript from "../../assets/icons/LanguageIcons/typescript.svg";

import html from "../../assets/icons/FrontEndIcons/html-5.svg";
import css from "../../assets/icons/FrontEndIcons/css3.svg";
import redux from "../../assets/icons/FrontEndIcons/redux.svg";
import react from "../../assets/icons/FrontEndIcons/react.svg";

import node from "../../assets/icons/BackEndIcons/node.svg";
import express from "../../assets/icons/BackEndIcons/express-js.svg";
import graphql from "../../assets/icons/BackEndIcons/graphql.svg";
import firebase from "../../assets/icons/BackEndIcons/firebase.svg";

import mysql from "../../assets/icons/DatabaseIcons/mysql.svg";
import mongodb from "../../assets/icons/DatabaseIcons/mongodb.svg";
import postresql from "../../assets/icons/DatabaseIcons/postgresql.svg";
import sqlite from "../../assets/icons/DatabaseIcons/sqlite.svg";
import firestore from "../../assets/icons/DatabaseIcons/firestore.svg";
import typeorm from "../../assets/icons/DatabaseIcons/typeorm.svg";

import git from "../../assets/icons/ToolIcons/git.svg";
import vscode from "../../assets/icons/ToolIcons/vscode.svg";
import adobeIllustrator from "../../assets/icons/ToolIcons/adobeIllustrator.svg";

// New skill icons
import docker from "../../assets/img/docker-mark-blue.svg";
import nestjs from "../../assets/img/nest.svg";
import redis from "../../assets/img/redis.png";

//import  PixelCard  from '../PixelCard/PixelCard';

// Temporarily removed for debugging
// import { lazy, Suspense } from "react";
// const PixelCard = lazy(() => import('../PixelCard/PixelCard'));

interface Skill {
  category: string;
  items: { name: string; icon: string }[];
}
const skills: Skill[] = [
  {
    category: "Languages",
    items: [
      { name: "C++", icon: cpp },
      { name: "Python", icon: python },
      { name: "Javascript", icon: javascript },
      { name: "Typescript", icon: typescript },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "HTML", icon: html },
      { name: "CSS", icon: css },
      { name: "React", icon: react },
      { name: "Redux", icon: redux },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: node },
      { name: "Express", icon: express },
      { name: "NestJS", icon: nestjs },
      { name: "GraphQL", icon: graphql },
      { name: "Firebase", icon: firebase },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL", icon: mysql },
      { name: "MongoDB", icon: mongodb },
      { name: "PostgreSQL", icon: postresql },
      { name: "Redis", icon: redis },
      { name: "SQLite", icon: sqlite },
      { name: "Firestore", icon: firestore },
      { name: "TypeORM", icon: typeorm },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: git },
      { name: "VS Code", icon: vscode },
      { name: "Docker", icon: docker },
      { name: "Adobe Illustrator", icon: adobeIllustrator },
    ],
  },
];

const Skills: React.FC = () => {
  // Mobile-optimized slider settings based on UX research
  const settings = {
    centerMode: false, // Disable for better mobile experience
    dots: true,
    infinite: true,
    speed: 600, // Slightly slower for better mobile perception
    slidesToShow: 1,
    arrows: false, // Touch-first approach
    slidesToScroll: 1,
    swipe: true,
    touchMove: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 6000, // Longer duration for mobile reading
    fade: false,
    adaptiveHeight: true, // Better mobile layout
    pauseOnHover: true,
    pauseOnFocus: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          centerPadding: "10px",
          autoplaySpeed: 5000, // Faster on mobile
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
          autoplaySpeed: 4000, // Even faster on small screens
        },
      },
    ],
  };

  return (
    <section id="Skills" className="skills">
      <div className="container">
        <div className="skills-header">
          <h2 className="skills-title">Technical Skills</h2>
          <p className="skills-subtitle">Technologies I work with</p>
        </div>

        {/* Skills content with slider but without PixelCard */}
        <div className="skills-direct-content">
          <div className="skill-row">
            <Slider {...settings}>
              {skills.map((skill, index) => (
                <div key={index} className="skill-slide">
                  <div className="skill-category">
                    <div className="category-header">
                      <h3 className="category-title">{skill.category}</h3>
                    </div>

                    <div className="skills-grid">
                      {skill.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="skill-item">
                          <div className="skill-icon-container">
                            <img
                              src={item.icon}
                              alt={`${item.name} icon`}
                              className="skill-icon"
                              loading="lazy"
                            />
                            <div className="skill-glow"></div>
                          </div>
                          <span className="skill-name">{item.name}</span>
                          <div className="skill-level">
                            <div className="level-bar">
                              <div
                                className="level-fill"
                                style={{
                                  width: `${85 + Math.random() * 15}%`,
                                  animationDelay: `${itemIndex * 0.1}s`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            {/* Modern swipe navigation indicator */}
            <div className="slider-hints">
              <div className="swipe-indicator">
                <div className="swipe-gesture">
                  <div className="finger-trace">
                    <div className="finger-dot"></div>
                  </div>
                  <div className="swipe-arrows">
                    <svg
                      className="arrow-left"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="hint-text">Swipe to explore</span>
                    <svg
                      className="arrow-right"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <div className="progress-dots">
                  <div className="dot active"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

/**
 * <div>
                <button  className="experienceButton" onClick={toggleExperience}>
                    {showExperience ? <div><span className='one'>Hide</span><span className='two'>Experience</span></div> : <div><span className='one'>Show</span><span className='two'>Experience</span></div>}
                </button>
            </div>
 */
