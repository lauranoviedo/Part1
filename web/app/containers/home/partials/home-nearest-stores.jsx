/* eslint-disable react/self-closing-comp */
import React, {PropTypes} from 'react'
import Button from 'progressive-web-sdk/dist/components/button'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

// Merlins Potions Nearby Widget Config
import merlinsPotionsNearbyConfig from '../../../config/merlins-potions-nearby-config.json'

/**
 * Merlins Donde Nearby Widget
 */

class HomeNearestStores extends React.Component {

    componentWillMount() {
        // Nearby widget async script
        const merlinsPotionsAsync = !function(a) { // eslint-disable-line wrap-iife
            const b = document.createElement('script')
            b.type = 'text/javascript'
            b.src = 'https://dtopnrgu570sp.cloudfront.net/nearby-widget/nearby.min.js'
            b.setAttribute('async', !0)
            b.addEventListener ? b.addEventListener('load', (b) => { // eslint-disable-line no-unused-expressions
                a(null, b)
            }, !1) : b.onreadystatechange = function() {
                b.readyState in { // eslint-disable-line no-unused-expressions
                    loaded: 1,
                    complete: 1
                } && (b.onreadystatechange = null, a())
            }
            document.head.appendChild(b)
        }(() => {
            window.DondeNearby.load({...merlinsPotionsNearbyConfig})
        })

        const merlinsPotionsScript = document.createElement('script')
        merlinsPotionsScript.append(merlinsPotionsAsync)
        document.body.appendChild(merlinsPotionsScript)
    }

    render() {
        const {
            title,
            viewAllStoresText
        } = this.props

        const closestLocations = merlinsPotionsNearbyConfig.configs

        return (
            <div className="t-home__nearest-stores">
                <div className="u-card u-padding-md u-padding-top-lg u-padding-bottom-lg">
                    <h2 className="u-padding-bottom-md u-border-light-bottom u-text-uppercase">{title}</h2>

                    <div className="u-margin-bottom-md">

                        {closestLocations.map((selector, idx) => { // id seems like a misleading var name
                            let selectorString = selector.selector
                            selectorString = selectorString.slice(1, selectorString.length)

                            return (
                                <div id={selectorString} key={idx}>
                                    <ListTile
                                        className="u-border-light-bottom"
                                        startAction={<SkeletonBlock height="20px" width="20px" />}
                                        endAction={<SkeletonBlock height="20px" width="20px" />}
                                    >
                                        <SkeletonText
                                            style={{height: '25px', lineHeight: '20px'}}
                                            width="100px"
                                        />
                                    </ListTile>
                                </div>
                            )
                        })}
                    </div>

                    <Button className="c--tertiary u-text-uppercase u-width-full" href="https://locations.merlinspotions.com">{viewAllStoresText}</Button>
                </div>
            </div>
        )
    }
}

HomeNearestStores.propTypes = {
    /**
     * PropTypes comments are REQUIRED for components to be included
     * in the styleguide
     */
    title: PropTypes.string.isRequired,

    /**
     * PropTypes comments are REQUIRED for components to be included
     * in the styleguide
     */
    viewAllStoresText: PropTypes.string.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

export default HomeNearestStores
