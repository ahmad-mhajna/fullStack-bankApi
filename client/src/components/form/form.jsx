import React from "react";
import Button from "../Button/Button";
import "./form.css";
class Form extends React.Component {
  render() {
    return (
      <form className="form" onSubmit={this.props.handleSubmit}>
        <div>
          <select onChange={this.props.selectType} required>
            <option value="" hidden>
              select an option
            </option>
            <option value="deposit">Deposit</option>
            <option value="credit">Credit</option>
            <option value="withdraw">Withdraw</option>
            <option value="transfer">Transfer</option>
          </select>
          <div>Name : {this.props.selectedUser.name}</div>
          <div>money : {this.props.selectedUser.money}</div>
          <div>credit : {this.props.selectedUser.credit}</div>
        </div>
        <div>
          {this.props.type === "transfer" && (
            <select
              onChange={this.props.transferIdChange}
              value={
                this.props.targetUser.name ? this.props.targetUser._id : ""
              }
            >
              <option value="" hidden>
                select an option
              </option>
              {this.props.data
                .filter((user) => user._id !== this.props.selectedUser._id)
                .map((account) => {
                  return <option value={account._id}>{account.name}</option>;
                })}
            </select>
          )}
          {this.props.targetUser.name && (
            <div className="To">
              TO
              <p>name : {this.props.targetUser.name}</p>
              <p>money : {this.props.targetUser.money}</p>
              <p>credit : {this.props.targetUser.credit}</p>
            </div>
          )}
        </div>
        <div>
          Amount : <input onChange={this.props.amountChange} required />
        </div>
        <Button text="submit" />
      </form>
    );
  }
}
export default Form;
