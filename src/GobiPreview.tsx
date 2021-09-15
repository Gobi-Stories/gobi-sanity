import React from 'react'
import GobiReact from './GobiReact'

const GobiPreview = ({ value }: any) => {
  const { gobiValues } = value
  return gobiValues ? (
    <GobiReact
      stories={gobiValues?.story}
      animatedBubble={gobiValues?.animatedBubble}
      bubbleSize={gobiValues?.bubbleSize}
      color={gobiValues?.color}
      hideTitle={gobiValues?.hideTitle}
      showPlayIcon={gobiValues?.showPlayIcon}
      autoStartWithSound={gobiValues?.autoStartWithSound}
      titleFontColor={gobiValues?.titleFontColor}
    />
  ) : null
}

export default GobiPreview
