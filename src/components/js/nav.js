import * as React from "react";
import styled from "styled-components";
// styles

const NavTag = styled.div`
  .design {
    .main-navigation-toggle {
      position: fixed;
      height: 1px;
      width: 1px;
      overflow: hidden;
      clip: rect(1px, 1px, 1px, 1px);
      white-space: nowrap;

      + label {
        position: fixed;
        top: calc(var(--space) * 1.5);
        right: calc(var(--space) * 2);
        cursor: pointer;
        z-index: 2;
      }
    }

    .icon--menu-toggle {
      --size: calc(1rem + 4vmin);
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--size);
      height: var(--size);
      stroke-width: 6;
    }

    .icon-group {
      transform: translateX(0);
      transition: transform var(--nav-duration) var(--ease);
    }

    .icon--menu {
      stroke: var(--bg-inv);
    }

    .icon--close {
      stroke: var(--light-tc);
      transform: translateX(-100%);
    }

    .main-navigation {
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      transform: translateX(-100%);
      transition: transform var(--nav-duration);
      z-index: 1;

      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--main-bg);
        transform-origin: 0 50%;
        z-index: -1;
      }

      ul {
        font-size: 12vmin;
        font-family: var(--font-main);
        width: 100%;
      }

      li {
        --border-size: 1vmin;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;

        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: var(--border-size);
          background-color: var(--light-tc);
          transform-origin: 0 50%;
          transform: translateX(-100%) skew(15deg);
        }
      }

      a {
        display: inline-block;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        color: var(--light-tc);
        line-height: 1;
        text-decoration: none;
        user-select: none;
        padding: var(--space) calc(var(--space) * 2)
          calc(var(--space) + var(--border-size) / 2);
        transform: translateY(100%);
      }
    }

    .main-navigation-toggle:checked {
      ~ label .icon--menu-toggle {
        .icon-group {
          transform: translateX(100%);
        }
      }

      ~ .main-content {
        transform: translateX(10%);
      }

      ~ .main-navigation {
        transition-duration: 0s;
        transform: translateX(0);

        &:after {
          animation: nav-bg var(--nav-duration) var(--ease) forwards;
        }

        li:after {
          animation: nav-line var(--duration) var(--ease) forwards;
        }

        a {
          animation: link-appear calc(var(--duration) * 1.5) var(--ease)
            forwards;
        }

        @for $i from 1 through 4 {
          li:nth-child(#{$i}) {
            &:after,
            a {
              animation-delay: calc((var(--duration) / 2) * #{$i} * 0.125);
            }
          }
        }
      }
    }

    @keyframes nav-bg {
      from {
        transform: translateX(-100%) skewX(-15deg);
      }
      to {
        transform: translateX(0);
      }
    }

    @keyframes nav-line {
      0% {
        transform: scaleX(0);
        transform-origin: 0 50%;
      }
      35% {
        transform: scaleX(1.001);
        transform-origin: 0 50%;
      }
      65% {
        transform: scaleX(1.001);
        transform-origin: 100% 50%;
      }
      100% {
        transform: scaleX(0);
        transform-origin: 100% 50%;
      }
    }

    @keyframes link-appear {
      0%,
      25% {
        transform: translateY(100%);
      }
      50%,
      100% {
        transform: translateY(0);
      }
    }
  }
`;

// markup
const Nav = () => {
  let closeRef = React.useRef(null);
  function navClose() {
    closeRef.current.checked = false;
  }

  return (
    <NavTag>
      <div className="design">
        <input
          id="page-nav-toggle"
          className="main-navigation-toggle"
          type="checkbox"
          ref={closeRef}
        />
        <label htmlFor="page-nav-toggle">
          <svg className="icon--menu-toggle" viewBox="0 0 60 30">
            <g className="icon-group">
              <g className="icon--menu">
                <path d="M 6 0 L 54 0" />
                <path d="M 6 15 L 54 15" />
                <path d="M 6 30 L 54 30" />
              </g>
              <g className="icon--close">
                <path d="M 15 0 L 45 30" />
                <path d="M 15 30 L 45 0" />
              </g>
            </g>
          </svg>
        </label>

        <nav className="main-navigation">
          <ul>
            <li>
              <a href="#" onClick={navClose}>
                Home
              </a>
            </li>
            <li>
              <a href="#about-me" onClick={navClose}>
                About Me
              </a>
            </li>
            <li>
              <a href="#projects" onClick={navClose}>
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" onClick={navClose}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </NavTag>
  );
};

export default Nav;
