import React from 'react'
import Slider from 'react-slick'
import { Link } from 'gatsby'
import { Button, Icon } from 'semantic-ui-react'
import ProjectPreviewSlide from './project-preview-slide'

import styles from './project-preview.module.css'

class ProjectPreviewSlider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: props.title,
      subtitle: props.subtitle,
      nodes: props.nodes,
      browseMoreHref: props.browseMoreHref
    }
  }

  render () {
    const { title, subtitle, browseMoreHref, nodes } = this.state
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <section className={styles.root}>
        {title && <h1>{title}</h1>}
        {subtitle && <h4>{subtitle}</h4>}
        <Slider {...settings}>
          {nodes && nodes.map(node => (
            <ProjectPreviewSlide {...node} />
          ))}
        </Slider>
        {browseMoreHref && (
          <div>
            <Link to={browseMoreHref}>
              <Button animated floated='right'>
                <Button.Content visible>Browse More</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            </Link>
          </div>
        )}
      </section>

    )
  }
}

ProjectPreviewSlider.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default ProjectPreviewSlider
