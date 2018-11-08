import React, {Component} from "react";
import {IField} from "../types";

export default class Field extends Component<FieldProps>
{

    render() {
        const style = {
            width: this.props.field.width,
            height: this.props.field.height
        };
        return <div className='field' style={style}>{this.props.children}</div>
    }

}

export interface FieldProps {

    field: IField

}