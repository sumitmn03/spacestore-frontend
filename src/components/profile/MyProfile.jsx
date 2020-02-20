import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUserProfile, send_otp, updateUser } from "../../actions/auth";

export class MyProfile extends Component {
  state = {
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    phone_no: "",
    otp: "",
    otp_sent: false
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    updateUserProfile: PropTypes.func.isRequired,
    send_otp: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    update_status: PropTypes.number.isRequired,
    wrong_otp_count: PropTypes.number.isRequired
  };

  componentDidMount() {
    const { user } = this.props;
    if (user && user.profile) {
      let contact_infos = ["email", "phone_no"];
      contact_infos.map(contact_info =>
        this.setState({
          [contact_info]: user[contact_info] ? user[contact_info] : ""
        })
      );

      let personal_infos = ["first_name", "last_name", "gender"];
      personal_infos.map(personal_info =>
        this.setState({
          [personal_info]: user.profile[personal_info]
            ? user.profile[personal_info]
            : ""
        })
      );
    }
  }

  handleOnChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  submitPersonalInfo = e => {
    e.preventDefault();
    const { first_name, last_name, gender } = this.state;
    this.props.updateUserProfile({ first_name, last_name, gender });
  };

  sendOTP = () => {
    this.props.send_otp(this.state.email);
    this.setState({ otp_sent: true });
  };

  submitContactInfo = data => {
    let { email, phone_no, otp } = this.state;
    if (data.auto_triggered) otp = data.value;
    if (email !== "") {
      this.props.updateUser({ email, phone_no, otp });
    } else {
      console.log("email is mandatory");
    }
  };

  componentDidUpdate(prevProps) {
    // console.log("hell")
    const { update_status, wrong_otp_count } = this.props;
    if (prevProps !== this.props) {
      if (update_status === 6) this.setState({ otp_sent: false });
      if (wrong_otp_count >= 9) this.setState({ otp_sent: false });
    }
  }

  constact_submit_value = () => {
    const { update_status } = this.props;
    let value;
    switch (update_status) {
      case 1:
      case 3:
      case 6:
        value = "Update contact info";
        break;

      case 2:
        value = "Loading...";
        break;

      case 4:
      case 5:
        value = "Confirm OTP";
        break;

      default:
        value = "Update contact info";
        break;
    }
    return value;
  };

  render() {
    const {
      first_name,
      last_name,
      gender,
      email,
      phone_no,
      otp,
      otp_sent
    } = this.state;

    return (
      <div className="ms-profile-page">
        <div className="ms-profile-header">MY PROFILE</div>
        <div className="ms-profile-body">
          <div className="ms-profile-form">
            <form onSubmit={this.submitPersonalInfo}>
              <div className="ms-profile-name-container first">
                <label
                  className="ms-profile-form-name-label"
                  htmlFor="first_name"
                >
                  First name
                </label>
                <input
                  className="ms-profile-form-name-inp"
                  type="text"
                  name="first_name"
                  value={first_name}
                  id="first_name"
                  placeholder="First name"
                  onChange={this.handleOnChange}
                />
              </div>
              <br /> <br /> <br />
              <div className="ms-profile-name-container">
                <label
                  className="ms-profile-form-name-label"
                  htmlFor="last_name"
                >
                  Last name
                </label>
                <input
                  className="ms-profile-form-name-inp"
                  type="text"
                  name="last_name"
                  value={last_name}
                  id="last_name"
                  placeholder="Last name"
                  onChange={this.handleOnChange}
                />
              </div>
              <br /> <br /> <br />
              <div>
                <label
                  className="ms-profile-form-name-label"
                  htmlFor="profile_gender"
                >
                  Gender
                </label>
                <br />
                <input
                  className="ms-profile-form-gender-btn"
                  name="gender"
                  type="button"
                  value="Male"
                  style={
                    gender === "Male"
                      ? { backgroundColor: "rgb(10, 117, 204)" }
                      : { backgroundColor: "grey" }
                  }
                  onClick={this.handleOnChange}
                />
                <input
                  className="ms-profile-form-gender-btn"
                  name="gender"
                  type="button"
                  value="Female"
                  style={
                    gender === "Female"
                      ? { backgroundColor: "rgb(10, 117, 204)" }
                      : { backgroundColor: "grey" }
                  }
                  onClick={this.handleOnChange}
                />
              </div>
              <br /> <br />
              <button type="submit">Update personal info</button>
            </form>
            <br /> <br /> <br />
            <form
              onSubmit={e => {
                e.preventDefault();
                otp_sent
                  ? this.submitContactInfo({ auto_triggered: false })
                  : this.sendOTP();
              }}
            >
              <div>
                <label className="ms-profile-form-name-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="ms-profile-form-name-inp"
                  type="email"
                  name="email"
                  value={email}
                  id="email"
                  placeholder="Email"
                  onChange={this.handleOnChange}
                  disabled={otp_sent ? true : false}
                />
              </div>
              <br /> <br />
              <div>
                <label
                  className="ms-profile-form-name-label"
                  htmlFor="phone_no"
                >
                  Phone no.
                </label>
                <input
                  className="ms-profile-form-name-inp"
                  type="number"
                  name="phone_no"
                  value={phone_no}
                  id="phone_no"
                  placeholder="Phone no."
                  onChange={this.handleOnChange}
                  disabled={otp_sent ? true : false}
                />
              </div>
              <br /> <br />
              <div style={{ display: otp_sent ? "block" : "none" }}>
                <label className="ms-profile-form-name-label" htmlFor="otp">
                  <span style={{ color: "black", fontWeight: "normal" }}>
                    {" "}
                    Enter the OTP sent to{" "}
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    {this.state.email}
                  </span>{" "}
                </label>
                <input
                  className="ms-profile-form-name-inp"
                  type="number"
                  name="otp"
                  value={otp}
                  id="otp"
                  placeholder="Enter OTP here"
                  onChange={e => {
                    let value = e.target.value;
                    if (value.toString().length === 6) {
                      this.submitContactInfo({ auto_triggered: true, value });
                    }
                    let new_value = value.toString().slice(0, 6);
                    this.setState({ [e.target.name]: new_value });
                  }}
                />
                <p
                  className="ms-user-update-otp-warning"
                  style={{
                    display: this.props.wrong_otp_count > 0 ? "block" : "none"
                  }}
                >
                  Incorrect Password. You have {9 - this.props.wrong_otp_count}{" "}
                  attempt(s) left.
                </p>
                <p
                  className="ms-user-update-otp-warning"
                  style={{
                    display: this.props.update_status === 3 ? "block" : "none"
                  }}
                >
                  Server error ! Please try again later
                </p>
                <br /> <br />
              </div>
              <button type="submit">{this.constact_submit_value()}</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  update_status: state.updateUser.update_status,
  wrong_otp_count: state.updateUser.wrong_otp_count
});

export default connect(mapStateToProps, {
  updateUserProfile,
  send_otp,
  updateUser
})(MyProfile);
