import React, { Component } from "react";

import { View } from "react-native";

import { Badge, Text } from "native-base";

export default class NumberBadge extends Component {
    render() {
        if (this.props.name == 'ToEvaluate'){ 
            return (
                <Badge warning style={{marginTop:10}}>
                    <Text>{this.props.number}</Text>
                </Badge>
            );
        }
        else if (this.props.name == 'Evaluated'){ 
            return (
                <Badge success style={{marginTop:10}}>
                    <Text>{this.props.number}</Text>
                </Badge>
            );
        }
        
    }

}
