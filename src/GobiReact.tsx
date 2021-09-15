import React, { useEffect } from 'react'

interface Props {
  stories: string[]
  animatedBubble?: boolean
  bubbleSize?: number
  color?: string
  hideTitle?: boolean
  showPlayIcon?: boolean
  autoStartWithSound?: boolean
  titleFontColor?: string
}

const GobiReact = ({
  stories,
  animatedBubble,
  bubbleSize,
  color,
  hideTitle,
  showPlayIcon,
  autoStartWithSound,
  titleFontColor
}: Props) => {
  const random = Math.random()
  useEffect(() => {
    const script = document.createElement('script')
    document.head.append(script)
    script.src = 'https://unpkg.com/@gobistories/gobi-web-integration@^6.11.1'
    script.async = true
    script.setAttribute('onload', 'gobi.discover()')
    const gobi = document.getElementById(`gobi-${random}`)
    if (gobi) {
      gobi.innerHTML = `<div
        class="gobi-stories"
        data-gobi-stories="${stories?.toString()?.replace(',', ' ')}"
        data-gobi-color="${color}"
        data-gobi-bubble-size="${bubbleSize}px"
        data-gobi-animated-bubble="${animatedBubble?.toString()}"
        data-gobi-show-play-icon="${showPlayIcon?.toString()}"
        data-gobi-auto-segue="true"
        data-gobi-title-font-color="${titleFontColor}"
        data-gobi-hide-title="${hideTitle}"
        data-gobi-auto-start-with-sound="${autoStartWithSound}">
      </div>`
    }
  }, [])

  return <div id={`gobi-${random}`} />
}

export default GobiReact
