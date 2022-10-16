import React from "react";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const AnimationApp = () => {
  let location = useLocation();

  let { url } = useRouteMatch();
  const styles = {};

  styles.fill = {
    position: "absolute",
    minHeight: "calc(100vh - 165px)",
    inset: 0,
  };

  styles.content = {
    ...styles.fill,
    top: "40px",
    textAlign: "center",
  };

  styles.nav = {
    padding: 0,
    margin: 0,
    position: "absolute",
    top: 0,
    height: "40px",
    width: "100%",
    display: "flex",
  };

  styles.navItem = {
    textAlign: "center",
    flex: 1,
    listStyleType: "none",
    padding: "10px",
  };

  styles.hsl = {
    ...styles.fill,
    color: "white",
    paddingTop: "20px",
    fontSize: "30px",
  };

  styles.rgb = {
    ...styles.fill,
    color: "white",
    paddingTop: "20px",
    fontSize: "30px",
  };

  const NavLink = (props) => {
    return (
      <li style={styles.navItem}>
        <Link {...props} style={{ color: "inherit" }}></Link>
      </li>
    );
  };

  const HSL = () => {
    let { h, s, l } = useParams();

    return (
      <div
        style={{
          ...styles.fill,
          ...styles.hsl,

          background: `hsl(${h}, ${s}%, ${l}%)`,
        }}
      >
        hsl({h}, {s}%, {l}%)
      </div>
    );
  };

  const RGB = () => {
    let { r, g, b } = useParams();

    return (
      <div
        style={{
          ...styles.fill,
          ...styles.rgb,

          background: `rgb(${r}, ${g}, ${b})`,
        }}
      >
        rgb({r}, {g}, {b})
      </div>
    );
  };

  return (
    <div style={styles.fill}>
      <ul style={styles.nav}>
        <NavLink to={`${url}/hsl/10/90/50`}>Red</NavLink>
        <NavLink to={`${url}/hsl/120/100/40`}>Green</NavLink>
        <NavLink to={`${url}/rgb/33/150/243`}>Blue</NavLink>
        <NavLink to={`${url}/rgb/240/98/146`}>Pink</NavLink>
      </ul>

      <div style={styles.content}>
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="fade"
            timeout={1000}
          >
            <Switch location={location}>
              <Route path={`${url}/hsl/:h/:s/:l`} children={<HSL />} />
              <Route path={`${url}/rgb/:r/:g/:b`} children={<RGB />} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default AnimationApp;
