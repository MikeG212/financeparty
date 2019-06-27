import React from 'react';
import ReactDOM from 'react-dom';
import './form.css';

class DynamicForm extends React.Component {
    state = {}

    constructor(props) {
        super(props);
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(this.state);
    }

    onChange = (e, key) => {
        this.setState({
            [key]: parseFloat(this[key].value)
        })
    }

    renderForm = () => {
        let model = this.props.model;
        let formUI = model.map(m => {
            let key = m.key;
            let type = m.type;
            let props = m.props || {};

            return (
                <div key={key} className="form-group">
                    <label className="form-label"
                        key={"l" + m.key}
                        htmlFor={m.key}>
                        {m.label}
                    </label>
                    <br></br>
                    <input {...props}
                        ref={(key) => { this[m.key] = key }}
                        className="form-input"
                        type={type}
                        key={"i" + m.key}
                        onChange={(e) => this.onChange(e, key)}
                    />


                </div>
            )
        });

        return formUI;
    }

    render() {
        let title = this.props.title || "Dynamic Form";
        return (
            <div className={this.props.className}>
                <h3 className="title"> CDC (Certificate of Depreciation Calculator)</h3>
                <p>For each CD you own, enter the initial deposit, the period, and the interest rate (%).</p>
                <form className="dynamic-form" onSubmit={(e) => { this.onSubmit(e) }}>
                    {this.renderForm()}
                    <div className="form-group">
                        <button type="submit">SUBMIT</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default DynamicForm;
