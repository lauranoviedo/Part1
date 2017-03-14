import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'
import {isRunningInAstro} from '../../utils/astro-integration'

import {hidePreloader} from 'progressive-web-sdk/dist/preloader'
import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'
import SkipLinks from 'progressive-web-sdk/dist/components/skip-links'
import Header from '../../containers/header/container'
import Footer from '../../containers/footer/container'
import MiniCart from '../../containers/mini-cart/container'
import Navigation from '../../containers/navigation/container'
import * as appActions from '../app/actions'
import * as selectors from './selectors'

import NotificationManager from '../../components/notification-manager'

// Offline support
import {Offline} from '../templates'
import OfflineBanner from '../offline/partials/offline-banner'
import OfflineModal from '../offline/partials/offline-modal'

const hidePreloaderWhenCSSIsLoaded = () => {
    if (window.Progressive.stylesheetLoaded) {
        hidePreloader()
    } else {
        setTimeout(hidePreloaderWhenCSSIsLoaded, 100)
    }
}

class App extends React.Component {
    componentDidMount() {
        hidePreloaderWhenCSSIsLoaded()
        this.props.fetchSvgSprite()
    }

    render() {
        const {
            children,
            history,
            fetchPage,
            fetchError,
            hasFetchedCurrentPath,
            notifications,
            removeNotification,
            sprite
        } = this.props

        const routeProps = children.props.route
        const CurrentHeader = routeProps.Header || Header
        const CurrentFooter = routeProps.Footer || Footer

        const reload = () => fetchPage(window.location.href, routeProps.component.WrappedComponent, routeProps.routeName)

        const skipLinksItems = [
            // Customize your list of SkipLinks here. These are necessary to
            // achieve compliance with WCAG 2.0's guideline 2.4.1: "Bypass
            // Blocks". Compliance is required under some laws, such as the ADA
            // (Americans with Disabilities Act). For more details, see here:
            //
            // @URL: https://www.w3.org/TR/WCAG20-TECHS/G1.html
            {target: '#app-main', label: 'Skip to content'},
            {target: '#header-navigation', label: 'Skip to main navigation'},
            {target: '#app-footer', label: 'Skip to footer'},
        ]

        return (
            <div
                id="app"
                className={`t-app t-app--${routeProps.routeName}`}
                style={{display: 'none'}}
            >
                <DangerousHTML html={sprite}>
                    {(htmlObj) => <div hidden dangerouslySetInnerHTML={htmlObj} />}
                </DangerousHTML>
                <SkipLinks items={skipLinksItems} />

                <div id="app-wrap" className="t-app__wrapper u-flexbox u-direction-column">
                    <div id="app-header" className="u-flex-none" role="banner">
                        <CurrentHeader headerHasSignIn={routeProps.headerHasSignIn} isRunningInAstro={isRunningInAstro} />
                        {
                            // Only display banner when we are offline and have content to show
                            fetchError && hasFetchedCurrentPath && <OfflineBanner />
                        }
                        <OfflineModal reload={reload} />

                        {notifications &&
                            <NotificationManager
                                notifications={notifications}
                                actions={{removeNotification}}
                            />
                        }

                        <Navigation history={history} />
                        <MiniCart />
                    </div>

                    {
                        // Display main content if we have no network errors or
                        // if we've already got the content in the store
                        (!fetchError || hasFetchedCurrentPath) ?
                            <div>
                                <main id="app-main" className="u-flex" role="main">
                                    {this.props.children}
                                </main>

                                <div id="app-footer" className="u-flex-none">
                                    <CurrentFooter isRunningInAstro={isRunningInAstro} />
                                </div>
                            </div>
                        :
                            <Offline reload={reload} location={children.props.location} route={routeProps} />
                    }
                </div>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    fetchPage: PropTypes.func.isRequired,
    /**
     * The react-router history object
     */
    fetchError: PropTypes.string,
    fetchSvgSprite: PropTypes.func,
    hasFetchedCurrentPath: PropTypes.bool,
    history: PropTypes.object,
    notifications: PropTypes.array,
    removeNotification: PropTypes.func,
    /**
     * The SVG icon sprite needed in order for all Icons to work
     */
    sprite: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
    notifications: selectorToJS(selectors.getNotifications),
    fetchError: selectors.getFetchError,
    hasFetchedCurrentPath: selectors.hasFetchedCurrentPath,
    sprite: selectors.getSvgSprite
})

const mapDispatchToProps = {
    removeNotification: appActions.removeNotification,
    fetchPage: appActions.fetchPage,
    fetchSvgSprite: () => appActions.fetchSvgSprite()
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
