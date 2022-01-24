import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"


export default class DeleteAllMovie extends Component
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
        axios.delete(`${SERVER_HOST}/movies`)
        .then(res =>
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)
                }
                else // success
                {
                    console.log("Record deleted")
                }
                this.setState({redirectToDisplayAllMovies:true})
            }
            else
            {
                console.log("Record not deleted")
            }
        })
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