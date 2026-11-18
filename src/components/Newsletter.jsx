import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

const Newsletter = ({ onSubscribe }) => (
  <section className="sds-newsletter" aria-labelledby="newsletter-heading">
    <div className="sds-container sds-newsletter__layout">
      <div className="sds-newsletter__copy">
        <p className="sds-eyebrow sds-eyebrow--dark"><span />SDS briefing</p>
        <h2 id="newsletter-heading">A clearer view of <em>what&apos;s next.</em></h2>
        <p>News, new work, and ideas shaping the digital landscape—shared occasionally by SpenFel Digital Systems.</p>
      </div>
      <div className="sds-newsletter__invite">
        <div className="sds-newsletter__mark" aria-hidden="true">
          <Mail size={21} />
          <span>FIELD NOTES&nbsp; / &nbsp;SDS</span>
        </div>
        <div>
          <p>Stay connected</p>
          <button type="button" className="sds-button sds-button--green" onClick={onSubscribe}>
            Subscribe to updates <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default Newsletter;
