import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import profileImage from "../../../assets/images/avatar/1.jpg";

import { Dropdown } from "react-bootstrap";

const Read = () => {
   const [openMailBar, setOpenMailBar] = useState();
   return (
      <Fragment>         
         <div className="row">
            <div className="col-lg-12">
               <div className="card">
                  <div className="card-body">
                     <div className="row">
                        <div className={`col-xl-3 col-xxl-4  email-left-body ${openMailBar ? "active" : " "}`}>
                           <div className="email-left-box generic-width px-0 mb-5">
                              <div className="p-0">
                                 <Link
                                    to="/email-compose"
                                    className="btn btn-primary btn-block"
                                 >
                                    Compose
                                 </Link>
                              </div>
                              <div className="mail-list mt-4 rounded">
                                 <Link
                                    to="/email-inbox"
                                    className="list-group-item active"
                                 >
                                    <i className="fa fa-inbox font-18 align-middle me-2"></i>
                                    Inbox
                                    <span className="badge badge-danger badge-sm float-end">
                                       198
                                    </span>
                                 </Link>
                                 <Link to="/email-read" className="list-group-item">
                                    <i className="fa fa-paper-plane font-18 align-middle me-2"></i>
                                    Sent
                                 </Link>
                                 <Link to="/email-read" className="list-group-item">
                                    <i className="fa fa-star font-18 align-middle me-2"></i>
                                    Important
                                    <span className="badge badge-danger badge-sm text-white float-end">
                                       47
                                    </span>
                                 </Link>
                                 <Link to="/email-read" className="list-group-item">
                                    <i className="mdi mdi-file-document-box font-18 align-middle me-2"></i>
                                    Draft
                                 </Link>
                                 <Link to="/email-read" className="list-group-item">
                                    <i className="fa fa-trash font-18 align-middle me-2"></i>
                                    Trash
                                 </Link>
                              </div>
                              <div className="mail-list mt-4 rounded overflow-hidden">
                                 <div className="intro-title d-flex justify-content-between my-0">
                                    <h5>Categories</h5>                                    
                                 </div>
                                 <Link to="/email-read" className="list-group-item">
                                    <span className="icon-warning">
                                       <i
                                          className="fa fa-circle"
                                          aria-hidden="true"
                                       ></i>
                                    </span>
                                    Work
                                 </Link>
                                 <Link to="/email-read" className="list-group-item">
                                    <span className="icon-primary">
                                       <i
                                          className="fa fa-circle"
                                          aria-hidden="true"
                                       ></i>
                                    </span>
                                    Private
                                 </Link>
                                 <Link to="/email-read" className="list-group-item">
                                    <span className="icon-success">
                                       <i
                                          className="fa fa-circle"
                                          aria-hidden="true"
                                       ></i>
                                    </span>
                                    Support
                                 </Link>
                                 <Link to="/email-read" className="list-group-item">
                                    <span className="icon-dpink">
                                       <i
                                          className="fa fa-circle"
                                          aria-hidden="true"
                                       ></i>
                                    </span>
                                    Social
                                 </Link>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-9 col-xxl-8">
                           <div>
                              <div className={`email-tools-box float-end ${openMailBar ? "active" : " "}`} onClick={()=>setOpenMailBar(!openMailBar)}>	
                                 <i className="fa-solid fa-list-ul" />
                              </div>
                              <div className="right-box-padding">
                                 <div className="toolbar mb-4" role="toolbar">
                                    <div className="btn-group mb-1">
                                       <button
                                          type="button"
                                          className="btn btn-primary light px-3"
                                       >
                                          <i className="fa fa-archive"></i>
                                       </button>
                                       <button
                                          type="button"
                                          className="btn btn-primary light px-3"
                                       >
                                          <i className="fa fa-exclamation-circle"></i>
                                       </button>
                                       <button
                                          type="button"
                                          className="btn btn-primary light px-3"
                                       >
                                          <i className="fa fa-trash"></i>
                                       </button>
                                    </div>
                                    <Dropdown className="btn-group mb-1">
                                       <Dropdown.Toggle
                                          type="button"
                                          className="btn btn-primary light dropdown-toggle px-3 ms-1"
                                          data-toggle="dropdown"
                                       >
                                          <i className="fa fa-folder"></i>
                                          <b className="caret m-l-5"></b>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu className="dropdown-menu">
                                          <Dropdown.Item
                                             as="a"
                                             className="dropdown-item"
                                             to="/email-read"
                                          >
                                             Social
                                          </Dropdown.Item>
                                          <Dropdown.Item
                                             as="a"
                                             className="dropdown-item"
                                             to="/email-read"
                                          >
                                             Promotions
                                          </Dropdown.Item>
                                          <Dropdown.Item
                                             as="a"
                                             className="dropdown-item"
                                             to="/email-read"
                                          >
                                             Updates
                                          </Dropdown.Item>
                                          <Dropdown.Item
                                             as="a"
                                             className="dropdown-item"
                                             to="/email-read"
                                          >
                                             Forums
                                          </Dropdown.Item>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown className="btn-group mb-1">
                                       <Dropdown.Toggle
                                          className="btn btn-primary light dropdown-toggle px-3 ms-1"
                                          data-toggle="dropdown"
                                       >
                                          <i className="fa fa-tag"></i>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu>
                                          <Dropdown.Item as="a">
                                             Updates
                                          </Dropdown.Item>
                                          <Dropdown.Item as="a">
                                             Social
                                          </Dropdown.Item>
                                          <Dropdown.Item as="a">
                                             Promotions
                                          </Dropdown.Item>
                                          <Dropdown.Item as="a">
                                             Forums
                                          </Dropdown.Item>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown className="btn-group mb-1">
                                       <Dropdown.Toggle
                                          type="button"
                                          className="btn btn-primary light dropdown-toggle v ms-1"
                                          data-toggle="dropdown"
                                       >
                                          More{" "}
                                          <span className="caret m-l-5"></span>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu className="dropdown-menu">
                                          <Dropdown.Item
                                             className="dropdown-item"
                                             to="/email-read"
                                          >
                                             Mark as Unread
                                          </Dropdown.Item>
                                          <Dropdown.Item
                                             className="dropdown-item"
                                             to="/email-read"
                                          >
                                             Add to Tasks
                                          </Dropdown.Item>
                                          <Dropdown.Item
                                             className="dropdown-item"
                                             to="/email-read"
                                          >
                                             Add Star
                                          </Dropdown.Item>
                                          <Dropdown.Item
                                             className="dropdown-item"
                                             to="/email-read"
                                          >
                                             Mute
                                          </Dropdown.Item>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </div>
                                 <div className="read-content">
                                    <div className="media pt-3 d-sm-flex d-block justify-content-between">
                                       <div className="clearfix mb-3 d-flex">
                                          <img
                                             className="me-3 rounded"
                                             width="50"
                                             alt=""
                                             src={profileImage}
                                          />
                                          <div className="media-body me-2">
                                             <h5 className="text-primary mb-0 mt-1">
                                                Ingredia Nutrisha
                                             </h5>
                                             <p className="mb-0">20 August 2023</p>
                                          </div>
                                       </div>
                                       <div className="clearfix mb-3">
                                          <Link
                                             to="/email-read"
                                             className="btn btn-primary px-3 light"
                                          >
                                             <i className="fa fa-reply" />
                                          </Link>
                                          <Link
                                             to="/email-read"
                                             className="btn btn-primary px-3 light ms-2"
                                          >
                                             <i className="fa fa-long-arrow-right" />
                                          </Link>
                                          <Link
                                             to="/email-read"
                                             className="btn btn-primary px-3 light ms-2"
                                          >
                                             <i className="fa fa-trash"/>
                                          </Link>
                                       </div>
                                    </div>
                                    <hr />
                                    <div className="media mb-2 mt-3">
                                       <div className="media-body">
                                          <span className="pull-end">
                                             08:23 AM
                                          </span>
                                          <h5 className="my-1 text-primary">
                                             A collection of textile samples lay
                                             spread
                                          </h5>
                                          <p className="read-content-email">
                                             To: Me, info@example.com
                                          </p>
                                       </div>
                                    </div>
                                    <div className="read-content-body new-bg-light">
                                       <h5 className="mb-4">Hi,Ingredia,</h5>
                                       <p className="mb-2">
                                          <strong>Ingredia Nutrisha,</strong> A
                                          collection of textile samples lay
                                          spread out on the table - Samsa was a
                                          travelling salesman - and above it
                                          there hung a picture
                                       </p>
                                       <p className="mb-2">
                                          Even the all-powerful Pointing has no
                                          control about the blind texts it is an
                                          almost unorthographic life One day
                                          however a small line of blind text by
                                          the name of Lorem Ipsum decided to
                                          leave for the far World of Grammar.
                                          Aenean vulputate eleifend tellus.
                                          Aenean leo ligula, porttitor eu,
                                          consequat vitae, eleifend ac, enim.
                                          Aliquam lorem ante, dapibus in,
                                          viverra quis, feugiat a, tellus.
                                       </p>
                                       <p className="mb-2">
                                          Aenean vulputate eleifend tellus.
                                          Aenean leo ligula, porttitor eu,
                                          consequat vitae, eleifend ac, enim.
                                          Aliquam lorem ante, dapibus in,
                                          viverra quis, feugiat a, tellus.
                                          Phasellus viverra nulla ut metus
                                          varius laoreet. Quisque rutrum. Aenean
                                          imperdiet. Etiam ultricies nisi vel
                                          augue. Curabitur ullamcorper ultricies
                                          nisi. Nam eget dui. Etiam rhoncus.
                                          Maecenas tempus, tellus eget
                                          condimentum rhoncus, sem quam semper
                                          libero, sit amet adipiscing sem neque
                                          sed ipsum. Nam quam nunc, blandit vel,
                                          luctus pulvinar,
                                       </p>
                                       <h5 className="pt-3">Kind Regards</h5>
                                       <p>Mr Smith</p>
                                       <hr />
                                    </div>
												            <button className="btn btn-secondary btn-sm me-1"><i className="fa-solid fa-reply me-1" />Reply</button>                                   
                                    <button className="btn btn-primary btn-sm "><i className="fa-solid fa-forward me-1" />Forward</button>
                                    <hr />
                                    <div className="mb-3 pt-3">
                                       <textarea
                                          name="write-email"
                                          id="write-email"
                                          cols="30"
                                          rows="5"
                                          className="form-control"
                                          placeholder="It's really an amazing.I want to know more about it..!"
                                       ></textarea>
                                    </div>
                                 </div>
                                 <div className="text-end">
                                    <button
                                       className="btn btn-primary "
                                       type="button"
                                    >
                                       Send
                                    </button>
                                 </div>
                              </div>                          
                              
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default Read;
