import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Button } from "reactstrap";
import { getListPromotions } from "../../actions";
import Header from "../../components/Header";

class Calculate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      code: "",
      listCode: [],
      total: 0,
      discountTotal: 0,
      titlePromo: ""
    };
  }

  componentDidMount() {
    this.props.getListPromotions();
  }

  calculateDiscount = () => {
    let listTotal = [],
      listDiscount = [];

    this.props.promotions.forEach(item => {
      let { isPresentCode, code, overCost, seat, discount } = item;
      let { total, count, listCode, discountTotal } = this.state;

      if (isPresentCode) {
        listCode.forEach(txtCode => {
          if (seat == count && code == txtCode) {
            if (total != 0) {
              discountTotal = total * discount;
              total = total - discountTotal;

              listTotal.push(total);
              listDiscount.push(discountTotal);
            }
          } else if (total > overCost && overCost != 0 && code == txtCode) {
            if (total != 0) {
              discountTotal = total * discount;
              total = total - discountTotal;

              listTotal.push(total);
              listDiscount.push(discountTotal);
            }
          } else {
            if (total != 0) {
              discountTotal = 0;
              listTotal.push(total);
              listDiscount.push(discountTotal);
            }
          }
        });
      } else {
        if (overCost == 0) {
          if (seat == count) {
            if (total != 0) {
              const discountTotal = total * discount;
              total = total - discountTotal;

              listTotal.push(total);
              listDiscount.push(discountTotal);
            }
          } else {
            if (total != 0) {
              const discountTotal = 0;

              listTotal.push(total);
              listDiscount.push(discountTotal);
            }
          }
        } else if (total > overCost) {
          if (total != 0) {
            discountTotal = total * discount;
            total = total - discountTotal;

            listTotal.push(total);
            listDiscount.push(discountTotal);
          }
        } else {
          if (total != 0) {
            discountTotal = 0;
            listTotal.push(total);
            listDiscount.push(discountTotal);
          }
        }
      }
    });

    if (listTotal.length === 0 && listDiscount.length === 0) {
      this.setState({
        total: this.state.total,
        discountTotal: 0
      });
    } else {
      const total = Math.min(...listTotal).toFixed(2);
      const discountTotal = Math.max(...listDiscount).toFixed(2);
      this.setState({ total, discountTotal });
    }
  };

  calculate = async () => {
    let { total, count } = this.state;
    if (this.state.count === "") {
      await this.setState({ total });
    } else {
      await this.setState({ total: count * 459 });
      await this.calculateDiscount();
    }
  };

  addCount = async () => {
    const num = parseInt(this.state.count);
    const count = num + 1;
    const discount = 0;
    if(count < 61){
      await this.setState({ count, discount });
      await this.calculate();
    }
  };

  removeCount = async () => {
    const num = parseInt(this.state.count);
    const count = num - 1;
    await this.setState({
      count: count < 0 ? 0 : count,
      discount: 0
    });
    await this.calculate();
  };

  onChangeCount = async e => {
    await this.setState({ count: e.target.value, discount: 0 });
    await this.calculate();
  };

  onClickRemove = async index => {
    const { listCode } = this.state;
    listCode.splice(index, 1);
    this.setState({ listCode });
    await this.calculate();
  };

  addCode = async () => {
    this.state.listCode.push(this.state.code);
    this.setState({ code: "" });
    await this.calculate();
  };

  render() {
    return (
      <div>
        <Header page={"Calculator"} />
        <div className="container">
          <div className="row mt-5">
            <div className="col-1" />
            <div className="col-5 box-sha p-4">
              <form>
                <div className="form-group">
                  <label>Seat(s)</label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => this.removeCount()}
                      >
                        {" "}
                        -{" "}
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.count}
                      onChange={e => this.onChangeCount(e)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => this.addCount()}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </div>
                  <label>Coupon Code</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="btn-add-code"
                      value={this.state.code}
                      onChange={e => this.setState({ code: e.target.value })}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="btn-add-code"
                        onClick={() => this.addCode()}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                  {this.state.listCode.map((item, index) => {
                    return (
                      <div key={index}>
                        <Badge color="warning" className="f-s-0-5">
                          {`code ${item}`}
                          <Button
                          className="f-s-0-9"
                            onClick={() => this.onClickRemove(index)}
                            close
                          />
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </form>
            </div>
            <div className="col-5 box-cal p-0 box-sha">
              <div className="box-total pt-2 pb-2">
                <p className="txt-btn f-s-1-5 pl-5 mb-0">Total</p>
              </div>
              <div className="pl-5 pt-4 pr-5 padding-b">
                <h1 className="txt-btn f-s-3">{`฿ ${this.state.total}`}</h1>
                <p className="txt-p f-s-0-8">
                  discount {this.state.discountTotal} Bath
                </p>
              </div>
            </div>
            <div className="col-1" />
          </div>
        </div>
      </div>
    );
  }
}

function bindActions(dispatch) {
  return {
    getListPromotions: () => dispatch(getListPromotions())
  };
}

const mapStateToProps = state => ({
  promotions: state.promotions
});

export default connect(
  mapStateToProps,
  bindActions
)(Calculate);
