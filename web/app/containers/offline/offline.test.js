/* eslint-env jest */
import {mount} from 'enzyme'
import React from 'react'

import ConnectedOfflineBanner from './partials/offline-banner'
import ConnectedOfflineModal from './partials/offline-modal'

const OfflineBanner = ConnectedOfflineBanner.WrappedComponent
const OfflineModal = ConnectedOfflineModal.WrappedComponent

const mock = () => {}

test('OfflineBanner renders without errors', () => {
    const wrapper = mount(<OfflineBanner openModal={mock} />)

    expect(wrapper.length).toBe(1)
})

test('OfflineModal renders without errors', () => {
    const wrapper = mount(<OfflineModal isOpen={false} reload={mock} closeModal={mock} />)

    expect(wrapper.length).toBe(1)
})
