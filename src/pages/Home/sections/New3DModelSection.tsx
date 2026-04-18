import React from 'react';
import Bg3DImage from '../../../assets/3Dimage.png';

const New3DModelSection = () => (
  <section
    className="new-3d-model-section"
    style={{ backgroundImage: `url(${Bg3DImage})` }}
  >
    <div className="model-section-split">
      <div className="model-left-zone">
        <div className="model-text-content">
          <div className="level-up-box">LEVEL UP!</div>
          <p>Introducing the new 3D character model. See me in a whole new dimension.</p>
        </div>
      </div>
      <div className="model-right-zone" aria-hidden />
    </div>
  </section>
);

export default New3DModelSection;
