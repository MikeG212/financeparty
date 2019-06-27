import React from 'react';
import DynamicForm from './components/DynamicForm/index.js'
import './App.css';

class App extends React.Component {
  state = {
    totalDeposit: 0,
    alternative: false,
    data: [
    ],
  }

  onSubmit = (model) => {
    debugger
    if (isNaN(model.amount) || isNaN(model.interest) || isNaN(model.years)) {
      alert("Please fix your input");
    } else {
      let totalDeposit = this.state.totalDeposit + model.amount;
      model.id = +new Date();

      this.setState({
        data: [model, ...this.state.data],
        totalDeposit
      })
    }
  }

  futureValue(rate, nper, pmt, pv) {
    rate /= 100;
    let pow = Math.pow(1 + rate, nper);
    let fv;
    if (rate) {
      fv = -((pmt * (1 + rate) * (1 - pow) / rate) - pv * pow);
    }
    else {
      fv = -(pv + pmt * nper);
    }
    return Math.floor(fv);
  }

  sumFutureValue(time) {
    let sum = 0;
    this.state.data.forEach(el => {
      sum += this.futureValue(el.interest, time, 0, el.amount);
    })
    return sum;
  }

  toggle = () => {
    let alternative = !this.state.alternative;
    this.setState({
      alternative
    })
  }

  renderResults() {
    let totalFV1 = this.sumFutureValue(1);
    let totalFV2 = this.sumFutureValue(2);
    let totalFV3 = this.sumFutureValue(3);
    let totalDeposit = this.state.totalDeposit;
    let lcFV1 = this.futureValue(4, 1, 0, totalDeposit);
    let lcFV2 = this.futureValue(4, 2, 0, totalDeposit);
    let lcFV3 = this.futureValue(4, 3, 0, totalDeposit);
    let oppCost3 = lcFV3 - totalFV3;

    if (this.state.totalDeposit === 0) {
      return <div></div>
    }

    return (
      <p>
        You have ${JSON.stringify(this.state.totalDeposit)} in CD's.
          <p>At this rate, in 1 year you will have, ${totalFV1}</p>
        <p>In 2 years you will have, ${totalFV2}</p>
        <p>In 3 years you will have, ${totalFV3}</p>

        <p>Over the next 3 years, you're going to lose out on almost <strong>${oppCost3}!</strong></p>
        <button onClick={() => this.toggle()}>Tell me more!</button>

      </p>
    )
  }


  renderAlternatives = () => {
    let totalFV3 = this.sumFutureValue(3);
    let totalDeposit = this.state.totalDeposit;
    let lcFV1 = this.futureValue(4, 1, 0, totalDeposit);
    let lcFV2 = this.futureValue(4, 2, 0, totalDeposit);
    let lcFV3 = this.futureValue(4, 3, 0, totalDeposit);
    let oppCost3 = lcFV3 - totalFV3;
    if (this.state.alternative) {
      return (
        <div>
          <p>Based on current projections, if you repositioned your money into Lending Club's most conversative, secure investment account,</p>
          <p>In 1 year you will have, ${lcFV1}</p>
          <p>In 2 years you will have,${lcFV2}</p>
          <p>In 3 years you will have, ${lcFV3}</p>

          <a href="https://www.lendingclub.com/lenderg/createaccount"><button>Let's get started</button></a>
        </div>
      )

    }
    return (<div></div>);
  }

  handleClear = () => {
    this.setState({
      totalDeposit: 0,
      data: [],
      alternative: false
    })
  }

  render() {
    return (
      <div className="App" >
        <header>FinanceParty</header>
        <DynamicForm className="form"
          title="CD"
          model={[
            { key: "amount", label: "Initial Deposit", type: "number" },
            { key: "interest", label: "Interest", props: "decimal" },
            { key: "years", label: "Years", type: "number" },
          ]}

          onSubmit={(model) => { this.onSubmit(model) }}
        />
        {this.renderResults()}
        {this.renderAlternatives()}
        <button onClick={() => this.handleClear()}>CLEAR</button>
      </div>
    );
  }
}

export default App;
