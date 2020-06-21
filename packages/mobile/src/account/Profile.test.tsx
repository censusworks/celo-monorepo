import * as React from 'react'
import 'react-native'
import { fireEvent, render } from 'react-native-testing-library'
import { Provider } from 'react-redux'
import { setName } from 'src/account/actions'
import Profile from 'src/account/Profile'
// import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import { RootState } from 'src/redux/reducers'
import { createMockStore, getMockStackScreenProps } from 'test/utils'

describe('Profile', () => {
  it('renders correctly', () => {
    const store = createMockStore({})
    const { toJSON } = render(
      <Provider store={store}>
        <Profile setName={jest.fn()} {...getMockStackScreenProps(Screens.Profile)} />
      </Provider>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  describe('when SettingsItem pressed', () => {
    const store = createMockStore({})
    const name = 'New Name'
    it('edits name', () => {
      const { getByDisplayValue } = render(
        <Provider store={store}>
          <Profile setName={jest.fn()} {...getMockStackScreenProps(Screens.Profile)} />
        </Provider>
      )
      const input = getByDisplayValue((store.getState() as RootState).account.name!)
      fireEvent.changeText(input, name)
      expect(store.getActions()).toEqual([setName(name)])
    })
  })
})
