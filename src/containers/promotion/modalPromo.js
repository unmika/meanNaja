import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

class ModalPromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid: false,
      id: null,
      title: "",
      isPresentCode: false,
      code: "",
      discount: 0,
      overCost: 0,
      seat: 0,
      discountShow: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.promotion.id === this.props.promotion.id){
      const { id, title, isPresentCode, code, discount, overCost, seat } = this.props.promotion
      this.setState({ id, title, isPresentCode, code, discount, overCost, seat, discountShow: discount*100});
    }
}
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  onChangeCode = e => {
    this.setState({ code: e.target.value });
  };

  onChangeCheckbox = e => {
    this.setState({ isPresentCode: e.target.checked});
  }

  onChangeCost = e => {
    this.setState({ overCost: e.target.value });
  };

  onChangeDiscount = async(e) => {
    await this.setState({ 
      discountShow: e.target.value,
      discount: e.target.value / 100
    });
  }

  addSeat = async () => {
    const seat = this.state.seat + 1;
    this.setState({ seat });
    console.log(this.state.seat)
  };

  onChangeSeat = e => {
    this.setState({ seat: e.target.value });
    console.log(this.state.seat)
  };

  removeSeat = async () => {
    const seat = this.state.seat - 1;
    this.setState({
      seat: seat < 0 ? 0 : seat
    });
    console.log(this.state.seat)
  };

  onClickSave = () => {
    let { title, isPresentCode, code, discount, overCost, seat, id } = this.state;
    if(title === ""){
      this.setState({invalid:true})
    } else {
      const data = {
        "title": title,
        "isPresentCode": isPresentCode,
        "code": code,
        "discount": discount,
        "overCost": overCost,
        "seat": seat
      }
      this.props.onClickSave(data,id);
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpenModal} toggle={()=>this.props.toggleModal()}>
          <ModalHeader toggle={()=>this.props.toggleModal()}>Create Promotion</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="examplePassword">Code</Label>
                    <Input
                      name="code"
                      type="text"
                      value={this.state.code}
                      onChange={e => this.handleInputChange(e)}
                    />
              <FormGroup className="mt-2" check>
                      <Label check>
                        <Input
                          name="isPresentCode"
                          type="checkbox"
                          checked={this.state.isPresentCode}
                          onChange={(e)=>this.handleInputChange(e)}
                        />{" "}
                        ต้องแสดง Code ต่อพนักงานเท่านั้น
                      </Label>
                </FormGroup>
                </FormGroup>
              <FormGroup>
                <Label for="examplePassword">รายละเอียด</Label>
                <Input
                  name="title"
                  invalid={this.state.invalid}
                  type="text"
                  value={this.state.title}
                  onChange={e => this.handleInputChange(e)}
                />
                <FormFeedback>กรุณากรอกรายละเอียดของโปรโมชั่น</FormFeedback>
              </FormGroup>
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label for="examplePassword">สำหรับกี่ที่นั่ง</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button
                          color="secondary"
                          onClick={() => this.removeSeat()}
                        >
                          {" "}
                          - {" "}
                        </Button>
                      </InputGroupAddon>
                      <Input
                        className="pr-2 pl-2"
                        // type="text"
                        placeholder="0"
                        value={this.state.seat}
                        onChange={e => this.onChangeSeat(e)}
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          color="secondary"
                          onClick={() => this.addSeat()}
                        >
                          {" "}
                          + {" "}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="examplePassword">ส่วนลด</Label>
                    <InputGroup>
                      <Input
                        type="text"
                        placeholder="0"
                        value={this.state.discountShow}
                        onChange={e => this.onChangeDiscount(e)}
                      />
                      <InputGroupAddon addonType="append">%</InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="examplePassword">ยอดรวมของใบเสร็จ</Label>
                    <Input
                      type="text"
                      placeholder="0"
                      value={this.state.cost}
                      onChange={e => this.onChangeCost(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.onClickSave}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalPromo
