import React from 'react';
import './App.css';

class Person {
    id;
    name;
    height;
    mass;
    hairColor;
    skinColor;
    eyeColor;
    birthYear;
    gender;

    constructor(result) {
        this.id = result.id;
        this.name = result.name;
        this.height = result.height;
        this.mass = result.mass;
        this.hairColor = result.hairColor;
        this.skinColor = result.skinColor;
        this.eyeColor = result.eyeColor;
        this.birthYear = result.birthYear;
        this.gender = result.gender;
    }
}

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.searchPhrase = {
            value: null
        }
        this.state = {
            searchPhrase: "",
            error: null,
            isLoaded: false,
            results: false,
            Person: null
        };
        this.apiurl = "http://vps633295.ovh.net/starwars/api/name?name=";

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({searchPhrase: event.target.value});
    }

    handleSubmit(event) {
        fetch(this.apiurl + this.state.searchPhrase, {
            method: "GET",
            headers: {
                'X-AUTH-TOKEN':'hbyqfqfrjmggtbhy2v83d342t'
            }
        }).then((res) => {
            if(res.ok){
                return res.json();
            }else{
                console.log(res);
                throw new Error(res.statusText);
            }
        }).then(
                (result) => {
                    if (!result) {
                        this.setState({
                            isLoaded: true,
                            results: false,
                            error: "Result not found"
                        });
                    } else {
                        this.setState({
                            isLoaded: true,
                            results: true,
                            Person: new Person(result),
                            error: null
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        results: false,
                        error: error.message
                    });
                }
            );

        event.preventDefault();

    }

    render() {
        return (
            <div className="row">
                <div className="col-6 mx-auto">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                        </label>
                        <input className="form-control" type="text" value={this.state.searchPhrase}
                               onChange={this.handleChange}/>
                        <input className="btn btn-primary" type="submit" value="Submit"/>
                        <div className="alert-danger">{this.state.error}</div>
                        <Results data={this.state}/>
                    </form>
                </div>
            </div>
        );

    }
}

function Results(state) {
    if (state.data.results) {
        let person = state.data.Person;
        return (<table className="table table-striped">
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>{person.name}</td>
                </tr>
                <tr>
                    <td>Height</td>
                    <td>{person.height}</td>
                </tr>
                <tr>
                    <td>Mass</td>
                    <td>{person.mass}</td>
                </tr>
                <tr>
                    <td>Hair color</td>
                    <td>{person.hairColor}</td>
                </tr>
                <tr>
                    <td>Skin color</td>
                    <td>{person.skinColor}</td>
                </tr>
                <tr>
                    <td>Eye color</td>
                    <td>{person.eyeColor}</td>
                </tr>
                <tr>
                    <td>Birth year</td>
                    <td>{person.birthYear}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>{person.gender}</td>
                </tr>
                </tbody>
            </table>
        );
    }
    return null;

}

export default SearchForm;
