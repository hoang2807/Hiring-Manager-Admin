import { CopyOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useState } from 'react'

interface Props {
  text: string
}

const textDefault = 'Copy to clipboard'

function Copy({ text }: Props) {
  const [title, setTitle] = useState(textDefault)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setTitle('Copied')
  }
  return (
    // <CopyToClipboard text={text} onCopy={() => this.setState({ copied: true })}>
    <Tooltip title={title}>
      <button onClick={handleCopy} onMouseEnter={() => setTitle(textDefault)}>
        <CopyOutlined />
      </button>
    </Tooltip>
    // </CopyToClipboard>
  )
}

export default Copy
