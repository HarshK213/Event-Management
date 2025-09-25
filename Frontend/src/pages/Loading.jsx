import React from 'react'
import { LoadingIndicator } from '../components/Loading'

function Loading() {
  return (
    <div className="h-screen flex items-center justify-center" >
      <LoadingIndicator type="line-simple" size="md" label="Loading..."/>
    </div>
  )
}

export default Loading
