import Bg3DImage from '../../../assets/3Dimage.png';

const New3DModelSection = () => (
  <section
    className="new-3d-model-section"
    style={{ backgroundImage: `url(${Bg3DImage})` }}
  >
    <div className="model-section-split">
      <div className="model-left-zone">
        <div className="model-text-content">
          <h2 className="level-up-box">Mi personaje en 3D</h2>
          <p>Una versión tridimensional de mi avatar de AlleRoDi.</p>
        </div>
      </div>
      <div className="model-right-zone" aria-hidden />
    </div>
  </section>
);

export default New3DModelSection;
