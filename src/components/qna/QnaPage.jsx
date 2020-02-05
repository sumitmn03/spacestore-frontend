import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProductQnas, postProductQna } from "../../actions/qna";
import QnaSidebar from "./QnaSidebar";
import MainQna from "./MainQna";

export class QnaPage extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
    getProductQnas: PropTypes.func.isRequired,
    postProductQna: PropTypes.func.isRequired,
    product_qna_status: PropTypes.string.isRequired
  };

  componentDidMount() {
    const { getProductQnas, match } = this.props;
    getProductQnas(match.params.id);
    window.scrollTo(0, 0);
  }

  render() {
    const {
      product,
      user,
      postProductQna,
      product_qna_status,
      isAuthenticated
    } = this.props;

    return (
      <div className="ms-qna-page">
        <QnaSidebar
          product={product}
          user={user}
          postProductQna={postProductQna}
          product_qna_status={product_qna_status}
          isAuthenticated={isAuthenticated}
        />
        <MainQna product={product} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.qna.product,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  product_qna_status: state.qna.product_qna_status
});

export default connect(mapStateToProps, { getProductQnas, postProductQna })(
  QnaPage
);
