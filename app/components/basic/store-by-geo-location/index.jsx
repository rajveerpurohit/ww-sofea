import React, { Component } from 'react';
import {connect} from 'react-redux';


export default class storeByGeoLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radiusVal : "5"
    }
  }
  
 
  radiusSelect(event){
    let getRadiusVal  = event.target.value;
      this.setState({
        radiusVal : getRadiusVal
      });
  }

componentDidUpdate(){
  if(document.getElementById('exit')!=null && document.getElementById('exit').value=="true"){
     document.getElementById('exit').value="false";
      this.setState({
        radiusVal : "5"
      });
  }
}
	 
  render() {
  //  console.log('Inside GEO LOCATION.......this.state.radiusVal='+this.state.radiusVal);
 //   console.log('Inside GEO LOCATION......storeRadius='+document.getElementById('exit').value);
    return (
      <div>
                        <h2 className="text-caps font-graphic">Find a Store near me</h2> <p><strong>Find a Store in your area</strong>: (Choose a proximity in KMs below and then click 'show me nearby Store')</p>
                        <form id="searchByGeoLocform">
                          <p style={{display: 'inline-block'}}>Show me Store within a &nbsp; </p>
                          <div className="form-field storeRadius" style={{display: 'inline-block', float: 'left'}}>  
                            <span className="enhanced-select"><select id="storeRadius" name="question" onChange={(e)=>{this.radiusSelect(e);this.props.radius(document.getElementById('storeRadius').value);}}>
                                <option value={1}>1</option>
                                <option data-validate-unselected="true" value={5} selected>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                              </select>
                              <span className="enhanced-select__label">{this.state.radiusVal}</span><span className="icon enhanced-select__icon"></span>
                        </span>
                           
                          </div>
                          <p style={{display: 'inline-block'}}>&nbsp; km radius.</p>
						  <br/>
						  <br/>
						  

</form>
      </div>
    );
  }
}
