import { productName, productSlug } from 'data/metadata'
import DocsPage from '@hashicorp/react-docs-page'
import Columns from 'components/columns'
import Tag from 'components/inline-tag'
// Imports below are used in server-side only
import {
  generateStaticPaths,
  generateStaticProps,
} from '@hashicorp/react-docs-page/server'

const NAV_DATA_FILE = 'data/docs-nav-data.json'
const CONTENT_DIR = 'content/docs'
const basePath = 'docs'
const additionalComponents = { Columns, Tag }

export default function DocsLayout(props) {
  return (
    <DocsPage
      product={{ name: productName, slug: productSlug }}
      baseRoute={basePath}
      staticProps={props}
      additionalComponents={additionalComponents}
    />
  )
}

export async function getStaticPaths() {
  const paths = await generateStaticPaths({
    navDataFile: NAV_DATA_FILE,
    localContentDir: CONTENT_DIR,
    // new ----
    product: { name: productName, slug: productSlug },
    basePath: basePath,
  })
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  try {
    const props = await generateStaticProps({
      navDataFile: NAV_DATA_FILE,
      localContentDir: CONTENT_DIR,
      mainBranch,
      params,
      product,
      basePath: basePath,
    })
    return { props, revalidate: 10 }
  } catch (err) {
    console.warn(err)
    return {
      notFound: true,
    }
  }
}
