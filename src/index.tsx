import React, { useEffect, useState, useCallback } from 'react'
import _ from 'lodash'
import GobiPreview from './GobiPreview'
import GobiReact from './GobiReact'
import gobiSchema from './gobiSchema'
import GobiSerializer from './GobiSerializer'

const customStyling = `<style>h1,
  h3,
  p,
  div {
    cursor: default;
  }

  p {
    margin: 0;
  }

  input {
    border: 1px solid lightblue;
    width: 60px;
    border-radius: 9px;
    padding: 5px 10px;
    margin-right: 5px;
  }

  input.bigInput {
    width: 120px;
    margin-right: 0;
  }

  input[type='checkbox'] {
    all: unset;
    border: 1px solid lightblue;
    height: 15px;
    width: 15px;
    border-radius: 5px;
    margin-right: 20px;
    cursor: pointer;
    position: relative;
  }

  input[type='checkbox']:checked {
    border: 1px solid lightblue;
    height: 15px;
    width: 15px;
    border-radius: 5px;
    margin-right: 20px;
    background: lightblue;
  }

  input[type='checkbox']:checked:after {
    content: '\u2713';
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }</style>`

const Gobi = React.forwardRef((props: any) => {
  const { value, onChange, PatchEvent, set, unset } = props
  const [story, setStory] = useState(value?.story || 'ragg9')
  const [color, setColor] = useState(value?.color || '#15D6EA')
  const [debouncedColorState, setDebouncedColorState] = useState(
    value?.color || '#15D6EA'
  )

  const [bubbleSize, setBubbleSize] = useState(value?.bubbleSize || 125)
  const [animatedBubble, setAnimated] = useState(
    value?.animatedBubble ? value?.animatedBubble : true
  )

  const createPatchFrom = (value: any) =>
    PatchEvent.from(value === '' ? unset() : set(value))

  const [showPlayIcon, setPlayIcon] = useState(
    value?.showPlayIcon ? value?.showPlayIcon : true
  )
  const [titleFontColor, setTitleColor] = useState(
    value?.titleFontColor || '#000'
  )
  const [hideTitle, setHideTitle] = useState(
    value?.hideTitle ? value?.hideTitle : false
  )
  const [autoStartWithSound, setStartSound] = useState(
    value?.startSound ? value?.startSound : true
  )
  const random = Math.random()

  useEffect(() => {
    const script = document.createElement('script')
    document.head.append(script)
    script.src = 'https://unpkg.com/@gobistories/gobi-web-integration@^6.11.1'
    script.async = true
    script.setAttribute('onload', 'gobi.discover()')
  }, [])

  useEffect(() => {
    onChange(
      createPatchFrom({
        _type: 'object',
        _key: 'gobi-story-' + story,
        story,
        color,
        bubbleSize,
        animatedBubble,
        showPlayIcon,
        titleFontColor,
        hideTitle,
        autoStartWithSound
      })
    )
    const gobi = document.getElementById(`gobi-${random}`)
    const styling = document.getElementById('style')
    if (styling) {
      styling.innerHTML = customStyling
    }
    if (gobi) {
      gobi.innerHTML = `<div
          class="gobi-stories"
          data-gobi-stories="${story}"
          data-gobi-color="${debouncedColorState}"
          data-gobi-bubble-size="${bubbleSize}px"
          data-gobi-animated-bubble="${animatedBubble.toString()}"
          data-gobi-show-play-icon="${showPlayIcon.toString()}"
          data-gobi-auto-segue="true"
          data-gobi-title-font-color="${titleFontColor}"
          data-gobi-hide-title="${hideTitle}"
          data-gobi-auto-start-with-sound="${autoStartWithSound}">
      </div>`
    }
  }, [
    story,
    debouncedColorState,
    bubbleSize,
    animatedBubble,
    showPlayIcon,
    titleFontColor,
    hideTitle,
    autoStartWithSound
  ])

  const handleColorChange = (event: any) => {
    setColor(event.target.value)
    debounceColor(event.target.value)
  }

  const debounceColor = useCallback(
    _.debounce((_searchVal: string) => {
      setDebouncedColorState(_searchVal)
    }, 1000),
    []
  )

  return (
    <div style={styles.container}>
      <div id='style' />
      <div>
        <div style={styles.justifyRow}>
          <div>
            <h3>Edit Bubbles</h3>
            <p>Preview of selected stories</p>
          </div>
          <button style={styles.btn}>Reset to Defaults</button>
        </div>
        <div id={`gobi-${random}`} style={styles.gobiCont} />

        <div>
          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Story ID</p>
            <input
              className='bigInput'
              type='text'
              value={story}
              onChange={(ev) => setStory(ev.target.value)}
            />
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Color</p>
            <input
              type='color'
              value={debouncedColorState}
              onChange={handleColorChange}
            />
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Bubble Size</p>
            <div>
              <input
                type='number'
                value={bubbleSize}
                onChange={(ev) => setBubbleSize(ev.target.value)}
              />
              px
            </div>
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Show Animated Bubbles</p>
            <input
              type='checkbox'
              checked={animatedBubble}
              onChange={() => setAnimated(!animatedBubble)}
            />
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Show Play Icon</p>
            <input
              type='checkbox'
              checked={showPlayIcon}
              onChange={() => setPlayIcon(!showPlayIcon)}
            />
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Title Font Color</p>
            <input
              type='color'
              value={titleFontColor}
              onChange={(ev) => setTitleColor(ev.target.value)}
            />
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Hide Title</p>
            <input
              type='checkbox'
              checked={hideTitle}
              onChange={() => setHideTitle(!hideTitle)}
            />
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Auto Start Sound</p>
            <input
              type='checkbox'
              checked={autoStartWithSound}
              onChange={() => setStartSound(!autoStartWithSound)}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

const styles = {
  container: {
    padding: '1rem',
    height: '100%'
  },
  justifyRow: {
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  borderBottom: {
    paddingBottom: '1rem',
    borderBottom: '1px solid lightblue'
  },
  gobiCont: {
    overflow: 'auto',
    minHeight: '14.688rem',
    maxHeight: '14.688rem'
  },
  btn: {
    border: '1px solid lightblue',
    background: '#ffffff',
    color: 'lightblue',
    borderRadius: 9,
    padding: '8px 16px',
    cursor: 'pointer'
  },
  label: {
    fontWeight: 700
  }
}

export { Gobi, GobiReact, GobiPreview, GobiSerializer, gobiSchema }
