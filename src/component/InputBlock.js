import React from 'react';
import {Button, Form, Input} from 'antd';
import {connect} from "react-redux";
import {isEmpty} from "lodash";
import {sendDataActionCreator} from "../store/dataActionCreator";
import hotkeys from "hotkeys-js";

hotkeys('ctrl+a', function (event, handler){
    alert("BUG!");
});

const status = {
    success: {status: "success", description: 'Successfully send'},
    loading: {status: 'validating', description: 'Wait a moment'},
    error: {status: 'error', description: 'Only digits allowed'},
    empty: {status: '', description: ''},
};

class HorizontalLoginForm extends React.Component {
    state = {
        inputValue: "",
        inputStatus: '',
    };

    componentWillReceiveProps(nextProps) {
        const {dataResponse} = nextProps;
        const {pending, data, error} = dataResponse;
        const successResponse = !pending && !error && data && data.message && !isEmpty(data.message);

        console.log(`current statuses: error:${error} pending:${pending} success:${successResponse}`);
        console.log("Плохой программист вывел сюда клиентские данные! Вы нашли баг в консоли!");

        if (error && !pending) {
            this.setState({inputStatus: status.error});
            alert("Ура, Вы нашли BUG!");
            return;
        }

        if (pending) {
            this.setState({inputStatus: status.loading});
            return;
        }

        if (successResponse) {
            this.setState({inputStatus: status.success});
        }
    }

    onChange = e => {
        const newStr = e.target.value;
        const oldStr = this.state.inputValue;
        const change = newStr.replace(oldStr, '');
        const isSingleLetter = change.length === 1;

        console.log("changred");

        if (!isSingleLetter) {
            this.setState({inputStatus: status.empty, inputValue: newStr});
            return;
        }
        const isNumeric = !isNaN(change);
        if (isNumeric) {
            this.setState({inputStatus: status.empty, inputValue: newStr});
            return;
        }
        this.setState({inputStatus: status.error, inputValue: oldStr});

    };

    onEnter = e => {
        this.props.sendData(this.state.inputValue);
    };

    onButtonClick = e => {
        this.props.sendData(this.state.inputValue);
    };

    render() {
        const {state, onChange, onEnter, onButtonClick} = this;
        const {inputValue, inputStatus} = state;

        const buttonIsLoading = inputStatus.status === 'validating';
        const buttonIsDisabled = isEmpty(inputValue) || buttonIsLoading;


        return (
            <Form layout="inline">
                <Form.Item validateStatus={inputStatus.status} help={inputStatus.description}>
                    <Input placeholder="input with clear icon"
                           allowClear
                           onChange={onChange}
                           onPressEnter={onEnter}
                           maxLength={15}
                           value={inputValue}
                           addonBefore={"Digits"}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" shape="round" icon="download"
                            onClick={onButtonClick}
                            loading={buttonIsLoading}
                            disabled={buttonIsDisabled}
                    >
                        Send
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedHorizontalLoginForm = Form.create({name: 'horizontal_login'})(HorizontalLoginForm);

const mapDispatchToProps = (dispatch) => ({
    sendData: (numberString) => dispatch(sendDataActionCreator(numberString))
});

const mapStateToProps = (state) => ({
    dataResponse: state.data
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedHorizontalLoginForm);
