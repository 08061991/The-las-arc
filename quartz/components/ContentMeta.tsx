import { Date, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: false,
  showComma: false,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
  

    const text = fileData.text
if (!text) return null

const segments: (string | JSX.Element)[] = []
const fm = fileData.frontmatter ?? {}


if (fm?.author) {
  segments.push(<span>Author: {fm.author}</span>)
}

if (fm?.source) {
  segments.push(<span>Source: {fm.source}</span>)
}

if (fm?.published && fileData.dates?.published) {
  segments.push(
    <span>Published: <Date date={fileData.dates.published} locale={cfg.locale} /></span>
  )
}


      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>{displayedTime}</span>)
      }
if (fm?.description) {
  segments.push(<span>Description: {fm.description}</span>)
}
      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
   
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor