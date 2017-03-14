import React, {PropTypes} from 'react'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../selectors'
import {selectorToJS} from '../../../utils/selector-utils'
import {connect} from 'react-redux'

import Divider from 'progressive-web-sdk/dist/components/divider'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const FooterNavigation = ({navigation}) => {
    return (
        <div className="t-footer__navigation u-padding-lg u-text-align-center">
            {navigation.map(({text, href}, index) => {
                return (
                    <ListTile href={href} key={index}>
                        {text || <SkeletonText width="135px" style={{lineHeight: '20px'}} />}
                    </ListTile>
                )
            })}

            <Divider />

            <div className="t-footer__copyright u-padding-top u-padding-bottom">
                <p>Copyright Merlin&#39;s Potions 2016</p>
                <p className="u-margin-top">All rights reserved.</p>
            </div>
        </div>
    )
}

FooterNavigation.propTypes = {
    navigation: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
    navigation: selectorToJS(selectors.getNavigation)
})

export default connect(mapStateToProps)(FooterNavigation)
