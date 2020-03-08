import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";

import Header from "components/Header/Header.js";
import Button from "components/CustomButtons/Button.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import SearchQuery from './searchquery/SearchQuery';
import IndexFile from './indexfile/IndexFile';
import "css/App.css";

const useStyles = makeStyles(styles);

export default function App() {
  const classes = useStyles();
  
  return (
    <div>
      <Header
          fixed
          brand="Cystic Fibrosis Collection"
          color="white"
          rightLinks={
            <List className={classes.list}>
              <ListItem className={classes.listItem}>
                <Button
                  href="/search"
                  className={classes.navLink + " " + classes.navLinkActive}
                  color="transparent">
                    Search a query
                </Button>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Button
                  href="/index"
                  className={classes.navLink}
                  color="transparent">
                    Index a file
                </Button>
              </ListItem>
            </List>
        }/>
        <div className="content-component">
          <Router>
            <Route exact path="/search" component={SearchQuery} />
            <Route exact path="/index" component={IndexFile} />
          </Router>
        </div>
    </div>
  );
}