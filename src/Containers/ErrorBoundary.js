import React, { Component } from 'react'
import { Text, View } from 'react-native'
import tailwind from 'tailwind-rn'
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={tailwind('flex-1 flex-col justify-center bg-yellow-500')}>
          <Text style={tailwind('text-4xl text-center')}>⚠️</Text>
          <Text style={tailwind('text-2xl text-center font-bold text-red-700')}>
            We are sorry!
          </Text>
          <Text style={tailwind('px-8 text-sm font-light pt-4')}>
            There was a problem fetching the contacts. Please try again after a
            while or contact support!
          </Text>
          <Text style={tailwind('px-8 text-sm font-light pt-4')}>error</Text>
        </View>
      )
    }

    return this.props.children
  }
}
