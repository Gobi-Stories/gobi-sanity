import React, { useEffect, useState, useCallback } from 'react'
import _ from 'lodash'
import GobiPreview from './GobiPreview'
import GobiReact from './GobiReact'
import gobiSchema from './gobiSchema'
import GobiSerializer from './GobiSerializer'

const customStyling = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap')
    h1,
    h3,
    p,
    div {
      cursor: default;
    }

    h3.title {
      font-family: 'Nunito', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      color: #011C39;
      margin-bottom: 0;
    }

    .subtitle {
      font-family: 'Nunito', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      line-height: 18px;
      color: #6C7689;
    }

    p {
      margin: 0;
    }

    input {
      border: 1px solid #BFC6CD;
      width: 60px;
      border-radius: 5px;
      padding: 5px 12px;

      font-family: 'Nunito', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      color: #6C7689;
    }

    input.bigInput {
      width: 120px;
      font-size: 15px;
    }

    input.unstyled {
      border: none;
      width: 40px;
      border-radius: 0;
      padding: 0;
      height: 100%;
      margin-right: 5px;
      outline: none;
    }

    input[type="color"] {
      -webkit-appearance: none;
      border: none;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      overflow: hidden;
      padding: 0 !important;
    }
    input[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0 !important;
    }
    input[type="color"]::-webkit-color-swatch {
      border: none;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 30px;
      height: 19px;
      border-box: initial;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ffffff;
      border: 2px solid #0093FF;
      -webkit-transition: .4s;
      transition: .4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      width: 16px;
      left: -2px;
      top: -2px;
      bottom: -2px;
      border: 2px solid #0093FF;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }

    input:checked + .slider {
      background-color: #0093FF;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(10px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }

    input[type="range"] {
      padding: 0;
      width: 174px;
      height: 4px;
    }
  </style>`

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
    value?.hideTitle ? value?.hideTitle : true
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
          data-gobi-hide-title="${!hideTitle}"
          data-gobi-auto-start-with-sound="${!autoStartWithSound}">
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
            <h3 className='title'>Edit Bubble</h3>
            <p className='subtitle'>Preview of selected stories</p>
          </div>
        </div>
        <div id={`gobi-${random}`} style={styles.gobiCont} />

        <div>
          <div
            style={{
              ...styles.justifyRow,
              ...styles.borderBottom,
              ...styles.borderTop
            }}
          >
            <p style={styles.label}>Story ID</p>
            <input
              className='bigInput'
              type='text'
              value={story}
              onChange={(ev) => setStory(ev.target.value)}
            />
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Bubble Size</p>
            <input
              type='range'
              min='100'
              max='500'
              step='1'
              value={bubbleSize}
              onChange={(e) => setBubbleSize(parseInt(e.target.value))}
            />
            <div
              style={{
                ...styles.labelInput,
                ...styles.labelInputNoWidth,
                ...styles.flexRow,
                ...styles.alignEnd
              }}
            >
              <input
                className='unstyled'
                type='number'
                value={bubbleSize}
                onChange={(ev) => setBubbleSize(ev.target.value)}
              />
              <div style={{ ...styles.greyText, ...styles.lineHeightUnset }}>
                px
              </div>
            </div>
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Circle Color</p>
            <div style={styles.flexRow}>
              <div style={{ ...styles.greyText, ...styles.marginRight }}>
                HEX
              </div>
              <label
                htmlFor='input-color'
                style={{ ...styles.labelInput, ...styles.marginRight }}
              >
                {debouncedColorState}
              </label>
              <input
                id='input-color'
                type='color'
                value={debouncedColorState}
                onChange={handleColorChange}
              />
            </div>
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Display as Gif</p>
            <label className='switch'>
              <input
                type='checkbox'
                checked={animatedBubble}
                onChange={() => setAnimated(!animatedBubble)}
              />
              <span className='slider round' />
            </label>
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Display Story Name</p>
            <label className='switch'>
              <input
                type='checkbox'
                checked={hideTitle}
                onChange={() => setHideTitle(!hideTitle)}
              />
              <span className='slider round' />
            </label>
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Title Font Color</p>
            <div style={styles.flexRow}>
              <div style={{ ...styles.greyText, ...styles.marginRight }}>
                HEX
              </div>
              <label
                htmlFor='input-color'
                style={{ ...styles.labelInput, ...styles.marginRight }}
              >
                {titleFontColor}
              </label>
              <input
                type='color'
                value={titleFontColor}
                onChange={(ev) => setTitleColor(ev.target.value)}
              />
            </div>
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Display Play Icon</p>
            <label className='switch'>
              <input
                type='checkbox'
                checked={showPlayIcon}
                onChange={() => setPlayIcon(!showPlayIcon)}
              />
              <span className='slider round' />
            </label>
          </div>

          <div style={{ ...styles.justifyRow, ...styles.borderBottom }}>
            <p style={styles.label}>Start Video Muted</p>
            <label className='switch'>
              <input
                type='checkbox'
                checked={autoStartWithSound}
                onChange={() => setStartSound(!autoStartWithSound)}
              />
              <span className='slider round' />
            </label>
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
  flexRow: {
    display: 'flex',
    alignItems: 'center'
  },
  justifyRow: {
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  alignEnd: {
    alignItems: 'flex-end'
  },
  borderBottom: {
    paddingBottom: '1rem',
    borderBottom: '1.5px solid #CBEAFF'
  },
  borderTop: {
    paddingTop: '1rem',
    borderTop: '1.5px solid #CBEAFF'
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
    fontFamily: 'Nunito, sans-serif',
    fontWeight: 400,
    fontSize: 15,
    color: '#011C39'
  },
  greyText: {
    fontFamily: 'Nunito, sans-serif',
    fontWeight: 400,
    fontSize: 12,
    color: '#6C7689',
    lineHeight: 0
  },
  marginRight: {
    marginRight: 8
  },
  labelInput: {
    border: '1px solid #BFC6CD',
    width: 60,
    borderRadius: 5,
    padding: '5px 12px',
    marginRight: 5,

    fontFamily: 'Nunito, sans-serif',
    fontWeight: 400,
    fontSize: 12,
    color: '#6C7689'
  },
  labelInputNoWidth: {
    width: 'auto'
  },
  lineHeightUnset: {
    lineHeight: 'unset'
  }
}

export { Gobi, GobiReact, GobiPreview, GobiSerializer, gobiSchema }
