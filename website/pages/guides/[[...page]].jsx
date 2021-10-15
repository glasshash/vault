import { productName, productSlug } from 'data/metadata'
import DocsPage from '@hashicorp/react-docs-page'
import {
  generateStaticPaths,
  generateStaticProps,
} from '@hashicorp/react-docs-page/server'

const NAV_DATA_FILE = 'data/guides-nav-data.json'
const CONTENT_DIR = 'content/guides'
const basePath = 'guides'

export default function DocsLayout(props) {
  return (
    <DocsPage
      product={{ name: productName, slug: productSlug }}
      baseRoute={basePath}
      staticProps={props}
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
