import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import userActions from "../core/users/userActions"
import { connect } from 'react-redux';
import { UserWrapper } from './userWrapper';
import NewUser from './newUser'
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";

class User extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            loading: false,
            modelView: "new",
            loading: false,
            visible: false,
            pro: {
                name: null,
                email: null,
                token: null
            },
            // for static //
            // tableData : [
            //      {name:[{title :"mr", first: "navin", last: "bhuva"}], email: "n@mail.com", id: 1 },
            //      {name:[{title :"mrs", first: "yara", last: "arya"}], email: "y@mail.com", id: 2 },
            //      {name:[{title :"mr", first: "vikas", last: "chaudhary"}], email: "v@mail.com", id: 3 },
            //      {name:[{title :"mr", first: "shiva", last: "khan"}], email: "s@mail.com", id: 4 },
            //      {name:[{title :"mr", first: "rakesh", last: "tala"}], email: "R@mail.com", id: 5 },
            // ],
            tableData: [
                // {name:[{title :"mr", first: "navin", last: "last"}], email: "n@mail.com", id: 1 },
            ],
            userData: {
                name: {},
            },
            validEmail: false,
            validNum: false,
            validName: false,
            visibleModel: false,
            type: "new", submitted: false, selectedId: 1,
            user_id: Math.floor(Math.random() * 100),
            currentPage: 1
        }
    }
    componentDidMount() {
        this.props.getUsersAction();
        this.setState({ loading: true })
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let update = {};
        switch (nextProps.userActions.type) {
            case "FACK_ACTION":
                break;
            case "GET_ALL_USERS_SUCCESS":
                update.tableData = nextProps.userActions.data.results;
                update.loading = false;
                nextProps.fakeAction()
                break;
            default:
        }
        return Object.keys(update).length === 0 ? null : update;
    }
    setData = (e, type, subtype) => {
        this.setState({ submitted: false });
        const userData = { ...this.state.userData };
        if (type === "name") {

            userData.name[subtype] = e;
            this.setState({ userData, validName: false });
        }
        if (type === "email") {
            const email1 = /[^@]+@[^@]+\.[^@]+/;
            if (((email1.test(e)))) {
                userData[type] = e;
                this.setState({ userData, validEmail: false });
            } else {
                userData[type] = e;
                this.setState({ userData, validEmail: true });
            }
        }
        else if (type === "phone") {
          
                userData[type] = e;
                this.setState({ userData, validNum: false });
            
        }
    }
    submit = () => {
        const { userData, tableData, user_id, type, selectedId } = this.state;

        this.setState({ submitted: true });
        const { email } = this.state.userData;
        if (!(email)) {
            return;
        }
        let re = /[^@]+@[^@]+\.[^@]+/;
        let number = /^[0-9\b]+$/;

        if (
            re.test(email) === false
        ) {
            this.setState({ validEmail: true, validNum: true });
            return;
        }
        if (re.test(email) === true) {
            this.setState({ validEmail: false });
        }
        if (re.test(email) === false) {
            this.setState({ validEmail: true, validNum: false });
            return;
        }

        if (type === 'new') {
            userData["user_id"] = tableData.length + 1;
            tableData.push(userData);
            this.setState({ visibleModel: false, tableData, userData: { name: {} }, submitted: false })
        }


        if (type === 'edit') {
            let updateIndex = tableData.findIndex(e => e.id === selectedId);
            tableData.splice(updateIndex, 1);
            tableData.push(userData)
            this.setState({ visibleModel: false, tableData, userData: { name: {} }, submitted: false })

        }
    }
    openModel = (e, id) => {
        const { tableData } = this.state;
        this.setState({ userData: { name: {} } })
        if (e === "edit") {
            let updateIndex = tableData.findIndex(e => e.user_id === id);
            this.setState({ userData: tableData[updateIndex], selectedId: id })
        }
        this.setState({ visibleModel: true, type: e, validEmail: false, validName: false, validNum: false, submitted: false })
    }
    handleClose = () => {
        this.setState({ visibleModel: false, selectedId: 1, validEmail: false, validName: false, validNum: false, submitted: false })
    }
    changeHandler = event => {
        const { name, value } = event.target;
        const pro = { ...this.state.pro };
        pro[name] = value;

        this._isMounted && this.setState({ pro });
    };
    delete = (i) => {
        const { tableData } = this.state;
        if (window.confirm('Delete the User?')) {
            tableData.splice(i, 1);
            this.setState({ tableData });
        }
    }
    changeCurrentPage = numPage => {
        this.setState({ currentPage: numPage });

    };
    render() {
        const { userData, loading, submitted, validEmail, type, validNum, validName, visibleModel } = this.state;

        return (
            <UserWrapper>
                <h2>User Module</h2>
                {/* create user */}
                {/* <button type="button" className="btn btn-info" onClick={() => this.openModel("new")}>Add User</button> */}
                <table id="myTable">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>phone</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Action</th></tr>
                    </thead>
                        {loading ? <div className="loadingcss" ><i  className="fa fa-spinner fa-spin" size="sm"></i></div> :
                    <tbody>
                                {this.state.tableData.map((a, i) =>
                                    <tr key={i}>
                                        <td>{a.email}</td>
                                        <td>{a.phone}</td>
                                        <td>{a.name.title + " " + a.name.first + " " + a.name.last}</td>
                                        <td>{a.picture.large}</td>
                                        <td><button onClick={(e) => this.openModel("edit", a.user_id)} className="buttonStyle"><i className="fa fa-edit" size="sm"></i></button>
                                            <button onClick={(e) => this.delete(i)} className="buttonStyle"><i className="fa fa-remove" size="sm"></i></button>
                                        </td>
                                    </tr>
                                )}
                    </tbody>
                        }
                </table>

                <NewUser
                    validNum={validNum}
                    validEmail={validEmail}
                    validName={validName}
                    setData={this.setData}
                    handleClose={this.handleClose}
                    submit={this.submit}
                    type={type}
                    submitted={submitted}
                    userData={userData}
                    visibleModel={visibleModel}
                />
                <Pagination
                    currentPage={this.state.currentPage}
                    totalPages={10}
                    changeCurrentPage={this.changeCurrentPage}
                />
            </UserWrapper>
        )
    }
}
export default connect(
    state => ({
        ...state.userReducer
    }),
    {
        ...userActions
    }
)(User)