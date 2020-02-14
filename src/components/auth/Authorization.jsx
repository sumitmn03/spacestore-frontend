import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  send_register_otp,
  register_new_user,
  login,
  otpLogin,
  send_otp
} from "../../actions/auth";

export class Authorization extends Component {
  state = {
    // True- Login, False- Register
    login_page: true,
    // True- first page, False- second page
    first_page: true,
    email: "",
    password: "",
    otp: "",
    submit_btn_value: "Continue",
    otp_btn_value: "Use OTP"
  };

  static propTypes = {
    send_register_otp: PropTypes.func.isRequired,
    register_new_user: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    otpLogin: PropTypes.func.isRequired,
    send_otp: PropTypes.func.isRequired,
    login_status: PropTypes.number.isRequired,
    registration_status: PropTypes.number.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  handleOnChange = e => this.setState({ [e.target.name]: e.target.value });

  handleRegisterOtp = () => {
    const { email, password } = this.state;
    if (email !== "" && password !== "") {
      this.props.send_register_otp(email);
    } else {
      console.log("The email and password must be filled");
    }
  };

  handleRegister = data => {
    let { email, password, otp } = this.state;
    if (data.auto_triggered) {
      otp = data.value;
    }
    this.props.register_new_user(email, password, otp);
  };

  handlePwLogin = () => {
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  handleSendOtp = () => {
    const { email } = this.state;
    if (email !== "" && this.props.login_status !== 2) {
      this.props.send_otp(email);
    }
  };

  handleOtpLogin = data => {
    let { email, otp } = this.state;
    if (data.auto_triggered) {
      otp = data.value;
    }
    this.props.otpLogin(email, otp);
  };

  componentDidMount = () => {
    this.authSettings();
  };

  authSettings = () => {
    if (!this.props.isAuthenticated) {
      let auth_page = document.getElementsByClassName("ms-auth-page")[0];
      if (auth_page) {
        let open_auth_btn = document.getElementsByClassName(
          "ms-auth-open-btn"
        )[0];

        // let alt_page_link = document.getElementsByClassName(
        //   "ms-alt-page-link"
        // )[0];

        if (open_auth_btn) {
          open_auth_btn.addEventListener(
            "click",
            () => (auth_page.style.display = "block")
          );

          window.addEventListener("click", e => {
            if (e.target === auth_page) {
              auth_page.style.display = "none";
            }
          });
          // this.props.setLoggedOutJustNow(false);
        }
      }
    }
  };

  getMainInps = () => {
    return (
      <Fragment>
        <input
          name="email"
          className="ms-auth-inp"
          placeholder="Email"
          type="email"
          value={this.state.email}
          onChange={this.handleOnChange}
          disabled={this.props.login_status === 2 ? true : false}
        />
        <input
          name="password"
          className="ms-auth-inp"
          placeholder="Password"
          type="password"
          value={this.state.password}
          onChange={this.handleOnChange}
          disabled={this.props.login_status === 2 ? true : false}
        />
      </Fragment>
    );
  };

  getOtpInp = () => {
    return (
      <Fragment>
        <input
          name="otp"
          className="ms-auth-inp"
          placeholder="Enter the OTP here"
          type="number"
          value={this.state.otp}
          onChange={e => {
            let value = e.target.value;
            if (value.toString().length === 6) {
              if (this.state.login_page) {
                this.handleOtpLogin({ auto_triggered: true, value });
              } else {
                this.handleRegister({ auto_triggered: true, value });
              }
            }
            let new_value = value.toString().slice(0, 6);
            this.setState({ [e.target.name]: new_value });
          }}
          disabled={this.props.login_status === 2 ? true : false}
        />
        <p
          className="ms-auth-otp-warning"
          style={{
            display:
              this.props.wrong_otp_count > 0 && this.props.login_status === 6
                ? "block"
                : "none"
          }}
        >
          This OTP is incorrect. You have {9 - this.props.wrong_otp_count}{" "}
          attempt(s) left.
        </p>
      </Fragment>
    );
  };

  getMainBtn = () => {
    return (
      <button className="ms-auth-submit" type="submit">
        {this.state.submit_btn_value}
      </button>
    );
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      const { login_page } = this.state;
      if (login_page) {
        // login status -
        // 1) Password login - 1. Normal 2. Verifying 3. New user 5. Login fail 7. Login success
        // 2) OTP login - 1. Normal 2. OTP sending 3. New user 4. OTP sent fail 5. OTP sent success 2. Verifying 6. OTP does not match 7. Login success
        switch (this.props.login_status) {
          case 1:
            this.setState({
              submit_btn_value: "Log in",
              otp_btn_value: "Use OTP"
            });
            break;

          case 2:
            this.setState({
              submit_btn_value: "Loading...",
              otp_btn_value: "Loading..."
            });
            break;

          case 3:
            this.setState({
              login_page: false,
              first_page: false,
              submit_btn_value: "Sign up"
            });
            break;

          case 5:
            this.setState({
              first_page: false,
              submit_btn_value: "Log in",
              otp_btn_value: "Use OTP"
            });
            break;

          case 6:
            this.setState({
              submit_btn_value: "Log in"
            });
            break;

          case 7:
            this.setState({
              login_page: true,
              first_page: true,
              email: "",
              password: "",
              otp: "",
              submit_btn_value: "Continue",
              otp_btn_value: "Use OTP"
            });
            break;

          default:
            console.log("Authorization -> componentDidUpdate");
            break;
        }
      } else {
        // registration status - 1. OTP not sent (normal) 2. OTP sending 3. Old user 1. OTP sent fail 5. OTP sent success 2. Verifying 6. OTP does not match 7. OTP match
        switch (this.props.registration_status) {
          case 1:
            this.setState({
              submit_btn_value: "Continue"
            });
            break;

          case 2:
            this.setState({
              submit_btn_value: "Loading..."
            });
            break;

          case 3:
            this.setState({
              login_page: true,
              first_page: false,
              submit_btn_value: "Log in"
            });
            break;

          case 5:
            this.setState({
              submit_btn_value: "Sign up",
              first_page: false
            });
            break;

          case 6:
            this.setState({
              submit_btn_value: "Sign up"
            });
            break;

          case 7:
            this.setState({
              login_page: true,
              first_page: true,
              email: "",
              password: "",
              otp: "",
              submit_btn_value: "Continue",
              otp_btn_value: "Use OTP"
            });
            break;

          default:
            console.log("Authorization -> componentDidUpdate");
            break;
        }
      }
    }
  };

  findComponentToRender = () => {
    let form_inps;
    if (this.state.login_page) {
      if (this.state.first_page) {
        form_inps = (
          <Fragment>
            {this.getMainInps()}
            <p
              className="ms-auth-otp-warning"
              style={{
                display:
                  this.props.wrong_otp_count > 0 &&
                  this.props.login_status === 1
                    ? "block"
                    : "none"
              }}
            >
              Incorrect Password. You have {9 - this.props.wrong_otp_count}{" "}
              attempt(s) left.
            </p>
            {this.getMainBtn()}
            <p style={{ textAlign: "center" }}>OR</p>
            <button
              className="ms-login-submit"
              type="button"
              onClick={this.handleSendOtp}
            >
              {this.state.otp_btn_value}
            </button>
          </Fragment>
        );
      } else {
        form_inps = (
          <Fragment>
            <p>
              {/* Enter the OTP sent to{" "}
              <span style={{ fontWeight: "bold" }}>{this.state.email}</span> . */}
              <span
                style={{
                  color: "#115EA4",
                  display: "block",
                  marginTop: "5px"
                }}
                onClick={() => {
                  this.setState({ first_page: true });
                }}
              >
                Go back
              </span>
            </p>
            {this.getOtpInp()}
            {this.getMainBtn()}
          </Fragment>
        );
      }
    } else {
      if (this.state.first_page) {
        form_inps = (
          <Fragment>
            {this.getMainInps()}
            {this.getMainBtn()}
          </Fragment>
        );
      } else {
        form_inps = (
          <Fragment>
            <p>
              {/* Enter the OTP sent to{" "}
              <span style={{ fontWeight: "bold" }}>{this.state.email}</span> . */}
              <span
                style={{
                  color: "#115EA4",
                  display: "block",
                  marginTop: "5px"
                }}
                onClick={() => {
                  this.setState({ first_page: true });
                }}
              >
                Go back
              </span>
            </p>
            {this.getOtpInp()}
            {this.getMainBtn()}
          </Fragment>
        );
      }
    }
    return form_inps;
  };

  render() {
    let { login_page, first_page } = this.state;

    if (!this.props.isAuthenticated) {
      this.authSettings();
      return (
        <div
          style={{ display: this.props.isAuthenticated ? "none" : "block" }}
          className="ms-auth-page"
        >
          <div className="ms-auth-page-container">
            <div className="ms-auth-page-sidebar">
              <div className="ms-auth-page-sidebar-content">
                Now Customizing things are much easier than you think. This is
                from the auth page
              </div>
            </div>
            <span
              className="ms-auth-page-close"
              onClick={() =>
                (document.getElementsByClassName(
                  "ms-auth-page"
                )[0].style.display = "none")
              }
            >
              &times;
            </span>
            <div className="ms-auth-page-body">
              <h2>
                {login_page
                  ? "Log in to SpaceStore"
                  : "Register for SpaceStore"}
              </h2>
              <form
                className="ms-auth-form"
                onSubmit={e => {
                  e.preventDefault();
                  if (this.props.login_status !== 2) {
                    if (this.state.login_page) {
                      if (this.state.first_page) {
                        this.handlePwLogin();
                      } else {
                        this.handleOtpLogin({ auto_triggered: false });
                      }
                    } else {
                      if (this.state.first_page) {
                        this.handleRegisterOtp();
                      } else {
                        this.handleRegister({ auto_triggered: false });
                      }
                    }
                  }
                }}
              >
                {this.findComponentToRender()}
              </form>
              {first_page ? (
                <p className="ms-alt-page">
                  {login_page ? (
                    <Fragment>
                      New to SpaceStore ?{" "}
                      <span
                        className="ms-alt-page-link"
                        onClick={() => {
                          this.setState({
                            submit_btn_value: this.state.login_page
                              ? "Continue"
                              : "Log in",
                            login_page: this.state.login_page ? false : true
                          });
                        }}
                      >
                        Create an account now
                      </span>
                    </Fragment>
                  ) : (
                    <Fragment>
                      Existing user ?{" "}
                      <span
                        className="ms-alt-page-link"
                        onClick={() => {
                          this.setState({
                            submit_btn_value: this.state.login_page
                              ? "Continue"
                              : "Log in",
                            login_page: this.state.login_page ? false : true
                          });
                        }}
                      >
                        Log in now
                      </span>
                    </Fragment>
                  )}
                </p>
              ) : (
                <Fragment />
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <Fragment />;
    }
  }
}

const mapStateToProps = state => ({
  login_status: state.logNReg.login_status,
  registration_status: state.logNReg.registration_status,
  wrong_otp_count: state.logNReg.wrong_otp_count,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  send_register_otp,
  register_new_user,
  login,
  otpLogin,
  send_otp
})(Authorization);
