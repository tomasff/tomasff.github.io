import { css } from '@emotion/core'
import { graphql } from 'gatsby'
import { Parser } from 'html-to-react'
import React from 'react'
import Layout from '../components/Layout'

const container = css`
  margin: 0 auto;
  padding: 4rem 2rem 8rem 2rem;
  max-width: 600px;
  color: #333333;

  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  h2 {
    margin-top: 3rem;
    font-size: 19px;
    font-weight: 600;
    color: #c9cccf;
    letter-spacing: 1.2px;
  }

  p {
    margin-bottom: 0.25rem;
  }

  a {
    transition: box-shadow 160ms ease 0s;
    box-shadow: rgb(238, 251, 255) 0px -9px 0px inset;
    border-bottom: 2px solid rgb(207, 243, 255);
    text-decoration: none;
    color: #323336;
    &:hover {
      box-shadow: rgb(207, 243, 255) 0px -1.2em 0px inset;
    }
  }

  .section ul {
    margin-top: 0.5rem;
    margin-left: 2.5rem;
    list-style: disc;
  }

  .section li {
    margin-bottom: 0.5rem;
  }

  .grey {
    color: #96999b;
  }

  .headline {
    display: block;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 1.2px;
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;
  }

  .skills ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .skills li {
    margin-bottom: 1rem;
    margin-right: 0.5rem;
    padding: 0.25rem 1rem;
    background-color: #f1f5f7;
    white-space: nowrap;
  }
`

const htmlToReactParser = new Parser()

export default props => {
  const { data } = props
  const about = data.about

  const name = about.frontmatter.name
  const description = about.html

  const projects = data.projects.edges.map(edge => {
    const project = edge.node
    const name = project.frontmatter.name
    const status = project.frontmatter.status
    const url = project.frontmatter.url
    const description = htmlToReactParser.parse(project.html)

    return (
      <div key={name}>
        <p>
          <span className="headline">
            <a target="_blank" href={url}>{name}</a>
          </span>
        </p>
        <p>
          <span className="grey">{status}</span>
        </p>
        {description}
      </div>
    )
  })

  return (
    <Layout>
      <div css={container}>
        <h1>{name}</h1>
        {htmlToReactParser.parse(description)}
        <div className="section">
          <h2>Projects</h2>
          <div>{projects}</div>
        </div>
        <div className="skills">
          <h2>Skills</h2>
          <div>{htmlToReactParser.parse(data.skills.html)}</div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    about: markdownRemark(fileAbsolutePath: { regex: "/about.md/" }) {
      html
      frontmatter {
        name
      }
    }
    projects: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(projects)/"  }}) {
        edges {
          node {
            html
            frontmatter {
              name
              url
              status
            }
          }
        }
    }
    skills: markdownRemark(fileAbsolutePath: { regex: "/skills.md/" }) {
      html
    }
  }
`
