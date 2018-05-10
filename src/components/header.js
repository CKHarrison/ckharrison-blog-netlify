import React, { Component } from "react";
import ReactDOM from "react-dom";
import Link from "gatsby-link";
import styled from "styled-components";

import Img from "gatsby-image";
import logo from "../images/logo.svg";

const HeaderWrapper = styled.div`
  background: #524763;
  margin-bottom: 1.45rem;
  overflow: hidden;
  position: relative;
  // if we are home the inital state is 70
  height: ${({ isHome }) => (isHome ? "70vh" : "20vh")};
  h1 {
    img {
      height: 80px;
    }
  }
`;
const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  z-index: 2;
  position: relative;
`;

class Header extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    const { location } = this.props;
    // making sure going from home to home doesn't animate
    if (location.pathname !== prevProps.location.pathname) {
      // seeing if the pathname is equal to the homepage
      if (this.props.location.pathname === "/") {
        this.wrapper.animate(
          [
            // initial state
            { height: "20vh" },
            // ending state
            { height: "70vh" },
          ],
          {
            duration: 300,
            fill: "forwards",
            easing: "cubic-bezier(0.86, 0, 0.07, 1)",
            iterations: 1,
          },
        );
      } else {
        // animate the header closed if not homepage
        this.wrapper.animate(
          [
            // initial state
            { height: "70vh" },
            // ending state
            { height: "20vh" },
          ],
          {
            duration: 300,
            fill: "forwards",
            easing: "cubic-bezier(0.86, 0, 0.07, 1)",
            iterations: 1,
          },
        );
      }
    }
  };

  render() {
    const { data, location } = this.props;
    return (
      <HeaderWrapper
        isHome={location.pathname === "/"}
        ref={wrapper => (this.wrapper = ReactDOM.findDOMNode(wrapper))}
      >
        <HeaderContainer>
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              <img src={logo} alt="Level Up Logo" />
            </Link>
          </h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </HeaderContainer>

        <Img
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
          }}
          sizes={data.background.sizes}
        />
      </HeaderWrapper>
    );
  }
}

export default Header;