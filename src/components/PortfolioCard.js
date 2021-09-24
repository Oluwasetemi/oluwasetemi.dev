import {Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const PortfolioCardStyles = styled.div`
  display: flex;
  align-items: center;
  .card-image a {
    img {
      min-width: ${props => {
        return props.size === 'small' ? '' : '500px'
      }};
      min-height: 100%;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
          rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
      }
    }
  }
  .card-details {
    padding: 0px 30px 0px;
    a {
      text-decoration-color: transparent;
      &:hover {
        text-decoration-color: red;
      }
      h2 {
        font-size: 3.5rem;
        display: flex;
        margin-bottom: 20px;
        img.icon {
          width: 20px;
          height: 40px;
          margin-left: 30px;
        }
      }
    }
    p {
      font-size: 1.75rem;
    }
    .tech {
      display: grid;
      /* grid-template-columns: repeat(3, 1fr); */
      grid-template-columns: repeat(4, 1fr);
    }
    span {
      color: var(--black);
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* Tablet */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
  }

  /* phones */
  @media screen and (min-device-width: 320px) and (max-device-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`

function PortfolioCard({post, size}) {
  const onePortfolio = post.node.frontmatter

  return (
    <PortfolioCardStyles size={size}>
      <div className="card-image tilt">
        <Link to={`/${onePortfolio.slug}`}>
          <img src={onePortfolio.imageUrl} alt={onePortfolio.slug} />
        </Link>
      </div>
      <div className="card-details">
        <a target="_blank" rel="noopener noreferrer" href={onePortfolio.url}>
          <h2>
            {onePortfolio.title}{' '}
            <img className="icon" src="./exit-top-right.svg" alt="link" />
          </h2>
        </a>
        <div className="tech">
          {onePortfolio &&
            onePortfolio.technology.map((technology, index) => (
              <span key={`${technology}-${index}`} className="mark tilt">
                {technology}
              </span>
            ))}
        </div>
        <Link to={`/portfolio/${onePortfolio.slug}`}>
          <p className="description">{onePortfolio.description}</p>
        </Link>
      </div>
    </PortfolioCardStyles>
  )
}

export default PortfolioCard
