import React, {Component} from "react"
import axios from "axios"
import {Redirect} from "react-router-dom"
import {SERVER_HOST} from "../config/global_constants"

export default class DeleteMovie extends Component
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
        axios.delete(`${SERVER_HOST}/movies/${this.props.match.params.id}`)
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