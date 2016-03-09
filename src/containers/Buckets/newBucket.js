import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as bucketActions from 'redux/modules/bucket';
import bucketFormValidation from './bucketFormValidation'
import {Link, hashHistory} from 'react-router';

var file;
var filetype;

@connect(
  state => ({
    bucket: state.bucket
  }),
  dispatch => ({
    create: (bucketObj) => dispatch(bucketActions.create(bucketObj)),
    clear: () => dispatch(bucketActions.clear())
  })
)

@reduxForm({
  form: 'Bucket',
  fields: ['name'],
  validate: bucketFormValidation
})

export default class NewBucket extends Component {

  static propTypes = {
    fields       : PropTypes.object.isRequired, // from redux-form
    create       : PropTypes.func.isRequired,
    handleSubmit : PropTypes.func.isRequired
  };

  createBucket() {
    this.props.create({
      name: this.props.fields.name.value
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.bucket.saved === true) {
      hashHistory.push('/dashboard/bucket/' + nextProps.bucket.id);
    }
  }

  componentWillUnmount() {
    this.props.clear();
  }

  render() {
    let {query} = this.props.location
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">

              <div className="row">
                <div className="col-sm-12">
                  <h1 className="title pull-left">Create Bucket</h1>
                </div>
              </div>

              <form>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="content">
                      <div className="form-group">
                        <label htmlFor="name">Bucket Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Bucket Name" {...this.props.fields.name}/>
                      </div>
                    </div>
                  </div>
				        </div>

				        <div className="row">
                  <div className="col-xs-6">
						        <Link to="/dashboard" className="btn btn-block btn-transparent">Go Back</Link>
                  </div>

                  <div className="col-xs-6">
                    <a href="javascript:void(0)" onClick={this.props.handleSubmit(this.createBucket.bind(this))} className="btn btn-block btn-green btn-create-bucket">Save Bucket</a>
                  </div>
				        </div>
              </form>

			     </div>
			   </div>
		    </div>
      </section>
    );
  }
};
