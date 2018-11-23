// Dependencies
import React, { Component } from 'react';
import { Form, Upload, Input, Button, Select, Radio, Checkbox, Icon } from 'antd';
import { Section, Box, Callout, DynamicFieldSet, LoginFieldSet, formItemLayout, formItemLayoutWithOutLabel, formTailLayout } from './FormComponents';

// Styles
import 'antd/dist/antd.css';
import './App.scss';

// antd constants
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;
const Dragger = Upload.Dragger;

// Website Form structure
class WebsiteForm extends Component {   
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log('Received values of form: ', values);
            }
        })
    }
      
    render() {
        const { inputPrefix } = "website__";
        const { getFieldDecorator, getFieldValue } = this.props.form;

        // variables to reduce clutter in render return
        // Target Audience
        const targetAudience = ["The General Public", "Businesses", "Volunteering Students", "Accreditation Agencies ", "Partners", "Employees", "Photographers", "Design Students"];
        const targetAudienceOptions = targetAudience.map(key => <Option key={key}>{key}</Option>);

        // Activities and Objectives
        const activitiesAndObjectives = ["Get me leads – wants to drive phone calls", "Subscribe to our newsletter", "Follow us on social media channels like Twitter and Facebook", "Purchase our merchandise", "Contribute blog comments"]
        const activitiesAndObjectivesRadios = activitiesAndObjectives.map(key => <Radio name={inputPrefix + 'activities_objectives'} key={key} value={key}>{key}</Radio>);

        // Major website objects
        const majorWebsiteObjectives = ["Create awareness about our organisation", "Build an online community", "Advertise uniqueness of organisation to our partners, volunteers & the media"];
        const majorWebsiteObjectivesRadios = majorWebsiteObjectives.map(key => <RadioButton name={inputPrefix + 'major_website_objectives'} key={key} value={key}>{key}</RadioButton>);

        // Navigation Structure
        const navigationStructure = ["Home", "About Us", "Projects", "Get Involved", "Blog", "Online Booking Form", "Contact"];
        const navigationStructureCheckboxes = navigationStructure.map(key => <Checkbox name='website__navigation_structure' key={key} value={key}>{key}</Checkbox>);

        // Website Features
        const websiteFeatures = ["Feedback/contact forms", "Easy to update by non-technical people", "Shopping cart or other ecommerce", "Newsletters and signup", "Animation", "Calendar", "Members only section", "Faster downloads", "Business process streamlining", "Film/Audio", "High google (and other searches) ranking", "Optimisation for mobile phones", "Email marketing", "Photo and media galleries", "Statistics", "Surveys", "Film", "Blog"]
        const websiteFeaturesCheckboxes = websiteFeatures.map(key => <Checkbox name='website__website_features' key={key} value={key}>{key}</Checkbox>);

        // Competitor Websites
        const competitorWebsitesComponent = <TextArea name="competitorWebsites" label="Reference(s)" message="Please add another reference website, or remove extra fields" rows={2}/>
        
        // Referenmce Websites
        const referenceWebsitesComponent = <TextArea name="referenceWebsites" label="Other Reference(s)" message="Please add another reference website, or remove extra fields" rows={2}/>

        // CTAs
        const ctaComponent = <Input name="cta" label="Point" message="Please add a CTA or remove extra fields"/>

        // Colour Picker defaults
        const defaultColours = {
            black: '#060505',
            blue: '#177dff',
            purple: '#716aca',
            lightblue: '#36a3f7',
            green: '#35cd3a',
            red: '#f3545d',
            orange: '#ffa534'
        };
        const colourPickerDefaults = Object.entries(defaultColours).map(([key, value]) => <div data-color={value} key={key} className={`colour-choice ${key}`}/>);

        // Logo and Company Material
        

        return (
            <div className="form-canvas">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Section>
                        <Box title="Introduction / About the Organisation">
                            <FormItem>
                                {
                                    getFieldDecorator(
                                        'website__introduction',
                                        {
                                            validateTrigger: ['onBlur'],
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please submit details about your organisation',
                                                },
                                                {
                                                    min: 100,
                                                    message: 'Please provide more detail, minimum 100 characters'
                                                }
                                            ],
                                            initialValue: 'lorem'.repeat(200)
                                        }
                                    ) (
                                        <TextArea name='website__introduction' autosize={{ minRows: 2, maxRows: 20 }} required={true}/>
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                <Button type="primary">Next</Button>
                            </FormItem>
                        </Box>
                    </Section>
                    <Section title="Target Audience">
                        <Box>
                            <Callout message={"Please describe the target market segments"}>
                                <Button type="secondary">See Example</Button>
                            </Callout>
                            <FormItem {...formItemLayout} label="Target">
                                {
                                    getFieldDecorator(
                                        'website__target_audience',
                                        {
                                            validateTrigger: ['onBlur'],
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please choose atleast one target audience'
                                                }
                                            ],
                                            initialValue: 'lorem'.repeat(200)
                                        }
                                    ) (
                                        <Select mode="multiple" name={'website__target_audience'}>{targetAudienceOptions}</Select>
                                    )
                                }
                            </FormItem>
                            <FormItem {...formItemLayout} label="Other">
                                {
                                    getFieldDecorator(
                                        inputPrefix + 'target_audience_other', 
                                        {
                                            initialValue: 'lorem'.repeat(200)
                                        }
                                    ) (
                                        <TextArea name={inputPrefix + 'target_audience_other'} autosize={{ minRows: 2, maxRows: 20 }}/>
                                    )
                                }
                            </FormItem>
                            <FormItem {...formTailLayout}>
                                <Button type="primary">Next</Button>
                            </FormItem>
                        </Box>
                    </Section>
                    <Section title="Website Activites and Objectives">
                        <Box>
                            <Callout message="Please describe the major objectives for the site, as well as the activities you would like users to perform"/>
                            {
                                getFieldDecorator(
                                    inputPrefix + 'activities_objectives',
                                    {
                                        initialValue: activitiesAndObjectives[0]
                                    }
                                ) (
                                    <RadioGroup className="split-columns">{activitiesAndObjectivesRadios}</RadioGroup>
                                )
                            }
                            <p><strong>This ties in with our major website objectives:</strong></p>
                            {
                                getFieldDecorator(
                                    inputPrefix + 'major_website_objectives',
                                    {
                                        initialValue: majorWebsiteObjectives[0]
                                    }
                                ) (
                                    <RadioGroup>{majorWebsiteObjectivesRadios}</RadioGroup>
                                )
                            }
                        </Box>
                    </Section>
                    <Section title="Navigation Structure">
                        <Box>
                            <Callout message="The website will contain the following navigation structure. Alternate suggestions on page structure are welcome"/>
                            {
                                getFieldDecorator(
                                    'website__navigation_structure',
                                    {
                                        initialValue: navigationStructure[0]
                                    }
                                ) (
                                    <CheckboxGroup>{navigationStructureCheckboxes}</CheckboxGroup>
                                )
                            }
                        </Box>
                    </Section>
                    <Section title="Website Features">
                        <Box>
                            <Callout message="Please outline the special features required for the site. Please include reference links where possible"/>
                            <FormItem>
                                {
                                    getFieldDecorator(
                                        'website__website_features',
                                        {
                                            initialValue: websiteFeatures[0]
                                        }
                                    ) (
                                        <CheckboxGroup className="three-columns">{websiteFeaturesCheckboxes}</CheckboxGroup>
                                    )
                                }
                            </FormItem>
                            <FormItem {...formItemLayout} label="Other">
                                <TextArea autosize={{ minRows: 2, maxRows: 20 }}/>
                            </FormItem>      
                        </Box>
                    </Section>
                    <Section title="Competitor Websites">
                        <Box>
                            <Callout message="Please outline reference websites and what you like / dislike about their sites"/>
                            <FormItem>
                                {
                                    getFieldDecorator(
                                        'website__competitor_websites',
                                        {
                                            initialValue: 'lorem',
                                            validateTrigger: ['onBlur'],
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "Please provide atleast one reference"
                                                }
                                            ]
                                        }
                                    ) (
                                        <Input addonBefore="https://" name="website__competitor_websites" placeholder="aiims.com.au" required={true}/> 
                                    )
                                }
                            </FormItem>                                
                            <DynamicFieldSet component={competitorWebsitesComponent} form={this.props.form}/>
                        </Box>
                    </Section>
                    <Section title="Design">
                        <Box>
                            <Callout message="Please outline reference on sites that have impressed you which will provide us with a visual reference"/>
                            <FormItem {... formItemLayout} label="Style">
                                <Input/>
                            </FormItem>
                            <DynamicFieldSet component={referenceWebsitesComponent} form={this.props.form}/>
                        </Box>
                    </Section>
                    <Section title="Colour &amp; Style">
                        <Box>
                            <p>Do you have any imagery or colours in mind for your website?</p>
                            {colourPickerDefaults}
                            <span>OR</span>
                            <Upload>
                                <Button><Icon type="upload"/> Click to Upload Files</Button>
                            </Upload>
                            <p>Do you have a style guide or other corporate requirements?</p>
                            <TextArea autosize={{ minRows: 2, maxRows: 20 }}/>
                        </Box>
                    </Section>
                    <Section title="Content">
                        <Box>
                            <Callout message="What types of content will be on your website - eg text, photos, audio, &amp; their current format - eg digitised, hard copy?"/>  
                            <p>What pages do you already have content for? What pages do you require content for? Attach below.</p>  
                        </Box>                            
                    </Section>
                    <p>Drag and Drop</p>
                    <Dragger>
                        <p className="ant-upload-drag-icon"><Icon type="inbox"/></p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                    </Dragger>
                    <Section title="Logo &amp; Company Material">
                        <Box>
                            <Callout message="Please upload any company material you currently use, this will provide us more understanding of your business."/>
                            <p>Upload your logo in as many formats and styles as possible</p>
                        </Box>
                    </Section>
                    <Section title="Call to Actions">
                        <Box>
                            <Callout theme="warning" message={["This section is extremely important - ", <strong>REMEMBER: Fish do not bite the hook when it is bare. You always need bait!</strong>]}/>
                            <p>What will create enough urgency to ensure the user commits to enquiring with your company?  Does your Special/Promotion stack up against your competition?</p>
                            <DynamicFieldSet component={ctaComponent} form={this.props.form}/>                              
                            <FormItem>
                                <TextArea autosize={{ minRows: 2, maxRows: 20 }} placeholder="Why should a user enquire with you rather than your competition?"/>
                            </FormItem>             
                        </Box>
                    </Section>
                    <Section title="Logins">
                        <Box>
                            <Callout message="Please choose below what social media you would like to include with link and logins"/>
                            <LoginFieldSet name="website__cPanel" description="cPanel" form={this.props.form}/>
                        </Box>
                    </Section>
                    <Button type="primary" htmlType="submit" className="login-form-button">Submit Details</Button>
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
                    <WrappedWebsiteForm/>
                </header>
            </div>
        );
    }
}
export default App;