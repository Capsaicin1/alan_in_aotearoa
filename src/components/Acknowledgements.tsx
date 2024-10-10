import "./Acknowledgements.css";

const Acknowledgements = () => {
  return (
    <div className="ack-container">
      <div className="ack-container-content">
        <p>
          Many thanks to Professor{" "}
          <span>
            <a
              href="https://www.nmit.ac.nz/people/show/ellen-cieraad"
              target="_blank"
            >
              Ellen Cieraad
            </a>
          </span>{" "}
          at NMIT for providing the analyzed VIIRS data and assisting with its
          interpretation. For more details, you can read her paper,{" "}
          <b>
            <i>
              'Lighting Trends Reveal the State of the Dark Sky Cloak: Light at
              Night and Its Ecological Impacts in Aotearoa New Zealand'
            </i>
          </b>
          ,{" "}
          <a target="_blank" href="https://newzealandecology.org/nzje/3559">
            here
          </a>
          .
        </p>
        <p>
          Raw VIIRS - NASA's{" "}
          <a
            target="_blank"
            href="https://ladsweb.modaps.eosdis.nasa.gov/missions-and-measurements/products/VNP46A4"
          >
            VIIRS/NPP Lunar BRDF-Adjusted Nighttime Lights Yearly.
          </a>
        </p>
        <p>
          Dark Sky - Data on dark sky locations in New Zealand available{" "}
          <a target="_blank" href="https://darksky.org/">
            here.
          </a>
        </p>
      </div>
    </div>
  );
};

export default Acknowledgements;
