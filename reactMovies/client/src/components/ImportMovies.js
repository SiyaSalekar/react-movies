import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class ImportMovies extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            redirectToDisplayAllMovies:false
        }
    }


    componentDidMount()
    {
        let url = "https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json"

                axios.get(url)
                    .then( res => res.data.movies)
                    .then (results =>
                        {
                            console.log(results)
                            let data = JSON.parse(JSON.stringify(results))
                            console.log(data)

                            axios.post(`${SERVER_HOST}/movies`, data)
                                .then(res =>
                                {
                                    if(res.data)
                                    {
                                        console.log(res.data);
                                        if (res.data.errorMessage)
                                        {
                                            console.log(res.data.errorMessage)
                                        }
                                        else // success
                                        {
                                            console.log("Records Imported")
                                        }
                                        this.setState({redirectToDisplayAllMovies:true})
                                    }
                                    else
                                    {
                                        console.log("Records not Imported")
                                        alert("Data already Imported")
                                        this.setState({redirectToDisplayAllMovies:true})
                                    }
                                })
                        }
                    )
    }


    render()
    {
        return (
            <div>
                {this.state.redirectToDisplayAllMovies ? <Redirect to="/DisplayAllMovies"/> : null}
            </div>
        )
    }
}