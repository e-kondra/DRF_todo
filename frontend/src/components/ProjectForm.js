import React from "react";
import {Form, Row, Col, Button} from "react-bootstrap";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            url: '',
            users: [],
        }
    }

    handleChange(event) {  // при изменении поля
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) { //selectedOptions - список выделенных элементов
            this.setState({
                'users': []
            })
            return;
        }
        let usersList = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            usersList.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'users': usersList
        })
    }

    handleSubmit(event) { //передает данные из формы в функцию, кот.отправляет запрос на backend // при нажатии на кнопку save
        // console.log(this.state.name + ' ' + this.state.url + ' ' + this.state.users)
        this.props.createProject(this.state.name, this.state.url, this.state.users)
        event.preventDefault() // отключаем работу с формой
    }

    render() {
        return (
            <Form onSubmit={(event) => this.handleSubmit(event)}>
                <Row className="mb3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control type="text" name="name" value={this.state.name}
                                      onChange={(event) => this.handleChange(event)}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="url">URL</Form.Label>
                        <Form.Control type="text" name="url" value={this.state.url}
                                      onChange={(event) => this.handleChange(event)}/>
                    </Form.Group>
                </Row>
                <Row className="mb3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="users"> Users</Form.Label>
                        {/*<select className="form-control" name="users" onChange={(event) => this.handleChange(event)}>*/}
                        {/*    {this.props.users.map((item) =>*/}
                        {/*        <option value={item.id}>*/}
                        {/*            {item.username}*/}
                        {/*        </option>)}*/}
                        {/*</select>*/}

                        {/*multiple - форма, в которой можно несколько значений за раз выбрать*/}

                        <Form.Select name="users" multiple onChange={(event) => this.handleUsersChange(event)}>
                            {this.props.users.map((item) =>
                                <option value={item.id}> {item.username} </option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}/>

                </Row>
                <Button as="input" type="submit" value="Save" variant="secondary"/>{' '}
            </Form>
        );
    }
}

export default ProjectForm;