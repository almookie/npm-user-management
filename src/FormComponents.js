// Dependencies
import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Icon } from 'antd';

// antd constants
const FormItem = Form.Item;

// Mobile Responsive Layouts
export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
    },
};
export const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 21, offset: 3 },
  },
};
export const formTailLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 21,
            offset: 3,
        },
    },
};

export class LoginFieldSet extends Component {
    render() {
        const { name, description, form } = this.props;
        const names = {
            url: name + '_url',
            username: name + '_username',
            password: name + '_password',
        }

        return(
            <>
                <FormItem>
                    {
                        form.getFieldDecorator(names.url, {
                            rules: [{
                                required: true,
                                message: `Please input your ${description} URL`
                            }]
                        }) (
                            <Input prefix={<Icon type="book"/>} name={names.url} placeholder={description + " URL"} required={true} key={names.url}/>
                        )
                    }
                </FormItem>                
                <Row span={24} gutter={8}>
                    <Col span={12}>
                        <FormItem>
                            {
                                form.getFieldDecorator(names.username, {
                                    rules: [{
                                        required: true,
                                        message: `Please input your ${description} Username`
                                    }]
                                }) (
                                    <Input prefix={<Icon type="user"/>} name={names.username} placeholder={description + " Username"} required={true} key={names.username}/>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem>
                            {
                                form.getFieldDecorator(names.password, {
                                    rules: [{
                                        required: true,
                                        message: `Please input your ${description} Password`
                                    }]
                                }) (
                                    <Input prefix={<Icon type="lock"/>} name={names.password} placeholder={description + " Password"} required={true} key={names.password}/>
                                )
                            }
                        </FormItem>
                    </Col>
                </Row>
            </>
        );
    }
}

// Dynamic field container allows multiple fields to be created that have the same name and layout
export class DynamicFieldSet extends Component {
    add = () => {
        const { component, form } = this.props;
        const name = component.props.name;

        const keys = form.getFieldValue(name);
        const newKeys = keys.concat(keys.length);
        form.setFieldsValue({
            [name]: newKeys
        }); 
    }

    remove = (k) => {
        const { component, form } = this.props;
        const name = component.props.name;

        const keys = form.getFieldValue(name);        
        if(keys.length === 1) return;
        
        form.setFieldsValue({
            [name]: keys.filter(key => key !== k)
        });
    }

    render() {
        const { component, form } = this.props;
        const name = component.props.name;
        const label = component.props.label ? component.props.label : '';
        const message = component.props.message ? component.props.message : ''; 

        form.getFieldDecorator(name, { initialValue: [0] });
        const keys = form.getFieldValue(name);
        const className = (keys.length === 1) ? '' : 'removable';

        const fields = keys.map((k, index) => {
            var formLayout, formItemLabel;

            if(index === 0) {
                formLayout = formItemLayout;
                formItemLabel = label;
            } else {
                formLayout = formItemLayoutWithOutLabel;
                formItemLabel = '';
            }

            return (
                <FormItem {... formLayout} key={k} label={formItemLabel} className={className}>
                    {
                        form.getFieldDecorator(`names[${k}]`, {
                            initialValue: 'lorem',
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: message,
                            }],
                        }) (component)
                    }
                    {
                        keys.length > 1 &&
                            <a className="remove-button" disabled={keys.length === 1} onClick={() => this.remove(k)}><Icon className="dynamic-delete-button" type="minus-circle-o"/></a>
                    }
                </FormItem>
            )
        });

        return (
            <>
                {fields}
                <FormItem {... formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add}>
                        <Icon type="plus"/> Add {label}
                    </Button>
                </FormItem>
            </>
        );
    }
}

export class Callout extends Component {
    render() {
        const { message, children, theme } = this.props;
        
        return (
            <div className={`callout ${theme}`}>{message} {children}</div>
        );
    }
}

export class Box extends Component {
    render() {
        const title = this.props.title;
        const children = this.props.children;
        
        return (
            <div className="box">
                {
                    title && 
                        <h3>{title}</h3>
                }
                {children}
            </div>
        );
    }
}

export class Section extends Component {
    render() {
        const title = this.props.title;
        const children = this.props.children;
        
        return (
            <div className="section">
                {
                    title && 
                        <h2>{title}</h2>
                }
                {children}
            </div>
        );
    }
}