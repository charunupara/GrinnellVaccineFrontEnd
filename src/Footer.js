function Footer() {
    return (
        <div>
             <p>Checks appointment availability every minute.</p>
        <p>
          Visit{" "}
          <a target="_blank" href="https://www.vaccinespotter.org/IA/">
            Vaccine Spotter
          </a>{" "}
          to view current availability.
        </p>
        <div id="footer-text">
          <p id="disclaimer">
            Disclaimer: Vaccine availability data is collected from
            vaccinespotter.org. The data could be inaccurate/not up-to-date.
          </p>
          Built by two Class of 2021 Grinnell students.
        </div>
        </div>
    );
}

export default Footer;