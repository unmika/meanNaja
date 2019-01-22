import React, { Component } from "react";
import { Row, Button } from "reactstrap";
import ModalPromo from "./modalPromo";
import { connect } from "react-redux";
import iconEdit from "../../images/edit.svg";
import iconDelete from "../../images/delete.svg";
import Header from '../../components/Header'
import {
  getListPromotions,
  addPromotion,
  updatePromotion,
  deletePromotion
} from "../../actions";

class Promotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      promo: {
        id: null,
        title: "",
        isPresentCode: false,
        code: "",
        discount: 0,
        overCost: 0,
        seat: 0
      }
    };
  } 
  
  componentDidMount(){
    this.props.getListPromotions();
  }

  toggleModal = () => {
    this.setState({ isOpenModal: !this.state.isOpenModal });
  };

  onClickEdit = async(promo) => {
    await this.setState({ promo });
    this.toggleModal();

  }

  onClickRemove = (id) => {
    console.log('Remove',id);
    this.props.deletePromotion(id);
  }

  onClickSave = (data,id) => {
    if(id){
      console.log('update',data,'id',id);
      this.props.updatePromotion(id,data);
    } else {
      console.log('add',data,'id',id);
      this.props.addPromotion(data);
    }
  }

  onClickCreate = async() => {
    await this.setState({ promo: {
        id: null,
        title: "",
        isPresentCode: false,
        code: "",
        discount: 0,
        overCost: 0,
        seat: 0
    } });
    this.toggleModal();
  }

  render() {
    const { promotions } = this.props;
    console.log(promotions)
    return (
      <div>
        <Header page={"Promotion"}/>
      <div className="container">
      <div className="d-flex justify-content-center m-5">
          <Button
            color="success"
            className="float-right"
            onClick={() => this.onClickCreate()}
          >
            Create new Promotion
          </Button>
      </div>
      <Row className="justify-content-center">
       {
         promotions.lenght !== 0 ? promotions.map((item)=>{
         const { id, title, code } = item;
         return(
          <div key={id} className="card border-warning m-3" style={{ "maxWidth": "18rem" }}>
            <div className="card-header d-flex justify-content-between">
              <h5 className="card-title text-warning">{code ? code : 'No Code'}</h5>
              <div>
                <button className="btn btn-warning"
                  onClick={()=>this.onClickEdit(item)}>
                  <img src={iconEdit} style={{ height:18,width:18}}alt="Edit"/>
                </button>
                <button className="btn btn-dark" 
                  onClick={()=>this.onClickRemove(id)}>
                  <img src={iconDelete} style={{ height:18,width:18}} alt="Delete"/>
                </button>
              </div>
            </div>
            <div className="card-body text-warning">
              {/* <h5 className="card-title">{code ? code : 'No Code'}</h5> */}
              <p className="card-text">{title}</p>
            </div>
          </div>
         );
       }) : 
       <div>
       </div>
      }
      </Row>
      <ModalPromo
        promotion={this.state.promo}
        isOpenModal={this.state.isOpenModal}
        toggleModal={()=>this.toggleModal()}
        onClickSave={this.onClickSave}
        />
      </div>
      </div>
    );
  }
}

function bindActions(dispatch) {
  return {
    getListPromotions: () => dispatch(getListPromotions()),
    addPromotion: (promotion) => dispatch(addPromotion(promotion)),
    updatePromotion: (id,promotion) => dispatch(updatePromotion(id,promotion)),
    deletePromotion: (id) => dispatch(deletePromotion(id))
  };
}
const mapStateToProps = state => ({
  promotions: state.promotions
});

export default connect(mapStateToProps, bindActions)(Promotion);
