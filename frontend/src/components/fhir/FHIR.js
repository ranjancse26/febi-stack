import React, { Component } from 'react';


class FHIR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fhirData: {}
    }
  }

  componentDidMount() {
    // FHIR is globally loaded in index.js and can be accessed from the window variable
    var smart = window.FHIR.client({
      serviceUrl: 'https://r2.smarthealthit.org',
      auth: {
        type: 'none'
      }
    });
  
    smart.api.search({type: "Observation", query: {subject: "99912345"}
      }).then((r) => {
         console.log(r);
         this.setState({
           fhirData: r
         })
         this.props.setFhirData(this.state.fhirData);
      });
  }

  render() {
    return (
      <div className="fhir">
        <h2>FHIR Data</h2>
        <pre>
          {JSON.stringify(this.state.fhirData, null, 2)}
        </pre>
      </div>
    );
  }
}

export default FHIR;
