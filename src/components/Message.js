import React from 'react'
import { Message } from 'semantic-ui-react'

export default ({message , info , warning , positive , negative}) => (
  <Message  info warning positive negative>
    {message}
  </Message>
)
