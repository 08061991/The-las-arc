import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    // 👇 Custom logo placeholder with homepage link
    {
      Component: () => (
        <a href="/" style={{ 
          display: 'inline-block', 
          padding: '0.5rem 1rem 0.5rem 0',
          fontWeight: 'bold',
          textDecoration: 'none',
          color: 'var(--dark)',
          fontSize: '1.2rem'
        }}>
          Logo Here
        </a>
      ),
    },
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      mapFn: (node) => {
        // Diagnostic logging
        console.log("🔍 Explorer Node:", {
          isFolder: node.isFolder,
          name: node.name,
          displayName: node.displayName,
          hasData: !!node.data,
          dataKeys: node.data ? Object.keys(node.data) : [],
          frontmatter: node.data?.frontmatter,
          shortTitle: node.data?.frontmatter?.shortTitle
        })
        return node
      },
      sortFn: (a, b) => {
        if (a.isFolder && !b.isFolder) return -1
        if (!a.isFolder && b.isFolder) return 1
        return (a.displayName || "").localeCompare(b.displayName || "", undefined, {
          numeric: true,
          sensitivity: "base"
        })
      },
      order: ["map", "filter", "sort"]
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    // 👇 Same custom logo placeholder here
    {
      Component: () => (
        <a href="/" style={{ 
          display: 'inline-block', 
          padding: '0.5rem 1rem 0.5rem 0',
          fontWeight: 'bold',
          textDecoration: 'none',
          color: 'var(--dark)',
          fontSize: '1.2rem'
        }}>
          Logo Here
        </a>
      ),
    },
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      mapFn: (node) => {
        // Diagnostic logging
        console.log("🔍 Explorer Node:", {
          isFolder: node.isFolder,
          name: node.name,
          displayName: node.displayName,
          hasData: !!node.data,
          dataKeys: node.data ? Object.keys(node.data) : [],
          frontmatter: node.data?.frontmatter,
          shortTitle: node.data?.frontmatter?.shortTitle
        })
        return node
      },
      sortFn: (a, b) => {
        if (a.isFolder && !b.isFolder) return -1
        if (!a.isFolder && b.isFolder) return 1
        return (a.displayName || "").localeCompare(b.displayName || "", undefined, {
          numeric: true,
          sensitivity: "base"
        })
      },
      order: ["map", "filter", "sort"]
    }),
  ],
  right: [],
}
