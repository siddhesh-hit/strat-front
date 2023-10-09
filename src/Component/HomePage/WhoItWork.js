import React from "react";
import { Row, Col } from "react-bootstrap";
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100&display=swap" rel="stylesheet"></link>
const WhoItWork = () => {
  return (
    <div>
      <div className="container">
        <Row className="own_margin_top">
          <Col lg={12}>
            <h3 className="own_word_h3 homepage_font who_is_for_title">In Our Customer's own Words...</h3>
          </Col>
          <Col lg={6} className="own_words">
            <p style={{ textAlign: "center" }} className="homepage_font own_words_para">
              "Lately, we've been serving clients from such specific industries
              that looking for writers who are familiar with the subjects is a
              challenge, and they always help us by sending lists that exceed
              our expectations. In addition, I really like how they always
              propose improvements in the face of any difficulties we might
              have." <br />
              <b>Fabio D. Agency, CEO</b>
            </p>
          </Col>
          <Col lg={6} className="own_words">
            <p style={{ textAlign: "center" }} className="homepage_font own_words_para">
              "Workflow platform has enabled us to increase agility during the
              entire process: from approving ideas prior to producing content,
              to the automation of the production workflow up to the native
              integration with WordPress allowing us to automatically push
              content from the platform to our blog and social media."
              <br />
              <b>Rafaela F. Digital Marketer, SEO</b>
            </p>
          </Col>
        </Row>
      </div>
      <div className="who_is_for_bgcolor">
        <h3 className="homepage_font who_is_for">Who's it for?</h3>
        <p className="homepage_font who_is_for_para container">
          Growth Software has a suite of solutions for teams in different
          verticals who have the goal of growing the businesses: SaaS, mobile
          apps, digital media, financial services, e-commerces, logistics,
          e-learning, consumer goods, industry, and more!
        </p>
        <div className="container who_is_for_content">
        <Row>
          <Col lg={4} className="who_is_for_width">
            <h6 className="homepage_font who_is_for_color">Growth Teams</h6>
            <p className="homepage_font who_is_for_para">Running high-tempo testing experiments across the whole customer journey</p>
          </Col>
          <Col lg={4} className="who_is_for_width">
          <h6 className="homepage_font who_is_for_color1">CRO Teams<p>(Conversion Rate optimization)</p></h6>
          <p className="homepage_font who_is_for_para">Executing a/b tests in landing pages, home pages, emails and validating the best versions</p>
          </Col>        
          <Col lg={4} className="who_is_for_width">
          <h6 className="homepage_font who_is_for_color">Innovation Teams</h6>
          <p className="homepage_font who_is_for_para">In the search for new products, new lines of business, new moonshot projects</p>
          </Col>
          <Col lg={4} className="who_is_for_width">
          <h6 className="homepage_font who_is_for_color">Growth Agencies</h6>
          <p className="homepage_font who_is_for_para">Managing the execution of tests for multiple customers through different growth levers</p>
          </Col>
          <Col lg={4} className="who_is_for_width">
          <h6 className="homepage_font who_is_for_color">Accelerators & Incubators</h6>
          <p className="homepage_font who_is_for_para">Supporting batches of various startups at once and needing to keep track of their progress`</p>
          </Col>
        </Row>
        </div>
      </div>
    </div>
  );
};
export default WhoItWork;

