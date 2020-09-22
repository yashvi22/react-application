import React,{Component}from 'react';
import{Modal,ModalHeader,ModalBody,Breadcrumb ,BreadcrumbItem,Button,Card,CardImg,CardBody,CardTitle,CardText,Row,Col,Label} from 'reactstrap';
import{Link} from 'react-router-dom';
import{LocalForm,Control,Errors} from 'react-redux-form';
import{Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform} from 'react-animation-components';

const required=(val)=>val && val.length;

const maxLength=(len)=>(val)=>!(val)||(val.length<=len);

const minLength=(len)=>(val)=>!(val)||(val.length>=len);

 class CommentForm extends Component{
 	constructor(props){
 		super(props);
 		this.state={
 			isModalOpen:false
 		};
 		this.toggleModal=this.toggleModal.bind(this);
 		this.handleSubmit=this.handleSubmit.bind(this);
 		
 	}

 	toggleModal(){
 		this.setState({
 			isModalOpen:!this.state.isModalOpen
 		});
 	}

 	handleSubmit(values){
 		this.toggleModal();
 		this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
 	}
 	render(){
 		return(
 			<div className="container">
 				<Button outline onClick={this.toggleModal}>
	 				<span className="fa fa-pencil fa-lg"></span>
	 				Submit Comment{" "}
 				</Button>
 				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
 					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
 					<ModalBody>
 						<LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
 							<Row className="form-group">
 								<Label htmlFor="rating" md={12}>
 									Rating
 								</Label>
 								<Col md={{size:12}}>
 									<Control.select model=".rating"
 										name="rating"
 										className="form-control">
 											<option>1</option>
 											<option>2</option>
 											<option>3</option>
 											<option>4</option>
 											<option>5</option>
 									</Control.select>
 								</Col>
 							</Row>
 							<Row className="form-group">
 								<Label htmlFor="author" md={12}>Your Name
 								</Label>
 								<Col md={12}>
 									<Control.text model=".firstname"  
                                        id="firstname" 
                                        name="firstname" 
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required,minLength:minLength(3),maxLength:maxLength(15)
                                        }} />
                                        <Errors
                                            className="text-danger"
                                            model=".firstname"
                                            show="touched"
                                            messages={{
                                                required:'Required',
                                                minLength:'must be greater than 2 character',
                                                maxLength:'must be less than 15 character'
                                            }}
                                        /> 
 								</Col>
 							</Row>
 							<Row className="form-group">
 								<Label htmlFor="comment" md={12}>
 									Comment 
 								</Label> 								
 								<Col md={12}>
 									<Control.textarea model=".comment"
 									name="comment"
 									id="comment"
 									rows={5}
 									className="form-control"/>
 								</Col>
 							</Row>
 							<Button type="submit" value="submit" color="primary">
 								Submit
 							</Button>
 						</LocalForm>
 					</ModalBody>
 				</Modal>
 			</div>
 		);
 	}
 }



	function RenderDish({dish}) {
        return (
            <FadeTransform in 
                transformProps={{
                    exitTransform:'scale(0.5) translateY(-50%)'
                }}>
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            </FadeTransform>
        );
    }
    function RenderComments({ comments, postComment, dishId }) {
        return(
            <div className="col-12 col-md-5 m-1">
                <h3>comments</h3>
                
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        );
        }

    
	const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="comtainer">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="comtainer">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish!=null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}      
                        />
                        
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }


export default DishDetail;