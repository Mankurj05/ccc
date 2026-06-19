function Footer() {

  const year =
    new Date().getFullYear();

  return (
    <footer>

      <h3>
        SkillHub Learning Platform
      </h3>

      <p>
        © {year} All Rights Reserved
      </p>

    </footer>
  );
}

export default Footer;
