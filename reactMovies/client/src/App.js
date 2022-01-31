import React, {Component} from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import DisplayAllMovies from "./components/DisplayAllMovies";
import AddMovie from "./components/AddMovie"
import EditMovie from "./components/EditMovie"
import DeleteMovie from "./components/DeleteMovie"
import ImportMovies from "./components/ImportMovies"
import DeleteAllMovie from "./components/DeleteAllMovie"


export default class App extends Component
{
    render()
    {
        return (
                <BrowserRouter>
                <nav>
                         <header id="header">
                           <Link className="green-button" to="/"> Home </Link>
                           <Link className="green-button" to="/ImportMovies">Load</Link>
                           <Link className="green-button" to="/DeleteAllMovie">Delete All</Link>
                         </header>
                </nav>
                  <Switch>

                    <Route exact path='/' component={DisplayAllMovies}/>
                    <Route exact path="/DisplayAllMovies" component={DisplayAllMovies}/>
                    <Route exact path="/ImportMovies" component={ImportMovies}/>
                    <Route exact path="/AddMovie" component={AddMovie} />
                    <Route exact path="/EditMovie/:id" component={EditMovie} />
                    <Route exact path="/DeleteMovie/:id" component={DeleteMovie} />
                    <Route exact path="/DeleteAllMovie" component={DeleteAllMovie} />
                    <Route path="*" component={() => <h3>Invalid URL. Webpage does not exist</h3>}/>
                  </Switch>
                  
                      <footer id="footer">
                             <div id="footerLink" href="https://www.dkit.ie/">All rights reserved DKIT 2021</div>
                                   
                       </footer>
                  
                </BrowserRouter>
               )
    }
}