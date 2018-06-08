import React , {Component} from 'react';
import './App.css';

class Shining extends Component{    
    constructor(props){
        super(props);
        this.state = {opacity:'1',name:'lbh'}        
    }
    // componentWillMount(){
    //     setInterval(()=>{
    //         var opacity = this.state.opacity;
    //         opacity =-0.5;
    //         if(opacity<0.1){
    //             opacity = 1;
    //         }
    //         this.setState({
    //             opacity:opacity
    //         })
    //     },100);
    // }
    render(){
        return <div style = {{opacity:this.state.opacity}}>
            {this.state.name}
        </div>
    }
}
export default Shining;