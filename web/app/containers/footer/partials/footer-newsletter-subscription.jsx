import React, {PropTypes} from 'react'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../selectors'
import * as actions from '../actions'
import {connect} from 'react-redux'

import NewsletterForm from './newsletter-form'

class FooterNewsletterSubscription extends React.Component {
    constructor(props) {
        super(props)

        this.onSubmitNewsletter = this.onSubmitNewsletter.bind(this)
    }

    onSubmitNewsletter(data) {
        const {method, action} = this.props.newsletter
        this.props.onSubmit(action, method, data)
    }

    render() {
        const {newsletter} = this.props
        return (
            <div className="t-footer__newsletter u-padding-md u-padding-top-lg u-padding-bottom-lg">
                <div>
                    <h2 className="u-h2 u-margin-bottom-md">
                        Subscribe to Merlin&#39;s Newsletter
                    </h2>

                    <NewsletterForm disabled={!newsletter} onSubmit={this.onSubmitNewsletter} />
                </div>
            </div>
        )
    }
}

FooterNewsletterSubscription.propTypes = {
    newsletter: PropTypes.object,
    onSubmit: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    newsletter: selectors.getNewsletter
})

const mapDispatchToProps = {
    onSubmit: actions.signUpToNewsletter
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterNewsletterSubscription)
