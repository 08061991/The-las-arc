import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  // Use fullTitle if it exists, otherwise fall back to title
  const title = fileData.frontmatter?.fullTitle || fileData.frontmatter?.title || "Untitled"
  
  return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 1.5rem 0;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor