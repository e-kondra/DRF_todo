import React from "react";
import {Form, Row, Col, Button} from "react-bootstrap";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: 0,
            text: '',
            creator: 0,
            isActive: '',
        }
    }

    handleChange(event) {  // при изменении поля
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState(
            {
                [event.target.name]: value
            }
        )
    }

    handleSubmit(event) { //передает данные из формы в функцию, кот.отправляет запрос на backend // при нажатии на кнопку save
        console.log(this.state.project + ' ' + this.state.text + ' ' + this.state.creator + ' ' + this.state.isActive)
        this.props.createTodo(this.state.project, this.state.text, this.state.creator, this.state.isActive)
        event.preventDefault() // отключаем работу с формой
    }

    render() {
        return (
            <Form onSubmit={(event) => this.handleSubmit(event)}>
                <Row className="mb3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="login">Project</Form.Label>
                        <Form.Select className="form-control" name="project"
                                     onChange={(event) => this.handleChange(event)}>
                            {this.props.projects.map((item) =>
                                <option value={item.id}>
                                    {item.name}
                                </option>)}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor="login">Creator</Form.Label>
                        <Form.Select className="form-control" name="creator"
                                     onChange={(event) => this.handleChange(event)}>
                            {this.props.users.map((item) =>
                                <option value={item.id}>
                                    {item.username}
                                </option>)}
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row className="mb3">
                <Form.Group as={Col}>
                    <Form.Label htmlFor="text">Text</Form.Label>
                    <Form.Control as="textarea" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </Form.Group>
                <Form.Group as={Col}/>
                </Row>
                <Form.Group as={Col}>
                    <Form.Check type="checkbox" name="isActive" label="Is active"
                                onChange={(event) => this.handleChange(event)}/>
                </Form.Group>
                <Button as="input" type="submit" value="Save" variant="secondary"/>{' '}
            </Form>
        );
    }

    // checked={this.state.isActive}
}

export default TodoForm;