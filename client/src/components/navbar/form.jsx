import React from "react";
class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
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

        <input label="amount" onChange={this.props.amountChange} required />

        <select onChange={this.props.transferIdChange}>
          <option value="" hidden>
            select an option
          </option>
          {this.props.data.map((account) => {
            return <option value={account._id}>{account.name}</option>;
          })}
        </select>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default Form;
