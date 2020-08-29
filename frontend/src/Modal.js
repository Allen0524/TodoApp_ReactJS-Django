import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Modal,
        ModalHeader,
        ModalBody, 
        ModalFooter, 
        Form, 
        FormGroup, 
        Label, 
        Input,
        Button} from 'reactstrap';

class CustomModal extends Component {

    state = {
        newItem: this.props.newItem,
        startDate: new Date(),
    }

    handleTextChange = (e) => {
        const newItem = {...this.state.newItem, [e.target.name]:e.target.value};
        this.setState({newItem: newItem});
    }

    handleDateChange = (date) => {
        const transDate = date.toLocaleString();
        const newItem = {...this.state.newItem, ['dueDate']: transDate}
        this.setState({newItem: newItem, startDate:date});
    }

    render() {
        const {toggle, onSave} = this.props;
        return (
            <div>
                <Modal isOpen={true} toggle={toggle}>
                    <ModalHeader toggle={toggle}>title</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="taskName">任務名稱</Label>
                                <Input type="text" name="taskName" id="taskName" onChange={this.handleTextChange}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="dueDate">到期日</Label>
                                <br/>
                                <DatePicker dateFormat="yyyy/MM/dd hh:mm:ss" name="dueDate" showTimeSelect onChange={this.handleDateChange}  selected={this.state.startDate}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => onSave(this.state.newItem)}>Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CustomModal;