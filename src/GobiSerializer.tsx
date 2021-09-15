import React from 'react'
import GobiReact from './GobiReact'

const GobiSerializer = ({ node }: any) => (
  <GobiReact
    stories={node?.gobiValues?.story}
    animatedBubble={node?.gobiValues?.animatedBubble}
    bubbleSize={node?.gobiValues?.bubbleSize}
    color={node?.gobiValues?.color}
    hideTitle={node?.gobiValues?.hideTitle}
    showPlayIcon={node?.gobiValues?.showPlayIcon}
    autoStartWithSound={node?.gobiValues?.autoStartWithSound}
    titleFontColor={node?.gobiValues?.titleFontColor}
  />
)

export default GobiSerializer
