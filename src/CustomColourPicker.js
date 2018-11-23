import React from 'react';
import { Button } from 'antd';
import { CustomPicker } from 'react-color';
import { Saturation } from 'react-color/lib/components/common/';

class CustomColourPicker extends React.Component {
    render() {
        const { defaultColours } = this.props;
        const colourComponents = 
            <ul className="colour-picker-list">
                {
                    defaultColours.map(key => 
                        <li style={{
                            backgroundColor: key,
                            borderColor: 
                        }}/>
                    )
                }
            </ul>

        return (
            <>
                {colourComponents}
                <div style={{position: 'relative', width: '300px', height: '300px'}}>
                    <Saturation {... this.props} onChange={this.props.onChange}/>
                </div>
            </>
        //     <div>
                
        //     <div style={{
        //       height: '300px',
        //       width: '300px',
        //       position: 'relative',
        //       float: 'left'
        //     }}>
        //       <Saturation
        //         {...this.props}
        //         onChange={this.props.onChange}
        //       />
        //     </div>
        //     <div style={{
        //       marginLeft: '10px',
        //       height: '300px',
        //       width: '30px',
        //       position: 'relative',
        //       float: 'left'
        //     }}>
        //       <Hue
        //         {...this.props}
        //         direction="vertical"
        //         onChange={this.props.onChange}
        //       />
        //     </div>
        //   </div>
        );
    }
}

export default CustomPicker(CustomColourPicker);