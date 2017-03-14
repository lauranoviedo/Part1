import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

import {OFFLINE_MODAL} from '../constants'
import {openModal, closeModal} from '../../../store/modals/actions'
import {isModalOpen} from '../../../store/selectors'

const OfflineModal = ({
    closeModal,
    isOpen,
    reload
}) => {
    return (
        <Sheet open={isOpen} onDismiss={closeModal} maskOpacity={0.7} effect="modal-center" shrinkToContent>
            <div className="u-padding-md u-text-align-center">
                <div className="u-margin-top u-text-bold">Offline mode</div>
                <p className="u-margin-top-md u-margin-bottom-lg">
                    Some content may not appear as expected. You can continue to navigate to pages
                    you have already visited, but in in order to load new content you must re-establish
                    your internet connection.
                </p>
                <Button className="c--secondary u-width-full u-text-uppercase u-margin-bottom" onClick={reload}>Retry connection</Button>
                <Button className="c--tertiary u-width-full u-text-uppercase" onClick={closeModal}>
                    Continue offline
                </Button>
            </div>
        </Sheet>
    )
}

OfflineModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    reload: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
    isOpen: isModalOpen(OFFLINE_MODAL)
})

const mapDispatchToProps = {
    openModal: () => openModal(OFFLINE_MODAL),
    closeModal: () => closeModal(OFFLINE_MODAL)
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineModal)
