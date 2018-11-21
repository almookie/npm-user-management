// required imports
import React, { Component } from 'react';
import { Form, Card, Row, Col, Input, Button, Select, Radio, Checkbox, Icon } from 'antd';
import 'antd/dist/antd.css';
import logo from './logo.svg';
import './App.scss';

// antd constants
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;
const CheckboxButton = Checkbox.Button;

// Mobile Responsive Layouts
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
    },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const formTailLayout = {
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


// Dynamic field container allows multiple fields to be created that have the same name and layout
class DynamicFieldSet extends Component {
    constructor(props) {
        super(props);
    }

    add = () => {
        const { name, form } = this.props;
        const keys = form.getFieldValue(name);
        const newKeys = keys.concat(keys.length);
        form.setFieldsValue({
            [name]: newKeys
        }); 
    }

    remove = (k) => {
        const { name, form } = this.props;
        const keys = form.getFieldValue(name);
        
        if(keys.length === 1) return;
        
        form.setFieldsValue({
            [name]: [name].filter(key => key !== k)
        });
    }

    render() {
        const { name, form } = this.props;
        form.getFieldDecorator(name, { initialValue: [] });
        const keys = form.getFieldValue(name);
        const fields = keys.map((k, index) => {
            return (
                <FormItem key={k}>
                    {
                        form.getFieldDecorator(`names[${k}]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "Please input passenger's name or delete this field.",
                            }],
                        })
                        (
                            <TextArea placeholder="Reference Website" style={{ width: '60%', marginRight: 8 }} />
                        )
                    }
                    {
                        keys.length &&
                            <Icon className="dynamic-delete-button" type="minus-circle-o" disabled={keys.length === 1} onClick={() => this.remove(k)} />
                    }
                </FormItem>
            )
        });

        return (
            <>
                {fields}
                <FormItem {... formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus"/> Add Reference
                    </Button>
                </FormItem>
            </>
        );
    }
}

// Website Form structure
class WebsiteForm extends Component {     
    addCompetitorWebsite = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const newKeys = keys.concat(keys.length);
        form.setFieldsValue({
            keys: newKeys
        });
    }
    removeCompetitorWebsite = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');

        if (keys.length === 1) return;

        form.setFieldsValue({
            keys: keys.filter(key => key !== k)
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;

        // variables to reduce clutter in render return
        // Target Audience
        const targetAudience = ["The General Public", "Businesses", "Volunteering Students", "Accreditation Agencies ", "Partners", "Employees", "Photographers", "Design Students"];
        const targetAudienceOptions = targetAudience.map(key => <Option key={key}>{key}</Option>);

        // Activities and Objectives
        const activitiesAndObjectives = ["Subscribe to our newsletter", "Follow us on social media channels like Twitter and Facebook", "Get me leads – wants to drive phone calls", "Purchase our merchandise", "Contribute blog comments"]
        const activitiesAndObjectivesRadios = activitiesAndObjectives.map(key => <Radio key={key} value={key}>{key}</Radio>);

        // Major website objects
        const majorWebsiteObjectives = ["Create awareness about our organisation", "Build an online community", "Advertise uniqueness of organisation to our partners, volunteers & the media"];
        const majorWebsiteObjectivesRadios = majorWebsiteObjectives.map(key => <RadioButton key={key} value={key}>{key}</RadioButton>);

        // Navigation Structure
        const navigationStructure = ["Home", "About Us", "Projects", "Get Involved", "Blog", "Online Booking Form", "Contact"];
        const navigationStructureCheckboxes = navigationStructure.map(key => <Checkbox key={key} value={key}>{key}</Checkbox>);

        // Website Features
        const websiteFeatures = ["Easy to update by non-technical people", "Shopping cart or other ecommerce", "Feedback/contact forms", "Newsletters and signup", "Animation", "Calendar", "Members only section", "Faster downloads", "Business process streamlining", "Film/Audio", "High google (and other searches) ranking", "Optimisation for mobile phones", "Email marketing", "Photo and media galleries", "Statistics", "Surveys", "Film", "Blog"]
        const websiteFeaturesCheckboxes = websiteFeatures.map(key => <Checkbox key={key} value={key}>{key}</Checkbox>);

        // Competitor Websites
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const competitorWebsites = keys.map((k, index) => {
            return (
                <FormItem key={k}>
                    {
                        getFieldDecorator(`names[${k}]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "Please input passenger's name or delete this field.",
                            }],
                        })
                        (
                            <TextArea placeholder="Reference Website" style={{ width: '60%', marginRight: 8 }} />
                        )
                    }
                    {
                        keys.length &&
                            <Icon className="dynamic-delete-button" type="minus-circle-o" disabled={keys.length === 1} onClick={() => this.removeCompetitorWebsite(k)} />
                    }
                </FormItem>
            )
        });
    
        return (
            <div className="form-canvas">
                <Form>
                    <div className="section">
                        <div className="box">
                            <h3>Introduction / About the Organisation</h3>
                            <TextArea rows={2}></TextArea>
                        </div>
                    </div>
                    <div className="section">
                        <h2>Target Audience</h2>
                        <div className="box">
                            <div className="callout">Please describe the target market segments. <Button type="secondary">See Example</Button></div>
                            <FormItem {...formItemLayout} label="Target">
                                <Select mode="multiple" placeholder="Please select atleast one target audience" defaultValue={['The General Public']}>{targetAudienceOptions}</Select>
                            </FormItem>
                            <FormItem {...formItemLayout} label="Other">
                                <TextArea/>
                            </FormItem>
                            <FormItem {...formTailLayout}>
                                <Button type="primary">Next</Button>
                            </FormItem>
                        </div>
                    </div>
                    <div className="section">
                        <h2>Website Activities and Objectives</h2>
                        <div className="box">
                            <div className="callout">Please describe the major objectives for the site, as well as the activities you would like users to perform</div>
                            <RadioGroup>{activitiesAndObjectivesRadios}</RadioGroup>
                            <p>This ties in with our major website objectives:</p>
                            <RadioGroup>{majorWebsiteObjectivesRadios}</RadioGroup>
                        </div>
                    </div>
                    <div className="section">
                        <h2>Navigation Structure</h2>
                        <div className="box">
                            <div className="callout">The website will contain the following navigation structure. Alternate suggestions on page structure are welcome</div>
                            <CheckboxGroup>{navigationStructureCheckboxes}</CheckboxGroup>
                        </div>
                    </div>
                    <div className="section">
                        <h2>Website Features</h2>
                        <div className="box">
                            <div className="callout">Please outline the special features required for the site. Please include reference links where possible</div>
                            <CheckboxGroup>{websiteFeaturesCheckboxes}</CheckboxGroup>
                            <FormItem {...formItemLayout} label="Other">
                                <TextArea rows={2}></TextArea>
                            </FormItem>
                        </div>
                    </div>
                    <div className="section">
                        <h2>Competitor Websites</h2>
                        <div className="box">
                            <div className="callout">Please outline reference websites and what you like / dislike about their sites</div>
                            <Input addonBefore="https://" defaultValue="aiims.com.au"/> 
                            <DynamicFieldSet name="competitorWebsites" form={this.props.form}/>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}
const WrappedWebsiteForm = Form.create()(WebsiteForm);

// render the App
class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <WrappedWebsiteForm/>
                </header>
            </div>
        );
    }
}
export default App;